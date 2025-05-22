import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="container py-8 flex-grow">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>

        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to EcoSense ("we," "our," or "us"). We are committed to protecting your privacy and personal data.
            This Privacy Policy explains how we collect, use, and share information about you when you use our website,
            mobile application, and services (collectively, the "Services").
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide</h3>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>Account information (name, email address, password)</li>
            <li>Profile information (preferences, sustainability goals)</li>
            <li>Device usage data you input (screen time, energy consumption, app usage patterns)</li>
            <li>Payment information when you make contributions to reforestation efforts</li>
            <li>Communications you send to us</li>
          </ul>

          <h3>2.2 Information We Collect Automatically</h3>
          <p>When you use our Services, we may automatically collect certain information, including:</p>
          <ul>
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage information (pages visited, features used, time spent)</li>
            <li>Location information (with your permission)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our Services</li>
            <li>Generate personalized sustainability recommendations</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Develop new products and services</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize your experience</li>
          </ul>

          <h2>4. AI Features and Data Processing</h2>
          <p>
            Our Services include AI-powered features that analyze your device usage data to provide personalized
            sustainability recommendations. When you use these features:
          </p>
          <ul>
            <li>Your data is processed by our AI systems to generate insights and recommendations</li>
            <li>We may use anonymized data to improve our AI models</li>
            <li>You can opt out of AI-powered features in your account settings</li>
            <li>We use third-party AI services (like Groq) to process some data, subject to their privacy policies</li>
          </ul>

          <h2>5. Sharing Your Information</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li>With service providers who perform services on our behalf</li>
            <li>With partners when you explicitly request such sharing (e.g., Fiverr sustainable services)</li>
            <li>To comply with legal obligations</li>
            <li>In connection with a merger, sale, or acquisition</li>
            <li>With your consent or at your direction</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain your information for as long as necessary to provide our Services and fulfill the purposes
            described in this Privacy Policy, unless a longer retention period is required by law.
          </p>

          <h2>7. Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Accessing, correcting, or deleting your information</li>
            <li>Objecting to our processing of your information</li>
            <li>Requesting restriction of processing</li>
            <li>Data portability</li>
            <li>Withdrawing consent</li>
          </ul>

          <h2>8. Security</h2>
          <p>
            We implement reasonable security measures to protect your information from unauthorized access, alteration,
            disclosure, or destruction.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to, and processed in, countries other than the country in which you
            reside. These countries may have data protection laws that are different from the laws of your country.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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
