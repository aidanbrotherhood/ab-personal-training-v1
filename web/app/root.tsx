import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import { envContext } from "./lib/context";
import { Brand } from "./components/site";
import "./styles.css";

export function loader({ request, context }: Route.LoaderArgs) {
  const env = context.get(envContext);
  const url = new URL(request.url);
  // Indexing requires both an explicit flag and the final production host.
  const indexable =
    String(env.INDEXABLE) === "true" &&
    url.origin === "https://aidanbrotherhood.com";
  return {
    indexable,
    socialImage: `${url.origin}/social-card.png`,
    canonical: indexable ? `https://aidanbrotherhood.com${url.pathname}` : null,
  };
}
export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#075fd8" />
        <meta
          name="robots"
          content={data?.indexable ? "index, follow" : "noindex, nofollow"}
        />
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:site_name" content="AB Personal Training" />
        <meta property="og:locale" content="en_GB" />
        <meta
          property="og:image"
          content={
            data?.socialImage || "https://aidanbrotherhood.com/social-card.png"
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="AB Personal Training. Less guesswork. More from your training. Independent coaching at JD Gyms Renfrew."
        />
        {data?.canonical && (
          <>
            <link rel="canonical" href={data.canonical} />
            <meta property="og:url" content={data.canonical} />
          </>
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />;
}
export function ErrorBoundary({ error }: { error: unknown }) {
  const detail =
    isRouteErrorResponse(error) && error.status === 404
      ? "That page couldn’t be found."
      : "Something went wrong loading this page.";
  return (
    <main className="error-page">
      <Brand />
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>{detail}</p>
      <a href="/" className="btn btn-primary">
        Back to the homepage →
      </a>
      <p>
        Or email{" "}
        <a href="mailto:hello@aidanbrotherhood.com">
          hello@aidanbrotherhood.com
        </a>
        .
      </p>
    </main>
  );
}
