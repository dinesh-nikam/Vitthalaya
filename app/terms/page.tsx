import { canonicalMetadata } from '@/src/lib/seo';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, BookOpen, AlertCircle } from 'lucide-react';
import '@/app/homepage.css';

export const metadata = {
  title: 'वापर नियम व अटी (Terms of Service) | डिजिटल पंढरपूर',
  description: 'डिजिटल पंढरपूर प्लॅटफॉर्म वापरण्याचे नियम व अटी. संत साहित्याची पवित्रता, मुक्त ज्ञानदान आणि वापरकर्त्याच्या जबाबदाऱ्या.',
  ...canonicalMetadata({ canonical: '/terms' }),
};

export default function TermsPage() {
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
            <li className="text-[var(--dp-ink)] font-medium">वापर नियम व अटी (Terms of Service)</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <ShieldCheck size={12} />
            संत वाङ्मय संरक्षण व नियम
          </div>
          <h1 className="vitthalaya-display text-3xl sm:text-4xl font-bold">
            वापर नियम व अटी (Terms of Service)
          </h1>
          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)]">
            अंतिम अद्यतन: नोव्हेंबर २०२६ • Digital Pandharpur Devotional Platform
          </p>
        </header>

        {/* Content Body */}
        <article className="vitthalaya-card rounded-2xl p-6 sm:p-10 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-8 text-sm font-marathi text-[var(--dp-ink)]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] flex items-center gap-2">
              <BookOpen size={18} />
              १. संत साहित्याची पवित्रता व उद्देश (Sacred Mission)
            </h2>
            <p>
              डिजिटल पंढरपूर हा वारकरी भक्ती संप्रदायाचा सार्वजनिक आणि मुक्त ज्ञानसंग्रह आहे. येथील अभंग, विराण्या, गौळणी, भारुडे आणि चरित्रे वारकरी संतांच्या पावन परंपरेचा ठेवा आहेत. या साहित्याचा वापर केवळ वैयक्तिक वाचन, चिंतन, कीर्तन-प्रवचन आणि संशोधनासाठी विनामूल्य उपलब्ध आहे.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] flex items-center gap-2">
              <AlertCircle size={18} />
              २. स्वीकारार्ह वापर (Acceptable Use)
            </h2>
            <p>
              प्लॅटफॉर्म वापरताना खालील नियम पाळणे बंधनकारक आहे:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li>संत साहित्यात जाणीवपूर्वक विकृती, अपशब्द किंवा अनादर पसरवणारे कोणतेही संपादन किंवा टिप्पणी करण्यास सक्त मनाई आहे.</li>
              <li>स्वयंचलित बॉट्स किंवा स्क्रॅपर्सद्वारे प्लॅटफॉर्मच्या सेवेवर विपरीत ताण आणण्यास बंदी आहे.</li>
              <li>वारकरी परंपरेची प्रतिमा मलीन करणारा कोणताही व्यावसायिक किंवा चुकीचा प्रचार निषिद्ध आहे.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)]">
              ३. समुदाय योगदान व अधिकार (Community Submissions)
            </h2>
            <p>
              जेव्हा आपण नवीन अभंग, ऑडिओ किंवा मजकूर सुधारणा पाठवता, तेव्हा आपण हे निश्चित करता की:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li>सादर केलेली सामग्री सार्वजनिक डोमेनमध्ये (Public Domain) आहे किंवा ती प्रसिद्ध करण्याचे कायदेशीर अधिकार आपल्याकडे आहेत.</li>
              <li>डिजिटल पंढरपूरला ती सामग्री वारकरी भाविकांसाठी विनामूल्य उपलब्ध करून देण्याची कायमस्वरूपी परवानगी प्राप्त होते.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-[var(--dp-rule)]/50">
            <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)]">
              ४. साहित्य हटवणे व तक्रार (Content Takedown)
            </h2>
            <p>
              कोणत्याही मजकुरावर हक्क उल्लंघनाची किंवा त्रुटीची तक्रार असल्यास, कृपया आमच्या{' '}
              <Link href="/grievance" className="text-[var(--dp-gold)] underline hover:text-[var(--dp-gold-celestial)]">
                तक्रार निवारण दालनाचा
              </Link>{' '}
              वापर करावा. योग्य पडताळणीनंतर २४ तासांच्या आत कार्यवाही केली जाईल.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
