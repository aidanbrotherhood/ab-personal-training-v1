export function Arrow() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

export function Brand({ variant = "full" }: { variant?: "full" | "symbol" }) {
  return (
    <a className="brand" href="/" aria-label="Aidan Brotherhood Personal Training home">
      {variant === "symbol" ? (
        <img
          className="brand-symbol"
          src="/ab-mark.svg"
          alt=""
          width="337"
          height="182"
        />
      ) : (
        <img
          className="brand-full"
          src="/ab-logo.svg"
          alt=""
          width="1710"
          height="190"
        />
      )}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            One-to-one personal training with Aidan Brotherhood at JD Gyms Renfrew.
            Gym membership is required for paid coaching and purchased separately.
            This is an independent coaching service, not an official JD Gyms programme.
          </p>
        </div>
        <nav aria-label="Footer">
          <a href="/#approach">The approach</a>
          <a href="/#about">Meet Aidan</a>
          <a href="/#coaching">Coaching & prices</a>
          <a href="/#consultation">Book a free consultation</a>
          <a href="/privacy">Privacy notice</a>
          <a href="mailto:hello@aidanbrotherhood.com">Email Aidan <Arrow /></a>
          <a href="https://www.instagram.com/aidanbrotherhood.pt/" target="_blank" rel="noopener noreferrer">Instagram <Arrow /></a>
          <a href="https://wa.me/447414497675" target="_blank" rel="noopener noreferrer">WhatsApp <Arrow /></a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Aidan Brotherhood Personal Training</span>
        <span>Renfrew, Scotland</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
