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
import { getPublicPage } from "./lib/public-pages";
import { BUSINESS_NAME, isIndexableProduction, SITE_ORIGIN } from "./lib/seo";
import { structuredData } from "./lib/structured-data";
import { Header, Footer, ConsultationLink } from "./components/site";
import "./styles.css";
import "./discovery.css";

export function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = getPublicPage(url.pathname);
  const production = isIndexableProduction(request, context.get(envContext));
  return {
    page,
    indexable: production && !!page,
    bookingEnabled: production,
    canonical: production && page ? `${SITE_ORIGIN}${page.path}` : null,
    socialImage: `${url.origin}/social-card.png`,
    graph: production && page ? structuredData(page.path) : null,
  };
}
export function meta({ loaderData, error }: Route.MetaArgs) {
  const page = !error ? loaderData?.page : undefined;
  const title =
    page?.title ||
    (isRouteErrorResponse(error) && error.status !== 404
      ? "Page Unavailable | AB Personal Training"
      : "Page Not Found | AB Personal Training");
  const description =
    page?.description ||
    "Find personal training, coaching prices and a free consultation with Aidan Brotherhood at JD Gyms Renfrew.";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
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
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <meta property="og:site_name" content={BUSINESS_NAME} />
        <meta property="og:locale" content="en_GB" />
        <meta
          property="og:image"
          content={data?.socialImage || `${SITE_ORIGIN}/social-card.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="AB Personal Training. Get stronger. Stop guessing. Coaching with Aidan Brotherhood at JD Gyms Renfrew."
        />
        {data?.canonical && (
          <>
            <link rel="canonical" href={data.canonical} />
            <meta property="og:url" content={data.canonical} />
          </>
        )}
        {data?.graph && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data.graph).replace(/</g, "\\u003c"),
            }}
          />
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
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div id="top">
      <Header />
      <main id="main" className="error-page">
        <p className="eyebrow">
          {notFound ? "Page not found" : "Please try again"}
        </p>
        <h1>
          {notFound
            ? "We couldn’t find that page."
            : "We couldn’t load that page."}
        </h1>
        <p>
          {notFound
            ? "The link may be out of date. Here are a few places to start."
            : "Please refresh the page, or get in touch with Aidan."}
        </p>
        <div className="text-link-row">
          <a href="/">Home →</a>
          <a href="/personal-training-renfrew">Training in Renfrew →</a>
        </div>
        <ConsultationLink />
      </main>
      <Footer />
    </div>
  );
}
