import React from "react";
import { HOME } from "../Utilities/constantLinks";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="px-14 md:px-28 lg:px-32 pt-10">
        <div className="ak-renderer-document">
          <h2 className="pb-4 font-rajdhani text-2xl font-bold">
            Privacy Policy for Growers-Hub.com
          </h2>
          <p className="pb-4 font-medium text-sm text-lightGray">
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from{" "}
            <a className="text-blue-500 underline cursor-pointer" href={HOME}>
              www.Growers-Hub.com
            </a>
            .
          </p>

          {/* Section 1: Personal Information We Collect */}
          <h3 className="pb-4 font-bold text-lg">
            1. Personal Information We Collect
          </h3>
          <p className="pb-4 text-sm text-lightGray">
            When you visit Growers-Hub.com, we automatically collect certain
            information about your device, including your web browser, IP
            address, time zone, and some cookies installed on your device.
            Additionally, as you browse the site, we collect information about
            the individual web pages or products you view, the websites or
            search terms that referred you, and how you interact with the site.
            This is collectively referred to as "Device Information."
          </p>
          <ul className="pb-4 list-disc list-inside text-sm text-lightGray">
            <li>
              <strong>Cookies:</strong> Data files stored on your device
              containing unique identifiers. Learn more at{" "}
              <a
                href="http://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                allaboutcookies.org
              </a>
              .
            </li>
            <li>
              <strong>Log Files:</strong> Tracks actions on the site and
              collects data such as IP address, browser type, Internet provider,
              and timestamps.
            </li>
            <li>
              <strong>Web Beacons, Tags, and Pixels:</strong> Electronic files
              used to record browsing information.
            </li>
          </ul>
          <p className="pb-4 text-sm text-lightGray">
            Additionally, when you make a purchase or attempt to make a purchase
            through Growers-Hub.com, we collect details like your name, billing
            address, shipping address, payment information (including credit
            card numbers), email address, and phone number. This is referred to
            as "Order Information."
          </p>

          {/* Section 2: How We Use Your Personal Information */}
          <h3 className="pb-4 font-bold text-lg">
            2. How We Use Your Personal Information
          </h3>
          <p className="pb-4 text-sm text-lightGray">
            We use the information collected for the following purposes:
          </p>
          <ul className="pb-4 list-disc list-inside text-sm text-lightGray">
            <li>
              To fulfill orders, including processing payments and providing
              invoices.
            </li>
            <li>To communicate with you.</li>
            <li>To screen orders for fraud or risk.</li>
            <li>
              To provide information or advertising about products or services,
              aligned with your preferences.
            </li>
          </ul>
          <p className="pb-4 text-sm text-lightGray">
            Device Information is used for improving site optimization,
            analytics, and detecting fraudulent activity.
          </p>

          {/* Section 3: Sharing Your Personal Information */}
          <h3 className="pb-4 font-bold text-lg">
            3. Sharing Your Personal Information
          </h3>
          <p className="pb-4 text-sm text-lightGray">
            We share your personal information with third-party services to
            assist in its use. For instance, payment processing through Stripe.
            Review their privacy policy{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              here
            </a>
            .
          </p>
          <p className="pb-4 text-sm text-lightGray">
            We may also share your information to comply with legal requirements
            or protect our rights.
          </p>

          {/* Section 4: Data Retention */}
          <h3 className="pb-4 font-bold text-lg">4. Data Retention</h3>
          <p className="pb-4 text-sm text-lightGray">
            Order information is retained unless a deletion request is made.
          </p>

          {/* Section 5: Changes */}
          <h3 className="pb-4 font-bold text-lg">5. Changes</h3>
          <p className="pb-4 text-sm text-lightGray">
            This policy may be updated periodically to reflect changes in
            practices or legal requirements.
          </p>

          {/* Section 6: Contact Us */}
          <h3 className="pb-4 font-bold text-lg">6. Contact Us</h3>
          <p className="pb-4 text-sm text-lightGray">
            For questions or complaints, contact us via email at{" "}
            <a
              href="mailto:contact@Growers-Hub.com"
              className="text-blue-500 underline"
            >
              contact@Growers-Hub.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
