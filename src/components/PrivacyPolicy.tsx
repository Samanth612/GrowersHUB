import React from "react";
import Header from "./Header";
import Title from "./Title";
import Footer from "./Footer";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Header />
      <Title title={"Privacy Policy"} />
      <div className="px-6 lg:px-12 pt-10">
        <section className="mb-6">
          <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-4">
            1. Personal Information We Collect
          </h2>
          <p className="mb-4 text-secondary text-xl w-full font-light leading-relaxed">
            When you visit Growers-Hub.com, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. We refer to
            this automatically-collected information as "Device Information."
          </p>
          <p className="mb-2 text-secondary text-xl w-full font-light">
            We collect Device Information using the following technologies:
          </p>
          <ul className="list-none text-xl mb-2">
            <li className="relative pl-4 pb-2 before:content-['•'] before:absolute before:left-0 before:top-2 before:text-black before:text-xs">
              "Cookies" data files that are placed on your device or computer
              and often include an anonymous unique identifier. For more
              information about cookies, and how to disable cookies, visit{" "}
              <a
                href="http://www.allaboutcookies.org"
                className="text-blue-500 underline"
              >
                http://www.allaboutcookies.org
              </a>
              .
            </li>
            <li className="relative pl-4 pb-2 before:content-['•'] before:absolute before:left-0 before:top-1.5 before:text-black before:text-xs">
              "Log files" track actions occurring on the Site, and collect data
              including your IP address, browser type, Internet service
              provider, referring/exit pages, and date/time stamps.
            </li>
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-1.5 before:text-black before:text-xs">
              "Web beacons", "tags," and "pixels": electronic files used to
              record information about how you browse the Site.
            </li>
          </ul>
          <p className="mt-4 text-secondary text-xl w-full font-light leading-relaxed">
            Additionally, when you make a purchase or attempt to make a purchase
            through Growers-Hub.com, we collect certain information from you,
            including your name, billing address, shipping address, payment
            information (including credit card numbers), email address, and
            phone number. We refer to this information as "Order Information."
          </p>
          <p className="mt-4 text-secondary text-xl w-full font-light leading-relaxed">
            When we talk about "Personal Information" in this Privacy Policy, we
            are talking both about Device Information and Order Information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-4">
            2. How We Use Your Personal Information
          </h2>
          <p className="mb-4 text-secondary text-xl w-full font-light leading-relaxed">
            We use the Order Information that we collect generally to fulfill
            any orders placed through Growers-Hub.com (including processing your
            payment information, arranging for pickup, and providing you with
            invoices and/or order confirmations). Additionally, we use this
            Order Information to:
          </p>
          <ul className="list-none text-xl mb-2">
            <li className="relative pl-4 pb-2 before:content-['•'] before:absolute before:left-0 before:top-2 before:text-black before:text-xs">
              Communicate with you;
            </li>
            <li className="relative pl-4 pb-2 before:content-['•'] before:absolute before:left-0 before:top-1.5 before:text-black before:text-xs">
              Screen our orders for potential risk or fraud; and
            </li>
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-1.5 before:text-black before:text-xs">
              When in line with the preferences you have shared with us, provide
              you with information or advertising relating to our products or
              services.
            </li>
          </ul>
          <p className="mt-4 text-secondary text-xl w-full font-light leading-relaxed">
            We use the Device Information that we collect to help us screen for
            potential risk and fraud (in particular, your IP address), and more
            generally to improve and optimize our Site (for example, by
            generating analytics about how our customers browse and interact
            with the Site, and to assess the success of our marketing and
            advertising campaigns).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-4">
            3. Sharing Your Personal Information
          </h2>
          <p className="mb-4 text-secondary text-xl w-full font-light leading-relaxed">
            We share your Personal Information with third parties to help us use
            your Personal Information, as described above. For example, we use
            Stripe to process payments—you can read more about how Stripe uses
            your Personal Information here:{" "}
            <a
              href="https://stripe.com/privacy"
              className="text-blue-500 underline"
            >
              https://stripe.com/privacy
            </a>
            .
          </p>
          <p className="mb-4 text-secondary text-xl w-full font-light leading-relaxed">
            We may also share your Personal Information to comply with
            applicable laws and regulations, to respond to a subpoena, search
            warrant, or other lawful request for information we receive, or to
            otherwise protect our rights.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-4">
            4. Data Retention
          </h2>
          <p className="mb-4 text-secondary text-xl w-full font-light leading-relaxed">
            When you place an order through Growers-Hub.com, we will maintain
            your Order Information for our records unless and until you ask us
            to delete this information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-4">
            5. Changes
          </h2>
          <p className="mb-4 text-secondary text-xl w-full font-light leading-relaxed">
            We may update this privacy policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal, or regulatory reasons.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-4">
            6. Contact Us
          </h2>
          <p className="mb-4 text-secondary text-xl w-full font-light leading-relaxed">
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at{" "}
            <a
              href="mailto:contact@Growers-Hub.com"
              className="text-blue-500 underline"
            >
              contact@Growers-Hub.com
            </a>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
