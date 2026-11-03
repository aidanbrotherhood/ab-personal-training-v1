import { useRef, useState, type ReactNode } from "react";
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
const trainingLinks = [
  ["/personal-training-renfrew", "Overview", "One-to-one training in Renfrew"],
  ["/personal-training-for-beginners", "Beginners", "A confident place to begin"],
  ["/movement-assessment", "Movement Assessment", "Understand your starting point"],
] as const;

const aboutLinks = [
  ["/about", "Meet Aidan", "The person behind the coaching"],
  ["/about/approach", "My Approach", "The philosophy behind the training"],
] as const;

type NavItem = readonly [href: string, label: string, description: string];

function DesktopMenu({
  label,
  href,
  items,
  pathname,
}: {
  label: string;
  href: string;
  items: readonly NavItem[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const group = useRef<HTMLDivElement>(null);
  const isActive = items.some(([itemHref]) => itemHref === pathname);
  return (
    <div
      className={\`nav-group\${open ? " is-open" : ""}\`}
      ref={group}
      data-section-active={isActive ? "true" : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!group.current?.contains(event.relatedTarget as Node | null))
          setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          event.stopPropagation();
        }
      }}
    >
      <a href={href} className="nav-group-link" aria-current={pathname === href ? "page" : undefined}>
        {label}
      </a>
      <button
        type="button"
        className="nav-group-toggle"
        aria-label={\`Show \${label} menu\`}
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <span aria-hidden="true">⌄</span>
      </button>
      <div className="nav-dropdown-panel" aria-label={\`\${label} pages\`}>
        {items.map(([itemHref, itemLabel, description]) => (
          <a key={itemHref} href={itemHref} aria-current={pathname === itemHref ? "page" : undefined}>
            <strong>{itemLabel}</strong>
            <span>{description}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function MobileMenuGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: readonly NavItem[];
  pathname: string;
}) {
  return (
    <details className="mobile-nav-group">
      <summary data-section-active={items.some(([href]) => href === pathname) ? "true" : undefined}>
        {label} <span aria-hidden="true">+</span>
      </summary>
      <div className="mobile-nav-submenu">
        {items.map(([href, itemLabel]) => (
          <a key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
            {itemLabel}
          </a>
        ))}
      </div>
    </details>
  );
}

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
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand variant="symbol" />
          <nav className="desktop-nav" aria-label="Main navigation">
            <DesktopMenu label="Personal Training" href="/personal-training-renfrew" items={trainingLinks} pathname={pathname} />
            <a className="nav-single" href="/pricing" aria-current={pathname === "/pricing" ? "page" : undefined}>
              Pricing
            </a>
            <DesktopMenu label="About" href="/about" items={aboutLinks} pathname={pathname} />
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
                if ((event.target as HTMLElement).closest("a") && disclosure.current)
                  disclosure.current.open = false;
              }}
            >
              <a href="/">Home</a>
              <MobileMenuGroup label="Personal Training" items={trainingLinks} pathname={pathname} />
              <a href="/pricing" aria-current={pathname === "/pricing" ? "page" : undefined}>Pricing</a>
              <MobileMenuGroup label="About" items={aboutLinks} pathname={pathname} />
              <a href="/consultation" aria-current={pathname === "/consultation" ? "page" : undefined}>Book Free Consultation</a>
            </nav>
          </details>
          <ConsultationLink className="nav-cta" placement="header">
            <span className="cta-full">Book Free Consultation</span>
            <span className="cta-short">Book Free</span>
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
        <nav className="footer-nav" aria-label="Footer navigation">
          <div className="footer-nav-group">
            <h2>Coaching</h2>
            <a href="/personal-training-renfrew">Personal Training</a>
            <a href="/pricing">Pricing</a>
            <a href="/personal-training-for-beginners">Beginners</a>
            <a href="/movement-assessment">Movement Assessment</a>
          </div>
          <div className="footer-nav-group">
            <h2>About</h2>
            <a href="/about">Meet Aidan</a>
            <a href="/about/approach">My Approach</a>
            <a
              href="https://www.instagram.com/aidanbrotherhood.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <Arrow />
            </a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="footer-nav-group">
            <h2>Get Started</h2>
            <ConsultationLink className="footer-consultation" placement="footer">
              Free Consultation
            </ConsultationLink>
            <a href={EMAIL_URL}>Email Aidan <Arrow /></a>
            <a
              href="https://wa.me/447414497675"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp <Arrow />
            </a>
          </div>
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
