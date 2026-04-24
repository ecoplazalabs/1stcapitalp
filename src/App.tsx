import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { BlogListPage } from "@/pages/BlogListPage";
import { BlogPostPage } from "@/pages/BlogPostPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/blog", element: <BlogListPage /> },
  { path: "/blog/:slug", element: <BlogPostPage /> },
  { path: "*", element: <LandingPage /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
