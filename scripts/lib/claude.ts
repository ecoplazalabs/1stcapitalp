import Anthropic from "@anthropic-ai/sdk";
import type { FeedItem, Topic, TopicsConfig } from "./types.js";

const MODEL = "claude-haiku-4-5-20251001";

interface LLMPostOutput {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  readingMinutes: number;
}

const systemPrompt = (
  lang: "en" | "es",
  topic: Topic,
  compliance: TopicsConfig["compliance"]
) => {
  const topicLabel = topic.label[lang];
  const isEn = lang === "en";
  return [
    isEn
      ? `You are a senior market analyst for 1st Capital Partners, a boutique merchant finance firm headquartered in London with offices in Luxembourg and the UAE. You write for sophisticated B2B readers: CFOs, private equity professionals, and institutional investors in the lower middle-market ($10M-$100M revenue, $2M-$10M EBITDA).`
      : `Eres un analista senior de mercados para 1st Capital Partners, una firma boutique de merchant finance con sede en Londres y oficinas en Luxemburgo y EAU. Escribes para lectores B2B sofisticados: CFOs, profesionales de private equity e inversores institucionales en el lower middle-market ($10M-$100M de ingresos, $2M-$10M de EBITDA).`,
    "",
    isEn ? `TOPIC: ${topicLabel}` : `TEMA: ${topicLabel}`,
    "",
    isEn ? "HARD CONSTRAINTS:" : "RESTRICCIONES ESTRICTAS:",
    isEn
      ? `- Use ONLY facts, numbers and quotes that appear in the source material provided. If something is not in the source, do not mention it.`
      : `- Usa SOLO hechos, cifras y citas que aparezcan en el material fuente proporcionado. Si algo no está en la fuente, no lo menciones.`,
    isEn
      ? `- Never invent figures, dates, names or quotes. Hallucination is a firing offence.`
      : `- Nunca inventes cifras, fechas, nombres ni citas. La alucinación está prohibida.`,
    isEn
      ? `- Direct quotations must be under ${compliance.maxQuoteWords} words and marked with quotation marks. Attribute to the source name.`
      : `- Las citas textuales deben tener menos de ${compliance.maxQuoteWords} palabras y estar entre comillas. Atribuye a la fuente.`,
    isEn
      ? `- Summarise in your own words. Paraphrase, do not copy paragraphs.`
      : `- Resume con tus propias palabras. Parafrasea, no copies párrafos.`,
    isEn
      ? `- Keep a professional, understated tone. No hype, no emojis, no exclamation marks.`
      : `- Mantén un tono profesional y sobrio. Sin hype, sin emojis, sin signos de exclamación.`,
    isEn
      ? `- British English spelling (favour, centralised, recognise).`
      : `- Español neutro profesional.`,
    "",
    isEn ? "REQUIRED STRUCTURE (markdown):" : "ESTRUCTURA REQUERIDA (markdown):",
    isEn
      ? `1. A "## What happened" section: 2-3 sentences summarising the news.
2. A "## Key figures" section: bullet list of the specific numbers from the source, each with bold labels.
3. A "## Why it matters for the lower middle-market" section: 2-4 sentences connecting the news to our client base (lower middle-market operators, sponsors, cross-border M&A).
4. One blockquote with a short (<${compliance.maxQuoteWords} words) attributed quote from the source (only if a suitable quote exists; otherwise skip this section).
5. A final line that is a markdown link to the source: [Read the full article →](URL)`
      : `1. Una sección "## Qué pasó": 2-3 oraciones resumiendo la noticia.
2. Una sección "## Cifras clave": lista con viñetas de las cifras específicas de la fuente, cada una con etiquetas en negrita.
3. Una sección "## Por qué importa para el lower middle-market": 2-4 oraciones conectando la noticia con nuestra base de clientes (operadores del lower middle-market, sponsors, M&A transfronterizo).
4. Una cita blockquote corta (<${compliance.maxQuoteWords} palabras) atribuida a la fuente (solo si existe una cita adecuada; si no, omite esta sección).
5. Una línea final que sea un enlace markdown a la fuente: [Leer el artículo completo →](URL)`,
    "",
    isEn
      ? "OUTPUT FORMAT: Return ONLY a single JSON object with this exact shape, no prose outside JSON:"
      : "FORMATO DE SALIDA: Retorna SOLO un objeto JSON con exactamente esta forma, sin prosa fuera del JSON:",
    `{
  "title": "string, < 80 chars, compelling but factual",
  "slug": "string, kebab-case, ascii-only, < 60 chars, from the title",
  "excerpt": "string, 1-2 sentences, < 240 chars, plain text",
  "body": "string, markdown content following REQUIRED STRUCTURE above",
  "readingMinutes": number
}`,
  ].join("\n");
};

const userPrompt = (lang: "en" | "es", item: FeedItem, topic: Topic) => {
  const isEn = lang === "en";
  return [
    isEn ? "SOURCE ARTICLE:" : "ARTÍCULO FUENTE:",
    `- source: ${item.sourceName} (tier: ${item.sourceTier})`,
    `- url: ${item.link}`,
    `- published: ${item.pubDate}`,
    `- headline: ${item.title}`,
    `- snippet: ${item.contentSnippet.slice(0, 1500)}`,
    "",
    isEn ? `TOPIC: ${topic.id}` : `TEMA: ${topic.id}`,
    "",
    isEn
      ? "Generate the JSON object now."
      : "Genera el objeto JSON ahora.",
  ].join("\n");
};

export const generateWithClaude = async (
  lang: "en" | "es",
  item: FeedItem,
  topic: Topic,
  config: TopicsConfig
): Promise<LLMPostOutput> => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY env var is required to run the blog generator."
    );
  }
  const client = new Anthropic({ apiKey });

  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: systemPrompt(lang, topic, config.compliance),
    messages: [{ role: "user", content: userPrompt(lang, item, topic) }],
  });

  const textBlock = msg.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude returned no text content.");
  }
  const raw = textBlock.text.trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`Claude response is not JSON:\n${raw.slice(0, 400)}`);
  }
  const parsed = JSON.parse(jsonMatch[0]) as LLMPostOutput;
  if (
    typeof parsed.title !== "string" ||
    typeof parsed.slug !== "string" ||
    typeof parsed.excerpt !== "string" ||
    typeof parsed.body !== "string"
  ) {
    throw new Error(
      `Claude JSON missing required fields: ${Object.keys(parsed).join(", ")}`
    );
  }
  parsed.readingMinutes = Math.max(
    2,
    Math.min(10, Number(parsed.readingMinutes) || 3)
  );
  return parsed;
};
