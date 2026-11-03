import { plans } from "./offers";
import { BUSINESS_NAME, BUSINESS_EMAIL, SITE_ORIGIN } from "./seo";
import { getPublicPage } from "./public-pages";

export function structuredData(path: string) {
  const page = getPublicPage(path);
  if (!page) return null;
  const businessId = `${SITE_ORIGIN}/#business`;
  const personId = `${SITE_ORIGIN}/#aidan`;
  const venueId = `${SITE_ORIGIN}/#training-venue`;
  const address = {
    "@type": "PostalAddress",
    streetAddress: "Renfrew Retail Park",
    addressLocality: "Renfrew",
    postalCode: "PA4 9EN",
    addressCountry: "GB",
  };
  const pageUrl = `${SITE_ORIGIN}${path}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      name: BUSINESS_NAME,
      url: `${SITE_ORIGIN}/`,
      publisher: { "@id": businessId },
    },
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: BUSINESS_NAME,
      url: `${SITE_ORIGIN}/`,
      email: BUSINESS_EMAIL,
      description:
        "Independent one-to-one personal training with Aidan Brotherhood at JD Gyms Renfrew. Gym membership is purchased separately.",
      founder: { "@id": personId },
      address,
      location: { "@id": venueId },
      areaServed: { "@type": "Place", name: "Renfrew, Scotland" },
      logo: `${SITE_ORIGIN}/ab-mark.svg`,
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Aidan Brotherhood",
      jobTitle: "Personal trainer",
      url: `${SITE_ORIGIN}/about`,
      worksFor: { "@id": businessId },
      sameAs: ["https://www.instagram.com/aidanbrotherhood.pt/"],
    },
    { "@type": "Place", "@id": venueId, name: "JD Gyms Renfrew", address },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: "en-GB",
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": page.key === "about" ? personId : businessId },
      ...(path === "/"
        ? {}
        : { breadcrumb: { "@id": `${pageUrl}#breadcrumb` } }),
    },
  ];
  if (path !== "/")
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        ...(page.key === "approach" || page.key === "strength"
          ? [{
              "@type": "ListItem",
              position: 2,
              name: page.key === "approach" ? "About" : "Personal Training",
              item: page.key === "approach"
                ? `${SITE_ORIGIN}/about`
                : `${SITE_ORIGIN}/personal-training-renfrew`,
            }]
          : []),
        {
          "@type": "ListItem",
          position: page.key === "approach" || page.key === "strength" ? 3 : 2,
          name:
            page.key === "renfrew"
              ? "Training in Renfrew"
              : page.key === "strength"
                ? "Strength & Muscle"
              : page.key === "beginners"
                ? "New to the gym"
                : page.key === "about"
                  ? "About Me"
                  : page.key === "coaching"
                    ? "Pricing"
                    : page.key === "consultation"
                      ? "Free consultation"
                      : page.key === "movement"
                        ? "Free movement assessment"
                        : page.key === "approach"
                          ? "My approach"
                          : "Privacy notice",
          item: pageUrl,
        },
      ],
    });
  if (["/", "/pricing", "/personal-training-renfrew"].includes(path))
    graph.push({
      "@type": "Service",
      "@id": `${SITE_ORIGIN}/#personal-training`,
      name: "One-to-one personal training in Renfrew",
      serviceType: "Personal training",
      provider: { "@id": businessId },
      areaServed: { "@type": "Place", name: "Renfrew, Scotland" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceLocation: { "@id": venueId },
      },
      offers: plans.map((plan) => ({
        "@type": "Offer",
        name: plan.title,
        price: Number(plan.price.slice(1)),
        priceCurrency: "GBP",
        url: `${SITE_ORIGIN}/pricing#offer-coaching-${plan.id}`,
        description: `${plan.sessions} 60-minute one-to-one sessions; ${plan.period.toLowerCase()}; JD Gyms membership purchased separately.`,
      })),
    });
  if (page.key === "strength")
    graph.push({
      "@type": "Service",
      "@id": `${pageUrl}#strength-coaching`,
      name: "Strength and muscle-building personal training in Renfrew",
      serviceType: "One-to-one strength and muscle-building personal training",
      description: page.description,
      provider: { "@id": businessId },
      areaServed: { "@type": "Place", name: "Renfrew, Scotland" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceLocation: { "@id": venueId },
      },
      offers: plans.map((plan) => ({
        "@type": "Offer",
        name: plan.title,
        price: Number(plan.price.slice(1)),
        priceCurrency: "GBP",
        url: `${SITE_ORIGIN}/pricing#offer-coaching-${plan.id}`,
        description: `${plan.sessions} 60-minute one-to-one sessions; ${plan.period.toLowerCase()}; JD Gyms membership purchased separately.`,
      })),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
