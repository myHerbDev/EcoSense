import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="container py-8 flex-grow">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Cookie Policy</h1>

        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to the website owners.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>EcoSense uses cookies for the following purposes:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> These cookies are necessary for the website to function properly.
            </li>
            <li>
              <strong>Preference cookies:</strong> These cookies remember your preferences and settings.
            </li>
            <li>
              <strong>Analytics cookies:</strong> These cookies help us understand how visitors interact with our
              website.
            </li>
            <li>
              <strong>Functionality cookies:</strong> These cookies enable enhanced functionality and personalization.
            </li>
          </ul>

          <h2>3. Types of Cookies We Use</h2>
          <h3>3.1 Session Cookies</h3>
          <p>
            Session cookies are temporary and are deleted when you close your browser. They help us track your movements
            from page to page so you don't have to provide the same information repeatedly.
          </p>

          <h3>3.2 Persistent Cookies</h3>
          <p>
            Persistent cookies remain on your device for a set period or until you delete them. They help us recognize
            you as a returning visitor and remember your preferences.
          </p>

          <h3>3.3 First-Party Cookies</h3>
          <p>First-party cookies are set by our website directly.</p>

          <h3>3.4 Third-Party Cookies</h3>
          <p>
            Third-party cookies are set by our partners and service providers. These may include analytics providers,
            advertising networks, and social media platforms.
          </p>

          <h2>4. Specific Cookies We Use</h2>
          <table className="w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr className="bg-muted">
                <th className="border border-gray-300 p-2 text-left">Cookie Name</th>
                <th className="border border-gray-300 p-2 text-left">Purpose</th>
                <th className="border border-gray-300 p-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">sidebar:state</td>
                <td className="border border-gray-300 p-2">
                  Remembers the state of the sidebar (expanded or collapsed)
                </td>
                <td className="border border-gray-300 p-2">7 days</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">theme</td>
                <td className="border border-gray-300 p-2">Stores your preferred theme (light, dark, or system)</td>
                <td className="border border-gray-300 p-2">1 year</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">userRegistered</td>
                <td className="border border-gray-300 p-2">Tracks whether you have registered an account</td>
                <td className="border border-gray-300 p-2">Persistent</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">bannerDismissed</td>
                <td className="border border-gray-300 p-2">
                  Remembers whether you have dismissed the registration banner
                </td>
                <td className="border border-gray-300 p-2">Persistent</td>
              </tr>
            </tbody>
          </table>

          <h2>5. Managing Cookies</h2>
          <p>Most web browsers allow you to control cookies through their settings. You can:</p>
          <ul>
            <li>Delete cookies from your device</li>
            <li>
              Block cookies by activating the setting on your browser that allows you to refuse all or some cookies
            </li>
            <li>Set your browser to notify you when you receive a cookie</li>
          </ul>
          <p>
            Please note that if you choose to block or delete cookies, you may not be able to access certain areas or
            features of our website, and some services may not function properly.
          </p>

          <h2>6. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page and updating the "Last updated" date.
          </p>

          <h2>7. Contact Us</h2>
          <p>If you have any questions about our Cookie Policy, please contact us at:</p>
          <p>
            Email: privacy@ecosense.example.com
            <br />
            Address: 123 Green Street, Sustainability City, 12345
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
