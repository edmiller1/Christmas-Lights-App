import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { SEO } from "@/components";

export const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        description="Privacy Policy for Christmas Lights App"
        name="Privacy Policy"
        title="Privacy Policy"
        type="Privacy Policy"
      />
      <div className="mx-5 mt-3 mb-10 2xl:mx-96 md:mx-72">
        <Link to="/home">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <div className="mt-16">
          <h1 className="font-semibold text-2xl">Privacy Policy</h1>
          <div className="mt-10">
            <p className="mt-3">
              This Privacy Policy describes how we collect, use, and disclose
              your information in connection with your use of our mobile
              application or website, Christmas Lights App ("App").
            </p>
          </div>
          <div className="mt-10">
            <h2 className="font-semibold text-xl">1. Information We Collect</h2>
            <p className="mt-3">
              We may collect the following information from you:
              <ul className="list-disc ml-12">
                <li>
                  <strong>Personal Information:</strong> We may collect personal
                  information that you provide to us voluntarily, such as your
                  name and email address (optional) if you choose to create an
                  account.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may collect usage data about
                  your use of the App, such as the features you access, the
                  content you create or view, and the time and date of your
                  activity. This information is collected automatically by the
                  App.
                </li>
              </ul>
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">
              2. Use of Your Information
            </h2>
            <p className="mt-3">
              We may use your information for the following purposes:
              <ul className="list-disc ml-12">
                <li>
                  To provide and operate the App, including to allow you to
                  create and view Christmas decorations.
                </li>
                <li>To personalize your experience with the App.</li>
                <li>To analyze the use of the App and improve our services.</li>
                <li>
                  To send you communications, such as promotional emails or push
                  notifications (with your consent).
                </li>
                <li>To comply with legal and regulatory requirements.</li>
              </ul>
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">
              3. Sharing Your Information
            </h2>
            <p className="mt-3">
              We may share your information with third-party service providers
              who help us operate the App, such as cloud storage providers or
              analytics providers. These service providers will only use your
              information in accordance with our instructions and applicable
              privacy laws.
            </p>
            <p className="mt-3">
              We will not share your personal information with any third-party
              for marketing purposes without your consent.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">4. Data Retention</h2>
            <p className="mt-3">
              We will retain your information for as long as necessary to
              fulfill the purposes described in this Privacy Policy, unless a
              longer retention period is required or permitted by law.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">5. Security</h2>
            <p className="mt-3">
              We take reasonable steps to protect your information from
              unauthorized access, disclosure, alteration, or destruction.
              However, no internet transmission or electronic storage is
              completely secure. We cannot guarantee the security of your
              information.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">
              7. International Transfers
            </h2>
            <p className="mt-3">
              Your information may be transferred to and processed in countries
              other than your own. These countries may have different data
              protection laws than your own country.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">8. Your Rights</h2>
            <p className="mt-3">
              You may have certain rights with respect to your information,
              depending on the law of your jurisdiction. These rights may
              include the right to access, correct, or delete your information,
              or to object to our processing of your information.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">
              9. Changes to this Privacy Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on the
              App.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">10. Contact Us</h2>
            <p className="mt-3">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:support@christmaslightsapp.com"
                className="underline"
              >
                support@christmaslightsapp.com
              </a>
              .
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl">11. Third-Party Links</h2>
            <p className="mt-3">
              The App may contain links to third-party websites or applications.
              We are not responsible for the privacy practices of these third
              parties. We recommend that you read the privacy policies of any
              third-party websites or applications that you visit.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
