import React from 'react';
function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4 text-gray-700">
          At <strong>NerdLed Blog</strong>, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and protect your information when you use our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p className="mb-4 text-gray-700">
          We may collect information such as your name, email address, and usage data when you interact with our site, sign up for newsletters, or leave comments.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>To provide and improve our blog content and user experience.</li>
          <li>To respond to your queries or support requests.</li>
          <li>To send occasional updates or newsletters (only if you opt-in).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4 text-gray-700">
          We may use cookies to personalize your experience. You can disable cookies in your browser settings at any time.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
        <p className="mb-4 text-gray-700">
          We do not share your personal data with third parties, except when required by law or if integrated tools (like analytics) collect data anonymously.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
        <p className="mb-4 text-gray-700">
          You have the right to access, update, or delete your data. You can contact us any time at <span className="text-blue-600">privacy@nerdledblog.com</span>.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: July 3, 2025
        </p>
      </div>
    </div>
  );
}

export default PrivacyPage;
