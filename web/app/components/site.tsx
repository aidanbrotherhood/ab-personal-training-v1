import { useRef, type ReactNode } from "react";
import { useLocation } from "react-router";
import {
  BUSINESS_EMAIL,
  CONSULTATION_PATH,
  DIRECTIONS_URL,
  EMAIL_URL,
} from "../lib/seo";
import { signal } from "../lib/measurement";

export function Arrow() {
  return (
    <span className="arrow-icon" aria-hidden="true">
      ↗
    </span>
  );
}
export function Brand({ variant = "full" }: { variant?: "full" | "symbol" }) {
  return (
    <a
      className={`brand brand--${variant}`}
      href="/"
      aria-label="AB Personal Training home"
    >
      <img
        className="brand-symbol"
        src="/ab-mark.svg"
        alt=""
        width="337"
        height="182"
      />
      <span className="brand-name">
        AB <strong>Personal Training</strong>
      </span>
    </a>
  );
}
const links = [
  ["/personal-training-renfrew", "Training in Renfrew"],
  ["/coaching", "Coaching & prices"],
  ["/personal-training-for-beginners", "New to the gym?"],
  ["/movement-assessment", "Movement assessment"],
  ["/about", "Meet Aidan"],
] as const;

export function ConsultationLink({
  children = "Book a free consultation",
  className = "btn btn-primary",
  placement = "content",
  offer,
}: {
  children?: ReactNode;
  className?: string;
  placement?: string;
  offer?: string;
}) {
  const { pathname } = useLocation();
  return (
    <a
      href={CONSULTATION_PATH}
      className={className}
      data-consultation-cta="true"
      data-offer-id={offer}
      onClick={() =>
        signal("consultation_cta_clicked", pathname, placement, offer)
      }
    >
      {children}
      <Arrow />
    </a>
  );
}
export function Header() {
  const { pathname } = useLocation();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const navLinks = links.map(([href, label]) => (
    <a
      key={href}
      href={href}
      aria-current={pathname === href ? "page" : undefined}
    >
      {label}
    </a>
  ));
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand variant="symbol" />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks}
          </nav>
          <details
            className="mobile-menu"
            ref={disclosure}
            onKeyDown={(event) => {
              if (event.key === "Escape" && disclosure.current?.open) {
                disclosure.current.open = false;
                disclosure.current.querySelector("summary")?.focus();
              }
            }}
          >
            <summary>
              Menu <span aria-hidden="true">+</span>
            </summary>
            <nav
              aria-label="Mobile navigation"
              onClick={(event) => {
                if (
                  (event.target as HTMLElement).closest("a") &&
                  disclosure.current
                )
                  disclosure.current.open = false;
              }}
            >
              <a href="/">Home</a>
              {navLinks}
              <a href="/consultation">Free consultation</a>
            </nav>
          </details>
          <ConsultationLink className="nav-cta" placement="header">
            <span className="cta-full">Book a free consultation</span>
            <span className="cta-short">Book free</span>
          </ConsultationLink>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            Independent one-to-one personal training with Aidan Brotherhood at
            JD Gyms Renfrew.
          </p>
          <address className="footer-address">
            Renfrew Retail Park, Renfrew, PA4 9EN
          </address>
          <p>
            Gym membership is required for paid coaching and purchased
            separately. AB Personal Training is not an official JD Gyms
            programme.
          </p>
        </div>
        <nav aria-label="Footer">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <ConsultationLink
            className="footer-consultation"
            placement="footer"
          />
          <a href="/privacy">Privacy notice</a>
          <a href={EMAIL_URL}>
            Email Aidan <Arrow />
          </a>
          <a
            href="https://www.instagram.com/aidanbrotherhood.pt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <Arrow />
          </a>
          <a
            href="https://wa.me/447414497675"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp <Arrow />
          </a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AB Personal Training</span>
        <span>Coaching by Aidan Brotherhood</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
export function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div id="top" className={className}>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
export function Breadcrumb({ label }: { label: string }) {
  return (
    <nav className="container page-breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{label}</span>
    </nav>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
  label,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  label: string;
}) {
  return (
    <section className="editorial-intro">
      <Breadcrumb label={label} />
      <div className="container intro-body">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="intro-copy">{children}</div>
      </div>
    </section>
  );
}
export function ConsultationCTA({
  title = "A conversation is a good place to start.",
}: {
  title?: string;
}) {
  return (
    <section className="closing-cta section-pad">
      <div className="container closing-grid">
        <div>
          <p className="eyebrow">Your first step</p>
          <h2>{title}</h2>
          <p>
            Free. 30 minutes. In person at JD Gyms Renfrew.
            <br />
            No obligation to buy coaching.
          </p>
        </div>
        <div>
          <ConsultationLink placement="closing" />
          <p className="cta-alternative">
            Have a question first? <a href={EMAIL_URL}>Email Aidan</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
export function FAQs({
  items,
}: {
  items: readonly { question: string; answer: ReactNode }[];
}) {
  return (
    <div className="faq-items">
      {items.map(({ question, answer }) => (
        <details className="faq-item" key={question}>
          <summary>
            {question}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="faq-answer">{answer}</div>
        </details>
      ))}
    </div>
  );
}
export function LocationNote() {
  return (
    <div className="location-note">
      <strong>JD Gyms Renfrew</strong>
      <address>Renfrew Retail Park, Renfrew, PA4 9EN</address>
      <p>
        Paid coaching requires a separate JD Gyms membership. Not a member?
        Contact Aidan before booking your consultation so gym access can be
        confirmed.
      </p>
      <div className="text-link-row">
        <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
          Open directions <Arrow />
        </a>
        <a href={`mailto:${BUSINESS_EMAIL}`}>
          Ask about access <Arrow />
        </a>
      </div>
    </div>
  );
}
