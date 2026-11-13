'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Plus,
  Trash2,
  Home,
  Briefcase,
  Landmark,
  ShieldAlert,
  ArrowLeft,
  Check,
  ChevronRight,
  Save,
} from 'lucide-react';
import '@/app/homepage.css';

interface Address {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  label: string | null;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setStateName] = useState('Maharashtra');
  const [postalCode, setPostalCode] = useState('');
  const [label, setLabel] = useState('Home');
  const [isDefault, setIsDefault] = useState(false);

  const fetchAddresses = () => {
    setLoading(true);
    fetch('/api/addresses')
      .then((r) => {
        if (!r.ok) throw new Error('पत्ते लोड करण्यात अडचण आली.');
        return r.json();
      })
      .then((data) => setAddresses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    if (!fullName || !phone || !line1 || !city || !state || !postalCode) {
      setError('कृपया सर्व आवश्यक माहिती भरा.');
      setSubmitLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          line1,
          line2: line2 || undefined,
          city,
          state,
          postalCode,
          label,
          isDefault,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'पत्ता जतन करताना त्रुटी आली.');

      // Reset form and reload
      setFullName('');
      setPhone('');
      setLine1('');
      setLine2('');
      setCity('');
      setStateName('Maharashtra');
      setPostalCode('');
      setLabel('Home');
      setIsDefault(false);
      setShowAddForm(false);
      fetchAddresses();
    } catch (err: any) {
      setError(err.message || 'पत्ता जोडण्यात अडचण आली.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('तुम्हाला नक्की हा पत्ता हटवायचा आहे का?')) return;
    setError(null);

    try {
      const res = await fetch(`/api/addresses?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'पत्ता हटवताना त्रुटी आली.');

      fetchAddresses();
    } catch (err: any) {
      setError(err.message || 'पत्ता हटवण्यात अडचण आली.');
    }
  };

  const getLabelIcon = (lbl: string | null) => {
    switch (lbl?.toLowerCase()) {
      case 'home':
        return <Home className="w-3.5 h-3.5 text-[var(--dp-gold)]" />;
      case 'office':
        return <Briefcase className="w-3.5 h-3.5 text-[var(--dp-gold)]" />;
      case 'temple':
        return <Landmark className="w-3.5 h-3.5 text-[var(--dp-gold)]" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-[var(--dp-gold)]" />;
    }
  };

  const inputClass =
    'w-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-marathi text-[var(--dp-ink)] placeholder-[var(--dp-muted)] focus:border-[var(--dp-gold)] focus:ring-2 focus:ring-[var(--dp-gold)]/20 outline-none transition-colors min-h-[44px]';

  return (
    <div className="vitthalaya-shell min-h-screen py-10 px-4 sm:px-6">
      <div className="vitthalaya-container max-w-3xl space-y-6">
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
            <li>
              <Link href="/account" className="hover:text-[var(--dp-gold)] transition-colors">
                माझे खाते
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">पत्ते व्यवस्थापन</li>
          </ol>
        </nav>

        {/* Action Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-xs font-marathi text-[var(--dp-muted)] hover:text-[var(--dp-gold)] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" /> खात्यावर परत जा
          </Link>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setError(null);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] rounded-xl text-xs sm:text-sm font-semibold font-marathi hover:bg-[var(--dp-gold-celestial)] transition-all shadow-md active:scale-95 min-h-[44px]"
          >
            {showAddForm ? (
              'रद्द करा'
            ) : (
              <>
                <Plus className="w-4 h-4" /> नवीन पत्ता जोडा
              </>
            )}
          </button>
        </div>

        <header className="mb-4">
          <h1 className="vitthalaya-display text-2xl sm:text-3xl font-bold mb-1">
            माझे वितरण पत्ते
          </h1>
          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)]">
            पुस्तके आणि ग्रंथ मागवण्यासाठी तुमचे डिलिव्हरी पत्ते सुरक्षित व्यवस्थापित करा.
          </p>
        </header>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300 text-xs font-marathi">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Add Address Form Card */}
        {showAddForm && (
          <form
            onSubmit={handleAddAddress}
            className="vitthalaya-card border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] p-6 sm:p-8 rounded-2xl shadow-xl space-y-4"
          >
            <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)] border-b border-[var(--dp-rule)]/50 pb-2">
              नवीन पत्ता माहिती
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1">
                  पूर्ण नाव (अत्यावश्यक) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. ज्ञानेश्वर पाटील"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1">
                  मोबाईल नंबर (अत्यावश्यक) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="उदा. ९८७६५४३२१०"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1">
                  पत्ता प्रकार (लेबल)
                </label>
                <select
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className={inputClass}
                >
                  <option value="Home">घर (Home)</option>
                  <option value="Office">कार्यालय (Office)</option>
                  <option value="Temple">मंदिर/मठ (Temple)</option>
                  <option value="Other">इतर (Other)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1">
                  पत्ता ओळ १ (अत्यावश्यक) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. ब्लॉक ३०२, विठ्ठल निवास"
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-muted)] font-marathi mb-1">
                  पत्ता ओळ २ (पर्यायी)
                </label>
                <input
                  type="text"
                  placeholder="उदा. देऊळ गल्ली, पंढरपूर"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1">
                  शहर (City) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. सोलापूर"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1">
                  पिन कोड (Postal Code) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. ४१३३०४"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1">
                  राज्य (State) *
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setStateName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-4 h-4 text-[var(--dp-gold)] border-[var(--dp-rule)] rounded bg-[var(--dp-ground-elevated)] focus:ring-[var(--dp-gold)]"
                />
                <label
                  htmlFor="isDefault"
                  className="text-xs font-semibold text-[var(--dp-muted)] font-marathi cursor-pointer"
                >
                  याला मुख्य पत्ता बनवा
                </label>
              </div>
            </div>

            <div className="border-t border-[var(--dp-rule)]/50 pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 border border-[var(--dp-rule)] text-[var(--dp-muted)] rounded-xl text-xs font-marathi hover:text-[var(--dp-ink)] min-h-[44px]"
              >
                रद्द करा
              </button>
              <button
                type="submit"
                disabled={submitLoading}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] rounded-xl text-xs sm:text-sm font-semibold font-marathi hover:bg-[var(--dp-gold-celestial)] transition-all shadow-md active:scale-95 disabled:opacity-50 min-h-[44px]"
              >
                <Save size={14} />
                <span>{submitLoading ? 'जतन होत आहे...' : 'पत्ता जतन करा'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Address List */}
        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-3 border-[var(--dp-gold)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : addresses.length === 0 ? (
          <div className="vitthalaya-card border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] p-12 text-center rounded-2xl shadow-sm space-y-3">
            <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)]">
              अजून कोणताही डिलिव्हरी पत्ता जतन केलेला नाही.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[var(--dp-ground-elevated)] text-[var(--dp-gold)] border border-[var(--dp-rule)] rounded-xl text-xs font-marathi hover:bg-[var(--dp-gold)] hover:text-[#0d0906] transition-all min-h-[44px]"
            >
              <Plus className="w-4 h-4" /> नवीन पत्ता जोडा
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="vitthalaya-card border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] p-5 rounded-2xl shadow-sm hover:border-[var(--dp-gold)] transition-all flex justify-between items-start gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-[var(--dp-ink)] font-marathi">
                      {addr.fullName}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--dp-ground-elevated)] text-[var(--dp-gold)] uppercase border border-[var(--dp-rule)] font-marathi">
                      {getLabelIcon(addr.label)}
                      {addr.label === 'Home'
                        ? 'घर'
                        : addr.label === 'Office'
                        ? 'कार्यालय'
                        : addr.label === 'Temple'
                        ? 'मंदिर'
                        : addr.label || 'इतर'}
                    </span>
                    {addr.isDefault && (
                      <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 font-marathi">
                        <Check className="w-3 h-3" /> मुख्य पत्ता
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--dp-muted)] font-marathi space-y-0.5 leading-relaxed">
                    <p>{addr.line1}</p>
                    {addr.line2 && <p>{addr.line2}</p>}
                    <p>
                      {addr.city}, {addr.state} —{' '}
                      <span className="font-mono font-medium text-[var(--dp-ink)]">
                        {addr.postalCode}
                      </span>
                    </p>
                    <p className="text-xs text-[var(--dp-muted)] pt-1">संपर्क: {addr.phone}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteAddress(addr.id)}
                  className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                  aria-label="पत्ता हटवा"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
