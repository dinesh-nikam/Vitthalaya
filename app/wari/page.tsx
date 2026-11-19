import Link from 'next/link';
import { Footprints, Info, BookOpen, ExternalLink, MapPin, Compass, ChevronRight, Home, Landmark, Music, PhoneCall, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/src/db/client';
import { WariAnimatedShowcase } from '@/components/cinematic/wari-animated-showcase';
import { PrintRouteButton } from '@/components/print-route-button';
import '@/app/homepage.css';

export const metadata = {
  title: 'आषाढी वारी : पवित्र पायी प्रवास | डिजिटल पंढरपूर',
  description: 'आषाढी वारीतील मार्ग, पालख्या, मुख्य थांबे आणि पंढरपूरचे दर्शन : डिजिटल पंढरपूरवर.',
};

const EMERGENCY_CONTACTS = [
  {
    service: 'रुग्णवाहिका व वैद्यकीय मदत',
    serviceEn: 'Ambulance & Medical Emergency',
    number: '108',
    href: 'tel:108',
    desc: '२४ तास मोफत तत्काळ वैद्यकीय सेवा, फिरते रुग्णालय व प्रथमोपचार केंद्र',
    badge: 'तातडीची मदत',
  },
  {
    service: 'पोलीस नियंत्रण कक्ष',
    serviceEn: 'Police Emergency Control',
    number: '112',
    href: 'tel:112',
    desc: 'वारी मार्गावरील कायदा व सुव्यवस्था, हरवलेल्या व्यक्ती व मदत कक्ष',
    badge: 'सुरक्षा सेवा',
  },
  {
    service: 'मंदिर समिती नियंत्रण कक्ष',
    serviceEn: 'Mandir Samiti Control Room',
    number: '02186-223244',
    href: 'tel:02186223244',
    desc: 'श्री विठ्ठल-रुक्मिणी मंदिर, पंढरपूर अधिकृत माहिती व दर्शन साहाय्य कक्ष',
    badge: 'देवस्थान कक्ष',
  },
  {
    service: 'उपजिल्हा रुग्णालय, पंढरपूर',
    serviceEn: 'Pandharpur Civil Hospital',
    number: '02186-223253',
    href: 'tel:02186223253',
    desc: 'पंढरपूर मुख्य सरकारी रुग्णालय, अपघात विभाग व अतिदक्षता सेवा',
    badge: 'आरोग्य केंद्र',
  },
  {
    service: 'वारकरी माहिती व साहाय्यता',
    serviceEn: 'Varkari Pilgrim Helpline',
    number: '1800-233-1080',
    href: 'tel:18002331080',
    desc: 'पालखी सोहळा मुक्काम, विसावा, पाणी व दर्शन रांगेची अधिकृत माहिती',
    badge: 'टोल-फ्री',
  },
  {
    service: 'ज्येष्ठ नागरिक व महिला साहाय्यता',
    serviceEn: 'Senior Citizen & Women Helpline',
    number: '1091',
    href: 'tel:1091',
    desc: 'ज्येष्ठ वारकरी व महिलांसाठी विशेष साहाय्य, विश्रांती व सुरक्षा कक्ष',
    badge: 'विशेष कक्ष',
  },
];

export default async function WariPage() {
  const stops = (await db.wariStop.findMany({
    orderBy: { sortOrder: 'asc' },
  }).catch(() => [])) || [];

  const totalKm = stops.length > 0 ? Math.max(...stops.map((s) => s.distanceKm)) : 0;

  return (
    <div className="vitthalaya-shell min-h-screen pb-20">
      {/* Print-Only Header: High-contrast ink-saving A4 sheet header */}
      <div className="hidden print:block p-4 mb-4 border-b-2 border-black">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold font-serif text-black leading-tight">
              ॥ श्री विठ्ठल प्रसन्न ॥ आषाढी वारी पालखी सोहळा — अधिकृत मार्गदर्शक व मुक्काम तक्ता
            </h1>
            <p className="text-xs text-gray-700 font-marathi mt-1">
              संत ज्ञानेश्वर महाराज व जगद्गुरू तुकाराम महाराज पालखी पायी प्रवास · एकूण अंतर: {totalKm} किमी
            </p>
          </div>
          <div className="text-right text-[10px] text-gray-800 shrink-0 ml-4">
            <p className="font-bold">डिजिटल पंढरपूर (varkari.org)</p>
            <p>वारकरी सेवेसाठी मोफत पत्रक</p>
          </div>
        </div>
      </div>

      {/* Cinematic Wari Hero — full-bleed procession backdrop */}
      <section
        className="relative overflow-hidden border-b border-[var(--dp-rule)] print:hidden"
        style={{
          paddingTop: 'var(--dp-hero-padding-top)',
          paddingBottom: 'var(--dp-act-padding)',
          background: `
            linear-gradient(to bottom, rgba(6,5,3,0.88) 0%, rgba(6,5,3,0.4) 60%, rgba(10,8,6,1) 100%),
            url('/images/realistic/wari-procession.jpg') center/cover no-repeat
          `,
        }}
        aria-labelledby="wari-title"
      >
        {/* Radial gold halo behind title */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(246,188,85,0.09) 0%, transparent 70%)',
          }}
        />

        <div className="vitthalaya-container max-w-4xl text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex justify-center mb-6 text-xs font-marathi text-[var(--dp-muted)]" aria-label="ब्रेडक्रंब">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[var(--dp-gold-celestial)] transition-colors">
                  मुख्यपृष्ठ
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li className="text-[var(--dp-ink)]">आषाढी वारी</li>
            </ol>
          </nav>

          <p className="text-xs text-[var(--dp-gold-celestial)] font-marathi mb-3 font-medium">
            ज्ञानोबा तुकाराम · पालखी सोहळा
          </p>

          <h1 id="wari-title" className="dp-chapter-title text-[var(--dp-ink)] mb-6 max-w-3xl mx-auto">
            वारी : पवित्र पायी प्रवास
          </h1>

          <p className="vitthalaya-prose text-sm sm:text-base text-[var(--dp-ink-dim)] max-w-2xl mx-auto leading-relaxed mb-10">
            दरवर्षी आषाढ महिन्यात कोट्यवधी वारकरी विठू माऊलींच्या गजरात आळंदी आणि देहू येथून पंढरपूरकडे पायी कूच करतात.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--dp-ground)]/80 border border-[var(--dp-gold)]/30 text-xs text-[var(--dp-gold-celestial)] font-marathi backdrop-blur-sm">
              {/* Animated ringan dot */}
              <span className="dp-ringan-dot" aria-hidden="true" />
              <Compass size={14} aria-hidden="true" />
              <span>एकूण अंतर: <strong className="text-[var(--dp-ink)]">{totalKm} किलोमीटर</strong> · देहू/आळंदी ते पंढरपूर</span>
            </div>
            <PrintRouteButton />
          </div>
        </div>
      </section>

      {/* Sजीव वारी पदभ्रमण दर्शन (Animated Photographic Chapter Showcase) */}
      <section className="vitthalaya-container max-w-5xl pt-10 print:hidden">
        <WariAnimatedShowcase />
      </section>

      {/* वारकरी सुरक्षा व आपत्कालीन मदत केंद्र (Emergency & Pilgrim Safety Directory) */}
      <section className="vitthalaya-container max-w-5xl pt-10 print:pt-2 print:my-2" aria-labelledby="emergency-directory-heading">
        <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-gold)]/40 bg-[var(--dp-ground-well)] shadow-lg print:border-black print:p-3 print:rounded-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--dp-rule)] print:mb-2 print:pb-1 print:border-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--dp-gold)]/10 border border-[var(--dp-gold)]/30 flex items-center justify-center text-[var(--dp-gold)] print:hidden">
                <ShieldAlert className="w-5 h-5 text-[var(--dp-gold)]" aria-hidden="true" />
              </div>
              <div>
                <h2 id="emergency-directory-heading" className="vitthalaya-display text-xl sm:text-2xl font-bold text-[var(--dp-ink)] print:text-sm print:text-black">
                  वारकरी सुरक्षा व आपत्कालीन मदत कक्ष (२४×७ अधिकृत हेल्पलाइन)
                </h2>
                <p className="text-xs font-marathi text-[var(--dp-muted)] print:text-[10px] print:text-gray-600">
                  वारी मार्गावरील २४×७ अधिकृत साहाय्यता, वैद्यकीय मदत आणि पोलीस हेल्पलाइन (ऑफलाइन उपयुक्त)
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-marathi font-medium shrink-0 self-start sm:self-auto print:hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              २४×७ सेवारत
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
            {EMERGENCY_CONTACTS.map((item) => (
              <a
                key={item.number}
                href={item.href}
                className="group p-4 rounded-xl bg-[var(--dp-ground)] border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] print:p-1.5 print:border-gray-400 print:rounded-none"
                aria-label={`${item.service}: ${item.number} वर कॉल करा`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 print:mb-0.5">
                    <span className="text-[11px] font-marathi px-2 py-0.5 rounded bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] print:px-1 print:py-0 print:border-none print:text-black print:text-[9px] print:font-bold">
                      {item.badge}
                    </span>
                    <PhoneCall className="w-4 h-4 text-[var(--dp-muted)] group-hover:text-[var(--dp-gold)] transition-colors print:hidden" />
                  </div>
                  <h3 className="text-sm font-bold font-marathi text-[var(--dp-ink)] mb-1 print:text-[11px] print:text-black print:mb-0">
                    {item.service}
                  </h3>
                  <p className="text-[11px] font-marathi text-[var(--dp-muted)] leading-relaxed mb-4 print:hidden">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--dp-rule)] flex items-baseline justify-between print:pt-0.5 print:border-none">
                  <span className="text-lg font-bold font-mono text-[var(--dp-gold)] group-hover:underline print:text-xs print:text-black">
                    {item.number}
                  </span>
                  <span className="text-[11px] font-marathi text-[var(--dp-ink-dim)] group-hover:text-[var(--dp-ink)] print:hidden">
                    कॉल करा →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Route Guide */}
      <section className="vitthalaya-container max-w-5xl pt-12 pb-16 print:pt-4 print:pb-4">
        <div className="flex items-center gap-2 mb-8 pb-3 border-b border-[var(--dp-rule)] print:hidden">
          <Footprints className="w-5 h-5 text-[var(--dp-gold)]" aria-hidden="true" />
          <h2 className="vitthalaya-display text-2xl font-bold">
            प्रवासाचा मार्गदर्शक व थांबे
          </h2>
        </div>

        {/* Print-Only Compact Route Stops Table (Single-Page A4 Grid) */}
        {stops.length > 0 && (
          <div className="hidden print:block my-4">
            <h2 className="text-sm font-bold font-serif border-b border-black pb-1 mb-2 text-black">
              पालखी मुक्काम व विसावा थांबे तक्ता
            </h2>
            <table className="w-full text-left text-xs border border-gray-400">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-400">
                  <th className="p-1 border-r border-gray-400 text-center w-12 text-black">क्र.</th>
                  <th className="p-1 border-r border-gray-400 w-48 text-black">मुक्काम / थांबा</th>
                  <th className="p-1 border-r border-gray-400 text-center w-24 text-black">अंतर (किमी)</th>
                  <th className="p-1 text-black">वैशिष्ट्य व स्थान तपशील</th>
                </tr>
              </thead>
              <tbody>
                {stops.map((stop, idx) => (
                  <tr key={stop.id} className="border-b border-gray-300">
                    <td className="p-1 border-r border-gray-300 text-center font-mono font-medium text-black">{idx + 1}</td>
                    <td className="p-1 border-r border-gray-300 font-semibold font-marathi text-black">{stop.nameMarathi}</td>
                    <td className="p-1 border-r border-gray-300 text-center font-mono text-black">{stop.distanceKm} किमी</td>
                    <td className="p-1 font-marathi text-[11px] text-black">{stop.description || 'पालखी मुक्काम / विसावा'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 pt-2 border-t border-gray-400 flex justify-between text-[10px] text-gray-700">
              <span>॥ जय जय राम कृष्ण हरी ॥</span>
              <span>डिजिटल पंढरपूर (varkari.org) · वारकरी सेवेसाठी मोफत पत्रक</span>
            </div>
          </div>
        )}

        {stops.length === 0 ? (
          <div className="vitthalaya-card rounded p-10 text-center">
            <p className="text-sm font-marathi text-[var(--dp-muted)]">
              वारी मार्गाचे थांबे अद्याप उपलब्ध नाहीत : संग्रहालय तयार होत आहे.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start print:hidden">
            {/* Timeline Route Stops */}
            <div className="md:col-span-7 space-y-6">
              <div className="relative">
                <div className="absolute left-5 top-3 bottom-3 w-px bg-[var(--dp-rule-strong)]" aria-hidden="true" />

                <div className="space-y-6 text-left">
                  {stops.map((stop, idx) => (
                    <div key={stop.id} className="relative flex items-start gap-4">
                      {/* Milestone Icon */}
                      <div className="relative z-10 w-10 h-10 rounded bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] flex items-center justify-center text-[var(--dp-gold)] shrink-0">
                        {idx === 0 ? (
                          <Home size={16} aria-hidden="true" />
                        ) : idx === stops.length - 1 ? (
                          <Landmark size={16} aria-hidden="true" />
                        ) : (
                          <MapPin size={16} aria-hidden="true" />
                        )}
                      </div>

                      <div className="flex-1 pt-1.5 vitthalaya-card rounded p-4">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="vitthalaya-display text-base font-bold text-[var(--dp-ink)]">
                            {stop.nameMarathi}
                          </h3>
                          <span className="text-xs font-marathi text-[var(--dp-gold)] px-2 py-0.5 rounded bg-[var(--dp-ground-well)] border border-[var(--dp-rule)]">
                            {stop.distanceKm} किमी
                          </span>
                        </div>
                        {stop.description && (
                          <p className="text-xs text-[var(--dp-ink-dim)] font-marathi leading-relaxed mt-1">
                            {stop.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Destination View: Chandrabhaga River */}
            <div className="md:col-span-5 md:sticky md:top-24 space-y-6">
              <div className="vitthalaya-card rounded overflow-hidden">
                <div className="relative aspect-[4/3] bg-[var(--dp-ground-well)]">
                  <Image
                    src="/images/realistic/chandrabhaga-river.jpg"
                    alt="पवित्र चंद्रभागा नदी"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[var(--dp-gold)] font-marathi mb-1">
                    अंतिम ध्येय : पवित्र स्नान
                  </p>
                  <h3 className="vitthalaya-display text-xl font-bold mb-2">
                    चंद्रभागा नदी
                  </h3>
                  <p className="text-xs text-[var(--dp-ink-dim)] leading-relaxed font-marathi">
                    चंद्रभागेच्या वाळवंटी, विठू नामाची गर्जना: प्रवासाचा शेवट पवित्र चंद्रभागेच्या स्नानाने आणि श्री विठ्ठलाच्या दर्शनाने होतो.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Explore Further Links */}
      <section className="border-t border-[var(--dp-rule)] pt-12 print:hidden">
        <div className="vitthalaya-container max-w-4xl">
          <h2 className="vitthalaya-display text-xl font-bold text-center mb-8">
            अधिक संदर्भ व साहित्य
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/search?q=वारी"
              className="vitthalaya-card rounded p-4 flex items-center gap-3 group hover:border-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              <BookOpen className="w-5 h-5 text-[var(--dp-gold)] shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold font-marathi text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                वारीवरील साहित्य
              </span>
            </Link>

            <Link
              href="/nityanem"
              className="vitthalaya-card rounded p-4 flex items-center gap-3 group hover:border-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              <Music className="w-5 h-5 text-[var(--dp-gold)] shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold font-marathi text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                मुक्काम सेवा व ठेका
              </span>
            </Link>

            <Link
              href="/learn"
              className="vitthalaya-card rounded p-4 flex items-center gap-3 group hover:border-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              <Info className="w-5 h-5 text-[var(--dp-gold)] shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold font-marathi text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                ऐतिहासिक संदर्भ
              </span>
            </Link>

            <Link
              href="/sant"
              className="vitthalaya-card rounded p-4 flex items-center gap-3 group hover:border-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              <ExternalLink className="w-5 h-5 text-[var(--dp-gold)] shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold font-marathi text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                संतांची माहिती
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
