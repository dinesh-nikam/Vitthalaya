import { canonicalMetadata } from '@/src/lib/seo';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Mail, Clock, HelpCircle, AlertTriangle } from 'lucide-react';
import '@/app/homepage.css';

export const metadata = {
  title: 'तक्रार निवारण व अधिकारी (Grievance Redressal) | डिजिटल पंढरपूर',
  description: 'डिजिटल पंढरपूर तक्रार निवारण कक्ष. DPDP Act 2023 व IT Rules 2021 नुसार तक्रार निवारण अधिकारी व साहित्य हटवण्याची प्रक्रिया.',
  ...canonicalMetadata({ canonical: '/grievance' }),
};

export default function GrievancePage() {
  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-4xl space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रंब">
          <ol className="flex items-center gap-2 text-xs font-marathi text-[var(--dp-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--dp-gold)] transition-colors">
                मुख्यपृष्ठ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">तक्रार निवारण अधिकारी (Grievance Officer)</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <ShieldCheck size={12} />
            वैधानिक तक्रार निवारण कक्ष (Statutory Compliance)
          </div>
          <h1 className="vitthalaya-display text-3xl sm:text-4xl font-bold">
            तक्रार निवारण व साहित्य हक्क (Grievance & Takedown)
          </h1>
          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)]">
            Digital Personal Data Protection Act, 2023 & Information Technology Rules, 2021
          </p>
        </header>

        {/* Grievance Officer Card */}
        <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-gold)]/40 bg-[var(--dp-ground-elevated)] shadow-lg space-y-4">
          <h2 className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)] flex items-center gap-2">
            <ShieldCheck size={20} />
            नियुक्त तक्रार निवारण अधिकारी (Designated Grievance Officer)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-marathi">
            <div>
              <p className="text-[var(--dp-muted)]">अधिकारी नाव (Name):</p>
              <p className="font-bold text-[var(--dp-ink)]">श्री. दिनेश निकम (Dinesh Nikam)</p>
            </div>
            <div>
              <p className="text-[var(--dp-muted)]">पदनाम (Designation):</p>
              <p className="font-bold text-[var(--dp-ink)]">माहिती व तक्रार निवारण अधिकारी (Grievance Redressal Officer)</p>
            </div>
            <div>
              <p className="text-[var(--dp-muted)]">ईमेल पत्ता (Official Email):</p>
              <a
                href="mailto:grievance@digitalpandharpur.org"
                className="font-bold text-[var(--dp-gold)] underline hover:text-[var(--dp-gold-celestial)] flex items-center gap-1 mt-0.5"
              >
                <Mail size={14} />
                grievance@digitalpandharpur.org
              </a>
            </div>
            <div>
              <p className="text-[var(--dp-muted)]">पत्ता (Postal Address):</p>
              <p className="text-[var(--dp-ink)]">डिजिटल पंढरपूर संवर्धन न्यास, पंढरपूर, महाराष्ट्र - ४१३३०४</p>
            </div>
          </div>
        </div>

        {/* Content Body & SLA */}
        <article className="vitthalaya-card rounded-2xl p-6 sm:p-10 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-8 text-sm font-marathi text-[var(--dp-ink)]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] flex items-center gap-2">
              <Clock size={18} />
              १. तक्रार निवारण कालमर्यादा (Response SLA)
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong>पोहोच पावती (Acknowledgment):</strong> प्राप्त झालेल्या प्रत्येक तक्रारीची २४ तासांच्या आत पावती दिली जाईल.</li>
              <li><strong>अंतिम निवारण (Final Resolution):</strong> सर्व तक्रारींची सखोल चौकशी करून १५ दिवसांच्या आत अंतिम निवारण केले जाईल.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] flex items-center gap-2">
              <AlertTriangle size={18} />
              २. साहित्य हटवण्याची प्रक्रिया (Content Takedown Procedure)
            </h2>
            <p>
              जर प्लॅटफॉर्मवरील कोणत्याही अभंग, पद, ऑडिओ किंवा छायाचित्रावर कॉपीराइट किंवा बौद्धिक संपदा हक्कांचे उल्लंघन असल्याचा आक्षेप असल्यास:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm pl-2">
              <li>विशिष्ट मजकुराची किंवा पृष्ठाची वेब लिंक (URL) स्पष्ट नमूद करा.</li>
              <li>आपल्या मालकी हक्कांचा किंवा अधिकाराचा पुरावा सोबत जोडा.</li>
              <li>तक्रार <code>grievance@digitalpandharpur.org</code> वर पाठवा.</li>
              <li>पडताळणी कालावधीत संबंधित मजकूर तात्पुरता किंवा कायमचा काढून टाकला जाईल.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] flex items-center gap-2">
              <HelpCircle size={18} />
              ३. अपील व संपर्क (Escalation & Appeals)
            </h2>
            <p>
              तक्रार निवारण अधिकाऱ्याच्या निर्णयाविरुद्ध वापरकर्त्यांना डिजिटल वैयक्तिक डेटा संरक्षण मंडळ (Data Protection Board of India) कडे अपील करण्याचा कायदेशीर अधिकार आहे.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
