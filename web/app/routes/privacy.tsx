import type { MetaFunction } from "react-router";
export const meta: MetaFunction = () => [{ title: "Privacy | AB Personal Training" }, { name: "robots", content: "noindex,nofollow" }];
export default function Privacy() {
  return <main className="error-page privacy-page">
    <a className="brand" href="/">AB<span>.</span><small>PERSONAL TRAINING</small></a>
    <p className="section-tag">PRIVACY INFORMATION · DRAFT FOR REVIEW</p>
    <h1>Privacy.</h1>
    <p>AB Personal Training is an independent personal-training service operated by Aidan Brotherhood in Renfrew, Scotland. Contact: <a href="mailto:aidanbrotherhood@gmail.com">aidanbrotherhood@gmail.com</a>.</p>
    <h2>Enquiries</h2>
    <p>When you contact me to ask about coaching, I use the information you choose to provide, such as your name, email address and fitness goals, to respond and arrange a consultation. Please avoid sending sensitive health information by email unless it is needed and we have agreed an appropriate way to share it.</p>
    <h2>Service information</h2>
    <p>If you become a client, I may need further information to provide safe and appropriate coaching. This will be explained during onboarding and handled according to applicable data-protection requirements.</p>
    <h2>Analytics and marketing</h2>
    <p>This preview does not currently use advertising pixels or analytical cookies. This notice will be updated before any such tracking goes live.</p>
    <h2>Your rights</h2>
    <p>You may ask to see, correct or delete personal information, subject to applicable legal requirements. For privacy questions, contact the address above.</p>
    <p>This is a working draft. Complete retention periods, processor details and relevant legal bases must be finalised before taking customer data through an online form.</p>
    <a className="btn btn-dark" href="/">Back to the website →</a>
  </main>;
}
