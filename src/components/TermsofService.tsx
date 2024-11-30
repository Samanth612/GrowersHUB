import React from "react";

const TermsofService = () => {
  return (
    <div>
      <div className="px-14 md:px-28 lg:px-32 pt-10">
        <div className="ak-renderer-document">
          <h2 className="pb-4 font-rajdhani text-2xl font-bold">
            Terms of Service for Growers-Hub.com
          </h2>
          <p className="pb-4 text-sm text-lightGray">
            Welcome to Growers-Hub.com. These Terms of Service outline the rules
            and regulations for using our website. By accessing this website,
            you agree to these terms. If you disagree with any part of these
            terms, please stop using the website.
          </p>

          {/* Section 1: Intellectual Property Rights */}
          <h3 className="pb-4 font-bold text-lg">
            1. Intellectual Property Rights
          </h3>
          <p className="pb-4 text-sm text-lightGray">
            Except for content you own, Growers-Hub.com and its licensors own
            all intellectual property rights and materials on this website. You
            are granted a limited license to view the materials.
          </p>

          {/* Section 2: Restrictions */}
          <h3 className="pb-4 font-bold text-lg">2. Restrictions</h3>
          <p className="pb-4 text-sm text-lightGray">
            You are restricted from:
          </p>
          <ul className="pb-4 list-disc list-inside text-sm text-lightGray">
            <li>Publishing website material in any other media.</li>
            <li>Selling, sublicensing, or commercializing website material.</li>
            <li>Publicly performing or showing website material.</li>
            <li>Using the website in damaging ways or contrary to laws.</li>
            <li>Engaging in data mining or similar activities.</li>
            <li>Using the website for advertising or marketing.</li>
          </ul>
          <p className="pb-4 text-sm text-lightGray">
            Certain areas of the site may be restricted. User IDs and passwords
            must remain confidential.
          </p>

          {/* Section 3: Your Content */}
          <h3 className="pb-4 font-bold text-lg">3. Your Content</h3>
          <p className="pb-4 text-sm text-lightGray">
            "Your Content" includes any material you display on this website. By
            doing so, you grant Growers-Hub.com a non-exclusive, worldwide,
            sublicensable license to use, adapt, and distribute it. Your Content
            must not violate third-party rights.
          </p>

          {/* Section 4: No Warranties */}
          <h3 className="pb-4 font-bold text-lg">4. No Warranties</h3>
          <p className="pb-4 text-sm text-lightGray">
            The website is provided "as is" without warranties of any kind.
            Nothing on the website constitutes professional advice.
          </p>

          {/* Section 5: Limitation of Liability */}
          <h3 className="pb-4 font-bold text-lg">5. Limitation of Liability</h3>
          <p className="pb-4 text-sm text-lightGray">
            Growers-Hub.com and its employees are not liable for any direct or
            indirect damages arising from your use of the website.
          </p>

          {/* Section 6: Indemnification */}
          <h3 className="pb-4 font-bold text-lg">6. Indemnification</h3>
          <p className="pb-4 text-sm text-lightGray">
            You indemnify Growers-Hub.com against any liabilities or expenses
            resulting from your breach of these terms.
          </p>

          {/* Section 7: Severability */}
          <h3 className="pb-4 font-bold text-lg">7. Severability</h3>
          <p className="pb-4 text-sm text-lightGray">
            If any provision is found invalid, the remaining provisions remain
            effective.
          </p>

          {/* Section 8: Variation of Terms */}
          <h3 className="pb-4 font-bold text-lg">8. Variation of Terms</h3>
          <p className="pb-4 text-sm text-lightGray">
            Growers-Hub.com reserves the right to revise these terms at any
            time.
          </p>

          {/* Section 9: Assignment */}
          <h3 className="pb-4 font-bold text-lg">9. Assignment</h3>
          <p className="pb-4 text-sm text-lightGray">
            Growers-Hub.com may assign its rights without notice. You cannot
            assign your rights under these terms.
          </p>

          {/* Section 10: Entire Agreement */}
          <h3 className="pb-4 font-bold text-lg">10. Entire Agreement</h3>
          <p className="pb-4 text-sm text-lightGray">
            These terms constitute the entire agreement between you and
            Growers-Hub.com.
          </p>

          {/* Section 11: Governing Law & Jurisdiction */}
          <h3 className="pb-4 font-bold text-lg">
            11. Governing Law & Jurisdiction
          </h3>
          <p className="pb-4 text-sm text-lightGray">
            These terms are governed by California state law. You agree to the
            jurisdiction of California courts for dispute resolution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsofService;
