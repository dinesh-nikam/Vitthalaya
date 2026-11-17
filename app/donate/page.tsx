import { canonicalMetadata } from '@/src/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileEdit,
  BookPlus,
  Mic2,
  MessageSquareHeart,
  Sparkles,
  HeartHandshake,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import '@/app/homepage.css';

export const metadata = {
  title: 'सहयोग व सेवा (Seva & Contribution) | डिजिटल पंढरपूर',
  description:
    'डिजिटल पंढरपूर सांस्कृतिक व आध्यात्मिक संवर्धन उपक्रमात सहयोग करा. संत साहित्याचे संपादन, शुद्धीकरण व स्वर संकलन.',
  ...canonicalMetadata({ canonical: '/donate' }),
};

const WAYS_TO_HELP = [
  {
    icon: FileEdit,
    title: 'रचना शुद्धीकरण',
    titleEn: 'Text Proofreading',
    desc: 'हस्तलिखितांमधील किंवा मुद्रणातील अक्षरांच्या चुका, काना-मात्रा व विरामचिन्हे दुरुस्त करून सेवा द्या.',
    cta: 'सुधारणा सूचना पाठवा',
    href: '/community/corrections',
  },
  {
    icon: BookPlus,
    title: 'साहित्य संकलन',
    titleEn: 'Add Sacred Literature',
    desc: 'अप्रकाशित किंवा दुर्मीळ अभंग, संतांचे ऐतिहासिक संदर्भ व सार्थ ओव्या अभिलेखागारात समाविष्ट करा.',
    cta: 'नवीन रचना जोडा',
    href: '/community/submit',
  },
  {
    icon: Mic2,
    title: 'स्वर व ऑडिओ सेवा',
    titleEn: 'Audio Contribution',
    desc: 'अभंग, भजन, काकड आरती व कीर्तन गायनाची उच्च दर्जाची ऑडिओ रेकॉर्डिंग संकलित करून द्या.',
    cta: 'ऑडिओ पाठवा',
    href: '/community/submit',
  },
  {
    icon: MessageSquareHeart,
    title: 'प्रतिक्रिया व मार्गदर्शन',
    titleEn: 'Community Feedback',
    desc: 'अनुभव, तांत्रिक अडचणी व ॲपच्या सुधारणेसाठी मौलिक मार्गदर्शक सूचना नोंदवा.',
    cta: 'प्रतिक्रिया नोंदवा',
    href: '/community/feedback',
  },
];

export default function DonatePage() {
  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-3xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="ब्रेडक्रंब">
          <ol className="flex items-center gap-2 text-xs font-marathi text-[var(--dp-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--dp-gold)] transition-colors">
                मुख्यपृष्ठ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">सहयोग व सेवा</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="mb-10 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <HeartHandshake size={13} />
            संत वाङ्मय सेवा उपक्रम
          </span>

          <h1 className="vitthalaya-display text-3xl sm:text-4xl md:text-5xl font-bold">
            अभिलेखागार सेवेत सहभागी व्हा
          </h1>

          <p className="text-sm font-marathi text-[var(--dp-muted)] max-w-xl mx-auto leading-relaxed">
            मराठी भक्ती साहित्याचे अखंड डिजिटल संरक्षण — आपला सहभाग या ज्ञानगंगेसाठी अमूल्य आहे.
          </p>
        </header>

        {/* Policy Note Card */}
        <section
          className="mb-10 vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-center shadow-lg"
          aria-labelledby="non-profit-heading"
        >
          <div className="w-10 h-10 mx-auto rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center text-[var(--dp-gold)] mb-3">
            <Sparkles size={18} />
          </div>
          <h2 id="non-profit-heading" className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] mb-2">
            ज्ञानदान व श्रमदान तत्त्व
          </h2>
          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-ink)]/80 leading-relaxed max-w-lg mx-auto">
            डिजिटल पंढरपूर हा एक <strong>मुक्त व गैर-नफा (Non-Profit)</strong> सांस्कृतिक ज्ञानसंग्रह आहे.
            आम्ही आर्थिक देणग्या न स्वीकारता <strong>ज्ञान, वेळ आणि साहित्य सेवा</strong> स्वीकारतो.
          </p>
        </section>

        {/* Ways to Help Grid */}
        <section className="mb-12" aria-labelledby="ways-to-help-heading">
          <h2
            id="ways-to-help-heading"
            className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)] mb-6 text-center"
          >
            सहभागाचे प्रमुख मार्ग
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WAYS_TO_HELP.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center text-[var(--dp-gold)] mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold font-marathi text-[var(--dp-ink)] mb-0.5">
                      {w.title}
                    </h3>
                    <p className="text-[11px] text-[var(--dp-muted)] font-mono mb-2">
                      {w.titleEn}
                    </p>
                    <p className="text-xs font-marathi text-[var(--dp-muted)] leading-relaxed mb-6">
                      {w.desc}
                    </p>
                  </div>

                  <Link
                    href={w.href}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-marathi font-semibold text-[var(--dp-gold)] hover:text-[#0d0906] bg-[var(--dp-ground-elevated)] hover:bg-[var(--dp-gold)] border border-[var(--dp-rule)] rounded-lg py-2.5 px-4 transition-colors min-h-[44px]"
                  >
                    <span>{w.cta}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Transparency Section */}
        <section
          className="mb-12 vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg"
          aria-labelledby="transparency-heading"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h2
                id="transparency-heading"
                className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)]"
              >
                पारदर्शकता व योगदानकर्ते सन्मान
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-[var(--dp-ink)]/80 leading-relaxed font-marathi">
                <p>
                  डिजिटल पंढरपूरचा उद्देश वारकरी संप्रदायाचा अमूल्य ठेवा भावी पिढ्यांपर्यंत विनामूल्य आणि अचूक स्वरूपात पोहोचवणे आहे.
                </p>
                <p>
                  आपण दिलेली प्रत्येक दुरुस्ती, नवीन अभंग किंवा ऑडिओ पडताळणीनंतर अधिकृत संग्रहात जोडली जाते.
                </p>
                <p>
                  सर्व योगदानकर्त्यांचा आदरपूर्वक उल्लेख आमच्या{' '}
                  <Link href="/community" className="text-[var(--dp-gold)] underline hover:text-[var(--dp-gold-celestial)]">
                    समुदाय दालनात
                  </Link>{' '}
                  केला जातो.
                </p>
              </div>
            </div>

            <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--dp-rule)]">
              <Image
                src="/images/realistic/saint-devotional.jpg"
                alt="वारकरी संप्रदाय सेवा"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground-deep)]/70 to-transparent" />
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center py-6 space-y-4">
          <p className="vitthalaya-display text-lg text-[var(--dp-gold)] font-bold">
            ॥ विठ्ठल चरणी ज्ञानांजली अर्पण ॥
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-xs sm:text-sm font-marathi py-3 px-8 rounded-lg hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px]"
          >
            <span>साहित्य संग्रह अन्वेषण करा</span>
            <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  );
}
