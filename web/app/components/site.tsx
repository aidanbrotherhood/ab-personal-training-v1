import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
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
  ["/about", "About Me", "The person behind the coaching"],
  ["/about/approach", "My Approach", "The philosophy behind the training"],
] as const;

type NavItem = readonly [href: string, label: string, description: string];
type MenuKey = "training" | "about";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="m4.5 6 3.5 3.5L11.5 6" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Standard navigation disclosures: one trigger, normal links, mouse + touch + keyboard. */
function DesktopMenu({
  id,
  label,
  items,
  pathname,
  open,
  onOpen,
  onClose,
}: {
  id: MenuKey;
  label: string;
  items: readonly NavItem[];
  pathname: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const active = items.some(([href]) => href === pathname);
  const panelId = "nav-panel-" + id;

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      trigger.current?.focus();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    const links = Array.from(
      container.current?.querySelectorAll<HTMLAnchorElement>(".nav-popover-link") ?? [],
    );
    if (links.length === 0) return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (!open) {
      onOpen();
      requestAnimationFrame(() =>
        links[direction === 1 ? 0 : links.length - 1]?.focus(),
      );
    } else {
      links[index < 0 ? (direction === 1 ? 0 : links.length - 1) : (index + direction + links.length) % links.length]?.focus();
    }
  }

  return (
    <div
      ref={container}
      className={"nav-cluster" + (open ? " is-open" : "")}
      data-section-active={active ? "true" : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onOpen();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") onClose();
      }}
      onBlurCapture={(event) => {
        if (!container.current?.contains(event.relatedTarget as Node | null))
          onClose();
      }}
      onKeyDown={handleKeys}
    >
      <button
        ref={trigger}
        className="nav-trigger"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        <Chevron className="nav-trigger-chevron" />
      </button>
      <div
        id={panelId}
        className="nav-popover"
        role="group"
        aria-label={label + " pages"}
        hidden={!open}
      >
        {items.map(([href, itemLabel]) => (
          <a
            className="nav-popover-link"
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
          >
            <span>{itemLabel}</span>
            <span className="nav-item-arrow" aria-hidden="true">↗</span>
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
        <span>{label}</span>
        <Chevron className="mobile-nav-chevron" />
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
  const desktopNav = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);

  useEffect(() => {
    function dismissOutside(event: PointerEvent) {
      const target = event.target as Node;
      if (openMenu && !desktopNav.current?.contains(target))
        setOpenMenu(null);
      if (disclosure.current?.open && !disclosure.current.contains(target))
        disclosure.current.open = false;
    }
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [openMenu]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand variant="symbol" />
          <nav ref={desktopNav} className="desktop-nav" aria-label="Main navigation">
            <DesktopMenu
              id="training"
              label="Personal Training"
              items={trainingLinks}
              pathname={pathname}
              open={openMenu === "training"}
              onOpen={() => setOpenMenu("training")}
              onClose={() => setOpenMenu(null)}
            />
            <a
              className="nav-single"
              href="/pricing"
              aria-current={pathname === "/pricing" ? "page" : undefined}
            >
              Pricing
            </a>
            <DesktopMenu
              id="about"
              label="About"
              items={aboutLinks}
              pathname={pathname}
              open={openMenu === "about"}
              onOpen={() => setOpenMenu("about")}
              onClose={() => setOpenMenu(null)}
            />
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
              <span>Menu</span>
              <svg className="mobile-menu-icon mobile-menu-icon--hamburger" viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <svg className="mobile-menu-icon mobile-menu-icon--close" viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </summary>
            <nav
              aria-label="Mobile navigation"
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a") && disclosure.current)
                  disclosure.current.open = false;
              }}
            >
              <a href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</a>
              <MobileMenuGroup label="Personal Training" items={trainingLinks} pathname={pathname} />
              <a href="/pricing" aria-current={pathname === "/pricing" ? "page" : undefined}>Pricing</a>
              <MobileMenuGroup label="About" items={aboutLinks} pathname={pathname} />
              <a className="mobile-book-link" href="/consultation" aria-current={pathname === "/consultation" ? "page" : undefined}>
                Book Free Consultation <span aria-hidden="true">↗</span>
              </a>
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
            <a href="/about">About Me</a>
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
export function Breadcrumb({
  label,
  parent,
}: {
  label: string;
  parent?: { href: string; label: string };
}) {
  return (
    <nav className="container page-breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      {parent && (
        <>
          <a href={parent.href}>{parent.label}</a>
          <span aria-hidden="true">/</span>
        </>
      )}
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
