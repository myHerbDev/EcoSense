import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="container py-8 flex-grow">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Terms of Use</h1>

        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using EcoSense's website, mobile application, and services (collectively, the "Services"),
            you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our
            Services.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            EcoSense provides tools and services to help users track and improve their digital sustainability footprint.
            Our Services include:
          </p>
          <ul>
            <li>Device usage tracking and analytics</li>
            <li>AI-powered sustainability recommendations</li>
            <li>Connection to sustainable service providers</li>
            <li>Reforestation contribution opportunities</li>
          </ul>

          <h2>3. User Accounts</h2>
          <p>To access certain features of our Services, you may need to create an account. You are responsible for:</p>
          <ul>
            <li>Providing accurate and complete information</li>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>

          <h2>4. User Content</h2>
          <p>
            You retain ownership of any content you submit through our Services. By submitting content, you grant us a
            non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, and
            distribute it in connection with our Services.
          </p>

          <h2>5. AI Features and Data Usage</h2>
          <p>
            Our Services include AI-powered features that analyze your device usage data to provide personalized
            sustainability recommendations. By using these features:
          </p>
          <ul>
            <li>You consent to our processing of your data to generate insights and recommendations</li>
            <li>You understand that recommendations are algorithmic and may not always be accurate</li>
            <li>You acknowledge that we may use anonymized data to improve our AI models</li>
            <li>You can opt out of AI-powered features in your account settings</li>
          </ul>

          <h2>6. Third-Party Services</h2>
          <p>
            Our Services may include links to third-party websites or services, including sustainable service providers
            through Fiverr. We are not responsible for the content or practices of these third parties, and your use of
            their services is subject to their terms and policies.
          </p>

          <h2>7. Reforestation Contributions</h2>
          <p>When you make contributions to reforestation efforts through our Services:</p>
          <ul>
            <li>You authorize us to process your payment</li>
            <li>You understand that contributions are used to plant trees through our partner organizations</li>
            <li>You acknowledge that the exact location and timing of tree planting is determined by our partners</li>
            <li>You agree that contributions are non-refundable</li>
          </ul>

          <h2>8. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our Services, including but not limited to text, graphics,
            logos, icons, images, audio clips, and software, are owned by EcoSense or our licensors and are protected by
            copyright, trademark, and other intellectual property laws.
          </p>

          <h2>9. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our Services for any illegal purpose</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt our Services</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use our Services to transmit harmful code or content</li>
            <li>Collect or harvest user data without permission</li>
          </ul>

          <h2>10. Disclaimer of Warranties</h2>
          <p>
            Our Services are provided "as is" and "as available" without warranties of any kind, either express or
            implied. We do not guarantee that our Services will be uninterrupted, secure, or error-free.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, EcoSense shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or relating to your use of our Services.
          </p>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless EcoSense and its officers, directors, employees, and agents from
            any claims, damages, liabilities, costs, or expenses arising from your use of our Services or violation of
            these Terms.
          </p>

          <h2>13. Modifications to Terms</h2>
          <p>
            We may modify these Terms at any time by posting the revised terms on our website. Your continued use of our
            Services after such changes constitutes your acceptance of the revised Terms.
          </p>

          <h2>14. Termination</h2>
          <p>
            We may terminate or suspend your access to our Services at any time, without prior notice or liability, for
            any reason, including if you violate these Terms.
          </p>

          <h2>15. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without
            regard to its conflict of law provisions.
          </p>

          <h2>16. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            Email: legal@ecosense.example.com
            <br />
            Address: 123 Green Street, Sustainability City, 12345
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
