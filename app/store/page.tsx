import Link from 'next/link';
import { canonicalMetadata } from '@/src/lib/seo';
import { BookOpen, ShoppingBag, Sparkles, ChevronRight, Package, ArrowRight } from 'lucide-react';
import '@/app/homepage.css';

export const metadata = {
  title: 'ग्रंथ व वाङ्मय भांडार | डिजिटल पंढरपूर',
  description: 'डिजिटल पंढरपूर पवित्र भांडार — मुद्रित ग्रंथ, सार्थ गाथा, हस्तलिखित प्रती व वाचन संच.',
  ...canonicalMetadata({ canonical: '/store' }),
};

const STORE_SECTIONS = [
  {
    href: '/books',
    icon: BookOpen,
    label: 'संत साहित्य ग्रंथ दालन',
    desc: 'अभंग गाथा, आरत्या, स्तोत्रे आणि समग्र वारकरी साहित्याची उच्च दर्जाची छापील पुस्तके पहा.',
    cta: 'पुस्तके पहा',
  },
  {
    href: '/books/generate',
    icon: Sparkles,
    label: 'स्वतःचा ग्रंथ तयार करा',
    desc: 'आपल्या आवडीच्या संतांच्या निवडक रचना निवडून वैयक्तिक किंवा भेट देण्यासाठी सार्थ ग्रंथ संकलित करा.',
    cta: 'ग्रंथ संकलन सुरू करा',
  },
  {
    href: '/cart',
    icon: ShoppingBag,
    label: 'खरेदीची टोपली',
    desc: 'निवडलेली पुस्तके, प्रतींची संख्या तपासा आणि थेट घरपोच डिलिव्हरीसाठी सुरक्षित देयक पूर्ण करा.',
    cta: 'टोपली उघडा',
  },
  {
    href: '/orders',
    icon: Package,
    label: 'माझे ऑर्डर्स व ट्रॅकिंग',
    desc: 'आपण दिलेल्या सर्व ऑर्डर्सची स्थिती, डिजिटल प्रती डाऊनलोड आणि कुरियर ट्रॅकिंग पहा.',
    cta: 'ऑर्डर्स तपासा',
  },
];

export default function StorePage() {
  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-5xl">
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
            <li className="text-[var(--dp-ink)] font-medium">ग्रंथ भांडार</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <BookOpen size={12} />
            वारकरी वाङ्मय प्रकाशन भांडार
          </span>
          <h1 className="vitthalaya-display text-3xl sm:text-4xl md:text-5xl font-bold">
            पवित्र ग्रंथ व प्रकाशन भांडार
          </h1>
          <p className="text-sm font-marathi text-[var(--dp-muted)] max-w-xl mx-auto">
            वारकरी संतांचे प्रासादिक वाङ्मय, मुद्रित ग्रंथ, सुंदर कव्हर्स आणि डिजिटल प्रती भाविकांच्या सेवेसाठी उपलब्ध.
          </p>
        </header>

        {/* Store Sections Grid */}
        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {STORE_SECTIONS.map(({ href, icon: Icon, label, desc, cta }) => (
            <Link
              key={href}
              href={href}
              className="group vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] min-h-[56px]"
            >
              <div>
                <div className="w-12 h-12 mb-4 rounded-xl bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center text-[var(--dp-gold)] group-hover:scale-105 group-hover:bg-[var(--dp-gold)] group-hover:text-[#0d0906] transition-all">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-bold font-marathi text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors mb-2">
                  {label}
                </h2>
                <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)] leading-relaxed mb-6">
                  {desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-marathi font-semibold text-[var(--dp-gold)] group-hover:translate-x-1 transition-transform">
                <span>{cta}</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
