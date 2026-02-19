---
paths:
  - "backend/**"
  - "api/**"
  - "server/**"
  - "**/*.py"
---

- NOTA: Backend Python NO esta en el MVP. Este archivo es placeholder para fase 2.
- Cuando se implemente: FastAPI o Flask para el formulario de contacto
- Validar TODOS los inputs con Pydantic schemas
- Formato de error consistente: { error: string, code: string, status: number }
- Nunca hardcodear secrets (usar env vars)
- Rate limiting en endpoint de contacto
- CORS configurado solo para el dominio de produccion
