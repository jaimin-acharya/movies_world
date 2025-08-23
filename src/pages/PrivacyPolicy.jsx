export default function PrivacyPolicy() {
  const lastUpdated = "August 23, 2025";

  return (
    <main className="h-full bg-transparent text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-medium text-left tracking-tight mb-4">
          Privacy Policy
        </h1>
        <div className="w-16 h-px bg-white/20 mb-16"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <article className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              1) Introduction
            </h2>
            <p className="text-white/80 leading-relaxed">
              Movies World operates the Site and hosts code on GitHub. By using
              the Site, you agree to this Privacy Policy. If you do not agree,
              please discontinue use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              2) Information We Collect
            </h2>
            <div className="space-y-3 text-white/80">
              <p>
                <span className="text-white font-medium">
                  Usage & Log Data:
                </span>{" "}
                Non-identifying data such as device/browser type, pages viewed,
                approximate location (from IP), and referrers to understand
                performance and usage trends.
              </p>
              <p>
                <span className="text-white font-medium">
                  Cookies & Local Storage:
                </span>{" "}
                Used to keep the site functional and analyze interactions. You
                can control cookies in your browser settings.
              </p>
              <p>
                <span className="text-white font-medium">
                  Account Data (if applicable):
                </span>{" "}
                If you sign in (e.g., via Firebase Auth), we may process your
                email and profile-basic data to provide authentication.
              </p>
              <p>
                <span className="text-white font-medium">
                  GitHub Interactions:
                </span>{" "}
                Any info you share via issues, discussions, or pull requests is
                public per GitHub's policies.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              3) How We Use Information
            </h2>
            <div className="space-y-3 text-white/80">
              <p>• Operate, maintain, and improve the Site and its features.</p>
              <p>• Debug issues and secure the Site against abuse.</p>
              <p>
                • Analyze aggregate usage to guide UI, performance, and content
                improvements.
              </p>
              <p>
                • Provide authentication and user features where enabled (e.g.,
                watchlists, comments).
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              4) Third-Party Services
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We may rely on third-party providers that process limited data to
              deliver the Site. These may include:
            </p>
            <div className="space-y-3 text-white/80">
              <p>
                <span className="text-white font-medium">Hosting:</span> Vercel
                (serving pages, edge network).
              </p>
              <p>
                <span className="text-white font-medium">
                  Authentication / Database (if enabled):
                </span>{" "}
                Firebase (Auth, Firestore) by Google.
              </p>
              <p>
                <span className="text-white font-medium">
                  Analytics (if enabled):
                </span>{" "}
                e.g., Vercel Web Analytics or Google Analytics.
              </p>
            </div>
            <p className="text-white/60 text-sm mt-4 leading-relaxed">
              Each provider has its own privacy notice. Review and configure
              them to match your implementation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              5) Data Sharing & Disclosure
            </h2>
            <div className="space-y-3 text-white/80">
              <p>• We do not sell or rent personal information.</p>
              <p>
                • We may share data to comply with law, enforce our terms, or
                protect rights, safety, and security.
              </p>
              <p>
                • Aggregated, de-identified insights may be shared publicly
                (e.g., project stats) that cannot reasonably identify you.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              6) Data Retention & Security
            </h2>
            <p className="text-white/80 leading-relaxed">
              We keep data only as long as necessary for the purposes stated
              above and apply reasonable technical and organizational safeguards
              to reduce risks of unauthorized access, alteration, or misuse.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              7) Children's Privacy
            </h2>
            <p className="text-white/80 leading-relaxed">
              The Site is not directed to children under 16. We do not knowingly
              collect personal data from children. If you believe a child has
              provided personal data, please contact us to request deletion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              8) Your Rights & Choices
            </h2>
            <div className="space-y-3 text-white/80">
              <p>
                • Access, update, or delete account data (where accounts exist).
              </p>
              <p>• Control cookies via your browser settings.</p>
              <p>
                • Opt out of optional analytics where provided. You may also use
                browser privacy features or extensions.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              9) Changes to This Policy
            </h2>
            <p className="text-white/80 leading-relaxed">
              We may update this Privacy Policy from time to time. Material
              changes will be reflected by updating the "Last Updated" date at
              the top of this page. Your continued use of the Site constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-white/90">
              10) Contact Us
            </h2>
            <p className="text-white/80 leading-relaxed">
              Questions or requests regarding privacy can be sent via a GitHub
              issue on the repository or by email at{" "}
              <a
                href="mailto:jaiminacharya333@example.com"
                className="text-white underline decoration-1 underline-offset-2 hover:text-white/80 transition-colors"
              >
                jaiminacharya333@example.com
              </a>
            </p>
          </section>
        </article>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-white/60">
            <p className="text-sm">
              © {new Date().getFullYear()} Movies World. All rights reserved.
            </p>
            <p className="text-xs">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
