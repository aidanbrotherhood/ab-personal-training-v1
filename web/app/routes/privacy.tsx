import type { MetaFunction } from "react-router";
import { Brand } from "../components/site";
export const meta: MetaFunction = () => [
  { title: "Privacy notice | AB Personal Training" },
  {
    name: "description",
    content:
      "How Aidan Brotherhood uses and protects information provided when you enquire about personal training.",
  },
];
export default function Privacy() {
  return (
    <main className="privacy-page" id="top">
      <Brand />
      <p className="section-label">Last updated 2 November 2026</p>
      <h1>Privacy notice.</h1>
      <p>
        Aidan Brotherhood, trading as AB Personal Training, is responsible for
        the personal information described here. This notice covers this website
        and enquiries about independent personal training at JD Gyms Renfrew.
      </p>
      <p>
        For privacy questions or requests, email{" "}
        <a href="mailto:hello@aidanbrotherhood.com">
          hello@aidanbrotherhood.com
        </a>
        .
      </p>
      <h2>What the enquiry form collects</h2>
      <p>
        The form asks for your name, email address and JD Gyms membership
        status. You can optionally provide a phone number and select a broad
        training goal, a coaching option and your usual availability. These
        optional details help us have a useful first conversation. Please don’t
        include medical information or other sensitive personal details.
      </p>
      <p>
        We store the date of your request and the version of the form notice you
        acknowledged. If the page link includes campaign labels, we may save
        those labels with your enquiry, along with the referring website’s
        hostname. We don’t save advertising click identifiers or full referring
        URLs in the enquiry database.
      </p>
      <h2>Why the information is used</h2>
      <p>
        Your enquiry details are used to respond, arrange a consultation and
        discuss coaching you have asked about. This supports steps you request
        before entering into a coaching agreement. You don’t have to buy
        anything.
      </p>
      <p>
        Basic source information helps us understand which enquiries lead to
        useful conversations and clients. We use this for our legitimate
        interest in understanding and improving the business. It is linked to
        your enquiry, not used to build an advertising profile. You can ask us
        to stop using it for this purpose.
      </p>
      <p>
        The form’s acknowledgement is permission to reply about your enquiry. It
        doesn’t subscribe you to a mailing list. We don’t sell your information
        or make automated decisions about you.
      </p>
      <h2>Where information is handled</h2>
      <p>
        Cloudflare hosts the website and stores form enquiries in its D1
        database. Cloudflare also processes technical request information,
        including IP addresses, to run and protect the service. The website uses
        your IP address for short-lived rate limiting; the form does not store
        it in the enquiry database. Application logs record operational events
        without the form’s contents.
      </p>
      <p>
        Email correspondence is handled using Apple iCloud Mail. Resend sends an
        internal notification to Aidan after an enquiry is saved. This includes
        your contact details and selected coaching interest, so Aidan can
        respond. Enquiries are stored independently of notification delivery.
      </p>
      <p>
        Cloudflare and Apple operate internationally. Information may be
        processed outside the UK under their applicable data-protection
        arrangements. Access to enquiries is for handling coaching enquiries and
        maintaining the service; they aren’t sent to JD Gyms as part of
        submitting this form.
      </p>
      <h2>How long information is kept</h2>
      <p>
        Enquiry information is kept while discussing your request and any
        relevant follow-up. Retention is reviewed according to whether it is
        still needed to handle the enquiry, provide an agreed service or meet a
        legal obligation. You can contact Aidan to ask about, or request
        deletion of, your enquiry. If you become a client, any additional
        coaching records and their retention will be explained separately.
      </p>
      <h2>Cookies and measurement</h2>
      <p>
        This site does not use Google Analytics, Meta Pixel, advertising cookies
        or visitor-tracking storage. Campaign labels are read from the current
        page link and submitted only with an enquiry. Choosing a package updates
        the form on this page. We don’t send browsing or form-field activity to
        an analytics service.
      </p>
      <h2>Your choices and rights</h2>
      <p>
        You can ask to access or correct your information, request deletion or
        restriction, and object to processing based on legitimate interests.
        Data portability may apply in some circumstances. These rights depend on
        the circumstances and applicable law. To make a request, contact the
        email address above. You can also ask us to stop contacting you.
      </p>
      <p>
        If you have concerns, please contact Aidan. You can also{" "}
        <a href="https://ico.org.uk/make-a-complaint/">
          raise a concern with the Information Commissioner’s Office
        </a>
        , the UK’s data-protection regulator.
      </p>
      <a className="btn btn-primary" href="/">
        Back to the website →
      </a>
    </main>
  );
}
