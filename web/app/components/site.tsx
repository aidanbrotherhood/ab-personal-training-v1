export function Arrow() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Aidan Brotherhood Personal Training home">
      <img
        src="/ab-logo.svg"
        alt="Aidan Brotherhood Personal Training"
        width="500"
        height="92"
      />
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
