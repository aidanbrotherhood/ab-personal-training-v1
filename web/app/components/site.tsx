export function Arrow() {
  return (
    <span className="arrow-icon" aria-hidden="true">
      ↗
    </span>
  );
}
export function Brand() {
  return (
    <a className="brand" href="/" aria-label="AB Personal Training home">
      <img
        src="/ab-logo.svg"
        alt="Aidan Brotherhood Personal Training"
        width="280"
        height="56"
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
            Independent personal training at JD Gyms Renfrew.
            <br />
            Gym membership required and purchased separately.
            <br />
            AB Personal Training is not an official JD Gyms programme.
          </p>
        </div>
        <nav aria-label="Footer">
          <a href="/#coaching">Coaching & pricing</a>
          <a href="/#consultation">Free consultation</a>
          <a href="/privacy">Privacy notice</a>
          <a href="mailto:hello@aidanbrotherhood.com">
            Email Aidan <Arrow />
          </a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AB Personal Training</span>
        <span>Renfrew, Scotland</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
