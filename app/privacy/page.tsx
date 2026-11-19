import { canonicalMetadata } from '@/src/lib/seo';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import '@/app/homepage.css';

export const metadata = {
  title: 'गोपनीयता धोरण (Privacy Policy) | डिजिटल पंढरपूर',
  description: 'डिजिटल पंढरपूरचे गोपनीयता धोरण. DPDP Act 2023 नुसार वारकरी भाविकांच्या माहितीचे रक्षण आणि सुरक्षा नियम.',
  ...canonicalMetadata({ canonical: '/privacy' }),
};

export default function PrivacyPage() {
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
            <li className="text-[var(--dp-ink)] font-medium">गोपनीयता धोरण (Privacy Policy)</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <ShieldCheck size={12} />
            डिजिटल वैयक्तिक डेटा संरक्षण (DPDP Act 2023 सुसंगत)
          </div>
          <h1 className="vitthalaya-display text-3xl sm:text-4xl font-bold">
            गोपनीयता धोरण (Privacy Policy)
          </h1>
          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)]">
            अंतिम अद्यतन: नोव्हेंबर २०२६ • Digital Personal Data Protection Act, 2023 Compliance
          </p>
        </header>

        {/* Content Body */}
        <article className="vitthalaya-card rounded-2xl p-6 sm:p-10 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-8 text-sm font-marathi text-[var(--dp-ink)]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] flex items-center gap-2">
              <Eye size={18} />
              १. आम्ही कोणती माहिती संकलित करतो? (Data We Collect)
            </h2>
            <p>
              डिजिटल पंढरपूर हा वारकरी भक्ती साहित्याचा खुला सांस्कृतिक ज्ञानसंग्रह आहे. आम्ही वापरकर्त्यांची अनावश्यक माहिती संकलित करत नाही. केवळ खालील मर्यादित माहिती वापरली जाते:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong>खाते माहिती (Account Data):</strong> आपण नोंदणी केल्यास आपले नाव आणि ईमेल पत्ता (Google OAuth किंवा क्रेडेंशियल्सद्वारे).</li>
              <li><strong>वाचन पसंती (Reading Preferences):</strong> फॉन्ट आकार, डार्क मोड आणि जतन केलेले अभंग (केवळ आपल्या ब्राउझरमध्ये स्थानिक स्वरूपात जतन).</li>
              <li><strong>योगदान व सुधारणा (Submissions):</strong> भाविकांनी पाठवलेल्या रचना सुधारणा, अभिप्राय किंवा ऑडिओ स्वर-योगदान.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] flex items-center gap-2">
              <Lock size={18} />
              २. डेटा सुरक्षा व गोपनीयता (Data Security)
            </h2>
            <p>
              आपल्या डेटाची सुरक्षा ही आमची सर्वोच्च प्राथमिकता आहे:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li>आम्ही वापरकर्त्यांचा वैयक्तिक डेटा कोणत्याही जाहिरातदार किंवा तृतीय पक्षाला विकत नाही.</li>
              <li>सर्व पासवर्ड्स OWASP शिफारशीनुसार PBKDF2 (६००,००० पुनरावृत्ती) द्वारे कूटबद्ध (hashed) केले जातात.</li>
              <li>सर्व संवाद HTTPS/TLS 1.3 एन्क्रिप्शनद्वारे सुरक्षित केले जातात.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] flex items-center gap-2">
              <FileText size={18} />
              ३. वापरकर्त्याचे हक्क (User Rights under DPDP Act 2023)
            </h2>
            <p>
              भारताच्या डिजिटल वैयक्तिक डेटा संरक्षण कायद्यानुसार (DPDP Act, 2023) आपल्याला खालील हक्क प्राप्त आहेत:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li>आपल्या संकलित डेटाची माहिती मिळवण्याचा हक्क (Right to Access).</li>
              <li>आपल्या खात्यातील माहिती दुरुस्त करण्याचा किंवा हटवण्याचा हक्क (Right to Correction and Erasure).</li>
              <li>कोणत्याही क्षणी संमती मागे घेण्याचा हक्क (Right to Withdraw Consent).</li>
              <li>तक्रार निवारणाचा हक्क (Right of Grievance Redressal).</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-[var(--dp-rule)]/50">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)]">
              ४. संपर्क व तक्रार निवारण (Contact & Grievance Officer)
            </h2>
            <p>
              गोपनीयता किंवा डेटा संदर्भातील कोणत्याही प्रश्नासाठी कृपया आमच्या{' '}
              <Link href="/grievance" className="text-[var(--dp-gold)] underline hover:text-[var(--dp-gold-celestial)]">
                तक्रार निवारण अधिकाऱ्याशी (Grievance Officer) संपर्क साधा
              </Link>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
