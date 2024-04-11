import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export const Terms = () => {
  return (
    <div className="mx-5 mt-3 mb-10 2xl:mx-96 md:mx-72">
      <Link to="/home">
        <img src={logo} alt="logo" className="w-10 h-10" />
      </Link>
      <div className="mt-16">
        <h1 className="font-semibold text-2xl">Terms of Service</h1>
        <div className="mt-10">
          <p>
            These Terms of Service ("Terms") govern your access and use of the
            Christmas Lights App mobile application and website (the "App"). By
            accessing or using the App, you agree to be bound by these Terms. If
            you disagree with any part of the Terms, then you may not access or
            use the App.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="font-semibold text-xl">1. Account and User Content</h2>
          <p className="mt-3 text-justify">
            <strong>1.1</strong> To create an account and use certain features
            of the App, you may be required to provide certain information,
            including your name and email address. You are responsible for
            maintaining the confidentiality of your account information,
            including your password. You are also responsible for all activity
            that occurs under your account.
          </p>
          <p className="mt-3 text-justify">
            <strong>1.2</strong> You are solely responsible for all content that
            you upload, post, or otherwise transmit through the App ("User
            Content"). You represent and warrant that you have all rights
            necessary to upload or transmit such User Content and to grant the
            rights and licenses set forth in these Terms.
          </p>
          <p className="mt-3 text-justify">
            <strong>1.3</strong> You agree not to upload, post, or otherwise
            transmit User Content that:
            <ul className="list-disc ml-12">
              <li>
                Is unlawful, harmful, threatening, abusive, harassing,
                defamatory, obscene, hateful, or racially or ethnically
                offensive.
              </li>
              <li>
                Infringes on the intellectual property rights of any third
                party.
              </li>
              <li>
                Contains personal information of any third party without their
                consent.
              </li>
              <li>Violates any applicable laws or regulations.</li>
            </ul>
          </p>
          <p className="mt-3 text-justify">
            <strong>1.4</strong> We reserve the right to remove or modify any
            User Content that violates these Terms or that we deem to be
            inappropriate for any reason.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="font-semibold text-xl">2. Use of the App</h2>
          <p className="mt-3 text-justify">
            <strong>2.1</strong> You agree to use the App in accordance with
            these Terms and all applicable laws and regulations.
          </p>
          <p className="mt-3 text-justify">
            <strong>2.2</strong> You agree not to use the App for any purpose
            that is unauthorized or prohibited by these Terms.
          </p>
          <p className="mt-3 text-justify">
            <strong>2.3</strong> You agree not to interfere with or disrupt the
            servers or networks used by the App.
          </p>
          <p className="mt-3 text-justify">
            <strong>2.4</strong> You agree not to attempt to gain unauthorized
            access to the App or any related systems or networks.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">3. Intellectual Property</h2>
          <p className="mt-3 text-justify">
            <strong>3.1</strong> The App and all of its content, including but
            not limited to text, graphics, logos, images, and software, are the
            property of Christmas Lights App or its licensors and are protected
            by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mt-3 text-justify">
            <strong>3.2</strong> You may not modify, publish, distribute, create
            derivative works of, reverse engineer, decompile, or disassemble any
            part of the App.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">4. Disclaimer</h2>
          <p className="mt-3 text-justify">
            <strong>4.1</strong> THE APP IS PROVIDED "AS IS" AND WITHOUT
            WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DISCLAIM ALL
            WARRANTIES, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p className="mt-3 text-justify">
            <strong>4.2</strong> WE DO NOT WARRANT THAT THE APP WILL BE
            UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT
            THE APP IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
          <p className="mt-3 text-justify">
            <strong>4.3</strong> YOU USE THE APP AT YOUR OWN RISK.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">5. Limitation of Liability</h2>
          <p className="mt-3 text-justify">
            <strong>4.1</strong> IN NO EVENT SHALL Christmas Lights App, ITS
            OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY DIRECT,
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
            (INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, LOSS OF
            USE, LOSS OF DATA, OR OTHER INTANGIBLE LOSSES) ARISING OUT OF OR
            RELATING TO YOUR USE OF THE APP, EVEN IF WE HAVE BEEN ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">6. Termination</h2>
          <p className="mt-3 text-justify">
            <strong>6.1</strong> We may terminate your access to the App for any
            reason, at any time, without notice.
          </p>
          <p className="mt-3 text-justify">
            <strong>6.2</strong> You may terminate your account at any time.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">7. Governing Law</h2>
          <p className="mt-3 text-justify">
            <strong>7.1</strong> These Terms shall be governed by and construed
            in accordance with the laws of Australia and New Zealand, without
            regard to its conflict of law provisions.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">8. Entire Agreement</h2>
          <p className="mt-3 text-justify">
            <strong>8.1</strong> These Terms constitute the entire agreement
            between you and Christmas Lights App regarding your use of the App.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">9. Changes to the Terms</h2>
          <p className="mt-3 text-justify">
            <strong>9.1</strong> We reserve the right to change these Terms at
            any time. We will notify you of any changes by posting the revised
            Terms on the App. Your continued use of the App following the
            posting of revised Terms will constitute your acceptance of the
            changes.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">10. Contact Us</h2>
          <p className="mt-3 text-justify">
            <strong>10.1</strong> If you have any questions about these Terms,
            please contact us at{" "}
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
          <h2 className="font-semibold text-xl">11. Holiday Disclaimer</h2>
          <p className="mt-3 text-justify">
            <strong>11.1</strong> While Christmas Lights App is designed to
            inspire and celebrate the holiday season, please remember that
            traditions and practices vary around the world. We encourage you to
            be respectful of all cultures and beliefs.
          </p>
        </div>
      </div>
    </div>
  );
};
