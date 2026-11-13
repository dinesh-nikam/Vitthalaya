import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, MapPin, Award, Shield, ChevronRight, BookOpen, Package, Users } from 'lucide-react';
import '@/app/homepage.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'माझे खाते | डिजिटल पंढरपूर',
  description: 'तुमचे डिजिटल पंढरपूर खाते, प्रोफाइल, पत्ते आणि वाचन संग्रह व्यवस्थापन.',
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const user = session.user as {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
    reputationScore?: number;
  };

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-4xl space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रंब" className="mb-2">
          <ol className="flex items-center gap-2 text-xs font-marathi text-[var(--dp-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--dp-gold)] transition-colors">
                मुख्यपृष्ठ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">माझे खाते</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full mb-3">
            <User size={12} />
            वारकरी साधक खाते
          </span>
          <h1 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
            माझे खाते व्यवस्थापन
          </h1>
          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)]">
            आपली वैयक्तिक माहिती, ग्रंथ वितरण पत्ते आणि संकलित योगदाने नियंत्रित करा.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card Summary */}
          <div className="vitthalaya-card border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] p-6 rounded-2xl shadow-lg space-y-5">
            <div className="w-20 h-20 bg-[var(--dp-ground-elevated)] border border-[var(--dp-gold)] rounded-full flex items-center justify-center text-[var(--dp-gold)] mx-auto shadow-[0_0_15px_rgba(201,162,39,0.25)]">
              <User size={32} />
            </div>

            <div className="text-center space-y-1">
              <h2 className="font-bold font-marathi text-base sm:text-lg text-[var(--dp-ink)]">
                {user.name ?? 'वारकरी साधक'}
              </h2>
              <p className="text-xs font-mono text-[var(--dp-muted)] truncate">{user.email}</p>
            </div>

            <div className="border-t border-[var(--dp-rule)]/50 pt-4 space-y-2.5 text-xs font-marathi">
              <div className="flex justify-between items-center">
                <span className="text-[var(--dp-muted)]">साधक प्रतिष्ठा (Score):</span>
                <span className="font-bold text-[var(--dp-gold)] bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Award size={13} /> {user.reputationScore || 0}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--dp-muted)]">भूमिका (Role):</span>
                <span className="font-bold text-[var(--dp-ink)] bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Shield size={13} className="text-[var(--dp-gold)]" /> {user.role ?? 'USER'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Options */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* View Profile */}
              <Link
                href={`/profile/${user.id}`}
                className="vitthalaya-card flex items-start gap-4 p-5 rounded-2xl border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all shadow-sm group min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center shrink-0 text-[var(--dp-gold)] group-hover:bg-[var(--dp-gold)] group-hover:text-[#0d0906] transition-colors">
                  <User size={18} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold font-marathi text-sm text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                    माझी साधक प्रोफाइल
                  </h3>
                  <p className="text-xs font-marathi text-[var(--dp-muted)]">
                    आपले परिचय पत्र, आवडीचे अभंग व दिलेली भक्ती योगदाने पहा.
                  </p>
                </div>
              </Link>

              {/* Address Management */}
              <Link
                href="/account/addresses"
                className="vitthalaya-card flex items-start gap-4 p-5 rounded-2xl border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all shadow-sm group min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center shrink-0 text-[var(--dp-gold)] group-hover:bg-[var(--dp-gold)] group-hover:text-[#0d0906] transition-colors">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold font-marathi text-sm text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                    वितरण पत्ते (Addresses)
                  </h3>
                  <p className="text-xs font-marathi text-[var(--dp-muted)]">
                    मुद्रित पुस्तके घरपोच मागवण्यासाठी डिलिव्हरी पत्ते जतन करा.
                  </p>
                </div>
              </Link>
            </div>

            {/* Quick Links Section */}
            <div className="vitthalaya-card border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-bold font-marathi text-sm text-[var(--dp-gold)] border-b border-[var(--dp-rule)]/50 pb-2">
                द्रुत सेवा व दालने
              </h3>
              <div className="flex flex-wrap gap-2.5 text-xs font-marathi">
                <Link
                  href="/reading-lists"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-gold)] transition-colors min-h-[44px]"
                >
                  <BookOpen size={14} />
                  <span>वाचन सूची (Reading Lists)</span>
                </Link>
                <Link
                  href="/orders"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-gold)] transition-colors min-h-[44px]"
                >
                  <Package size={14} />
                  <span>माझे ऑर्डर्स (Orders)</span>
                </Link>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-gold)] transition-colors min-h-[44px]"
                >
                  <Users size={14} />
                  <span>समुदाय मंच (Community)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
