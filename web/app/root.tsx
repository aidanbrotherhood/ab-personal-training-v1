import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./styles.css";
export function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en-GB"><head>
    <meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1976f3" /><Meta /><Links />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head><body>{children}<ScrollRestoration /><Scripts /></body></html>;
}
export default function App() { return <Outlet />; }
export function ErrorBoundary({ error }: { error: unknown }) {
  const detail = isRouteErrorResponse(error) && error.status === 404 ? "That page couldn't be found." : "Something went wrong.";
  return <main className="error-page"><a href="/" className="brand"><img src="/ab-logo.svg" alt="AB Personal Training" width="270" height="54" /></a><h1>Let's get you back on track.</h1><p>{detail}</p><a href="/" className="btn btn-dark">Back to the homepage</a></main>;
}
