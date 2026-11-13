'use client';

/**
 * Book Generation Wizard — multi-step form for curating and generating
 * a custom devotional book.
 *
 * Steps:
 *   1. Book Details (title, type, format)
 *   2. Curation Criteria (saints, deities, themes, composition types)
 *   3. Cover Design (palette, title, elements)
 *   4. Review & Generate (summary + trigger generation)
 */

import { useState, useCallback, type FormEvent } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import type {
  BookType,
  CurationType,
  CompositionType,
  CoverPalette,
  CurationCriteria,
} from '../../../src/book-generation/types';
import '@/app/homepage.css';

type Step = 0 | 1 | 2 | 3;

interface WizardState {
  titleMarathi: string;
  titleEnglish: string;
  bookType: BookType;
  curationType: CurationType;
  saintIds: string[];
  deityIds: string[];
  compositionTypes: CompositionType[];
  palette: CoverPalette;
  foilEffect: boolean;
  isPublic: boolean;
  generating: boolean;
  result: string | null;
  error: string | null;
}

const INITIAL_STATE: WizardState = {
  titleMarathi: '',
  titleEnglish: '',
  bookType: 'STANDARD',
  curationType: 'SAINT_BASED',
  saintIds: [],
  deityIds: [],
  compositionTypes: [],
  palette: 'bhagwa',
  foilEffect: false,
  isPublic: false,
  generating: false,
  result: null,
  error: null,
};

const BOOK_TYPES: { value: BookType; label: string; desc: string }[] = [
  { value: 'POCKET', label: 'पॉकेट आवृत्ती', desc: '5.5×8.5, साधे सुटसुटीत बाइंडिंग' },
  { value: 'STANDARD', label: 'मानक आवृत्ती', desc: '6×9, क्लासिक पेपरबॅक' },
  { value: 'PREMIUM_HARDCOVER', label: 'प्रीमियम हार्डकव्हर', desc: '7×10, कडक सुवर्ण बाइंडिंग' },
  { value: 'COLLECTOR', label: 'कलेक्टर विशेष', desc: '7×10, पारंपरिक सेरिफ फॉन्ट' },
  { value: 'TEMPLE', label: 'मंदिर आवृत्ती', desc: '8.5×11, मोठ्या आकाराचे टाईप' },
];

const POPULAR_SAINTS = [
  { id: 'c550a9ee-2664-4d92-a0d2-df47fc7b5ae8', name: 'ज्ञानेश्वर महाराज' },
  { id: '0f2c6cb5-eec7-4ee4-97c4-695a7a1c5661', name: 'तुकाराम महाराज' },
  { id: '795a09ef-ed15-4630-8ea2-d1233926653d', name: 'नामदेव महाराज' },
  { id: '32c24505-14af-4d95-baad-54aab4914a6d', name: 'एकनाथ महाराज' },
  { id: '9df4dfef-af5d-4335-8d15-4812cb004926', name: 'संत जनाबाई' },
  { id: '36459d0f-e5c9-48cb-bdd4-e09c0a56db84', name: 'संत मुक्ताबाई' },
  { id: '3c47c50f-d801-4a3d-9e9b-cc4a3e508877', name: 'संत चोखामेळा' },
  { id: 'ab82903e-828d-4980-826c-6a3934a1934e', name: 'संत सावता माळी' },
  { id: '6761a546-b163-4552-a4cc-316480551564', name: 'संत गोरा कुंभार' },
  { id: 'd9166e0a-041b-4ba1-ae5e-6b8a14f92e69', name: 'संत कान्होपात्रा' },
];

const COMPOSITION_TYPES: { value: CompositionType; label: string }[] = [
  { value: 'abhang', label: 'अभंग' },
  { value: 'aarti', label: 'आरती' },
  { value: 'bhajan', label: 'भजन' },
  { value: 'stotra', label: 'स्तोत्र' },
  { value: 'haripath', label: 'हरिपाठ' },
  { value: 'gaulani', label: 'गवळण' },
  { value: 'namasmaran', label: 'नामस्मरण' },
  { value: 'bharud', label: 'भारुड' },
  { value: 'kirtan', label: 'कीर्तन' },
];

const PALETTES: { value: CoverPalette; label: string; color: string }[] = [
  { value: 'bhagwa', label: 'भगवा', color: '#FF7A1A' },
  { value: 'maroon', label: 'तांबडा', color: '#6B1E1E' },
  { value: 'gold', label: 'सुवर्ण', color: '#C9A227' },
  { value: 'cream', label: 'क्रीम', color: '#FFF8EC' },
  { value: 'emerald', label: 'पाचू', color: '#1B5E20' },
  { value: 'indigo', label: 'नील', color: '#1A237E' },
];

const STEP_LABELS = ['पुस्तक माहिती', 'निवड निकष', 'मुखपृष्ठ', 'तयार करा'] as const;

export default function BookGeneratePage() {
  const { data: session } = useSession();
  const creatorId = session?.user ? (session.user as { id?: string }).id : undefined;

  const [step, setStep] = useState<Step>(0);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);

  const update = useCallback(
    (patch: Partial<WizardState>) => setState((s) => ({ ...s, ...patch })),
    [],
  );

  const canProceed = (s: Step): boolean => {
    switch (s) {
      case 0:
        return state.titleMarathi.trim().length > 0;
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
    }
  };

  const toggleSaint = (id: string) => {
    setState((s) => ({
      ...s,
      saintIds: s.saintIds.includes(id)
        ? s.saintIds.filter((x) => x !== id)
        : [...s.saintIds, id],
    }));
  };

  const toggleCompositionType = (t: CompositionType) => {
    setState((s) => ({
      ...s,
      compositionTypes: s.compositionTypes.includes(t)
        ? s.compositionTypes.filter((x) => x !== t)
        : [...s.compositionTypes, t],
    }));
  };

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    update({ generating: true, error: null, result: null });

    try {
      const criteria: CurationCriteria = {
        saintIds: state.saintIds.length > 0 ? state.saintIds : undefined,
        compositionTypes: state.compositionTypes.length > 0 ? state.compositionTypes : undefined,
        maxCount: 150,
      };

      const res = await fetch('/api/books/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleMarathi: state.titleMarathi,
          titleEnglish: state.titleEnglish || undefined,
          bookType: state.bookType,
          curationType: state.curationType,
          curationCriteria: criteria,
          coverDesign: {
            palette: state.palette,
            foilEffect: state.foilEffect,
          },
          creatorId,
          isPublic: state.isPublic,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Generation failed');
      }

      const data = await res.json();
      update({ result: data.slug, generating: false });
    } catch (err) {
      update({
        error: err instanceof Error ? err.message : 'Unknown error occurred during generation',
        generating: false,
      });
    }
  };

  const reset = () => {
    setState(INITIAL_STATE);
    setStep(0);
  };

  return (
    <main className="vitthalaya-shell min-h-screen py-10">
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
            <li>
              <Link href="/books" className="hover:text-[var(--dp-gold)] transition-colors">
                भक्ती ग्रंथ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">पुस्तक निर्मिती दालन</li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="text-center mb-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full mb-3">
            <Sparkles size={11} />
            डिजिटल ग्रंथ संकलन व संपादन
          </span>
          <h1 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            संत वाङ्मय ग्रंथ निर्मिती
          </h1>
          <p className="text-sm font-marathi text-[var(--dp-muted)] max-w-lg mx-auto">
            वारकरी संतांचे अभंग, भजने व आरत्या एकत्रित करून आपला स्वतःचा सार्थ भक्तिग्रंथ तयार करा.
          </p>
        </header>

        {/* Progress Bar */}
        <div
          className="flex gap-2 sm:gap-3 mb-8"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={4}
          aria-label="पुस्तक निर्मिती टप्पे"
        >
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex-1">
              <div
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  i <= step ? 'bg-[var(--dp-gold)] shadow-[0_0_10px_rgba(201,162,39,0.35)]' : 'bg-[var(--dp-rule)]'
                }`}
              />
              <p
                className={`text-xs text-center mt-2 font-marathi transition-colors ${
                  i <= step ? 'text-[var(--dp-gold)] font-medium' : 'text-[var(--dp-muted)]'
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {state.result ? (
          /* Success Screen */
          <div className="vitthalaya-card rounded-2xl p-8 sm:p-12 text-center border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-gold)] flex items-center justify-center text-[var(--dp-gold)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="vitthalaya-display text-2xl font-bold text-[var(--dp-gold)]">
              ग्रंथ यशस्वीरित्या तयार झाला!
            </h2>
            <p className="text-sm font-marathi text-[var(--dp-ink)] max-w-md mx-auto leading-relaxed">
              आपले संकलन सुरक्षित संग्रहित केले असून ३D पूर्वावलोकन व छपाईसाठी तयार आहे.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Link
                href={`/books/${state.result}`}
                className="px-6 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] rounded-lg hover:bg-[var(--dp-gold-celestial)] font-semibold text-sm font-marathi transition-colors inline-flex items-center gap-1.5 min-h-[44px]"
              >
                <span>तयार ग्रंथ पहा</span>
                <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                onClick={reset}
                className="px-6 py-2.5 border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] rounded-lg text-sm font-marathi transition-colors min-h-[44px]"
              >
                नवीन ग्रंथ तयार करा
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Step 0: Book Details */}
            {step === 0 && (
              <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-6">
                <div className="border-b border-[var(--dp-rule)] pb-3">
                  <h2 className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)]">
                    ग्रंथाची मूळ माहिती
                  </h2>
                  <p className="text-xs text-[var(--dp-muted)] font-marathi mt-0.5">
                    ग्रंथाचे नाव व इच्छित आकार निवडा
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1.5">
                    ग्रंथ शीर्षक (मराठीत) *
                  </label>
                  <input
                    type="text"
                    value={state.titleMarathi}
                    onChange={(e) => update({ titleMarathi: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] placeholder-[var(--dp-muted)] focus:border-[var(--dp-gold)] focus:ring-2 focus:ring-[var(--dp-gold)]/25 outline-none font-marathi text-sm min-h-[44px]"
                    placeholder="उदा. संत तुकाराम महाराज निवडक अभंग गाथा"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-muted)] font-marathi mb-1.5">
                    शीर्षक (इंग्रजीत — पर्यायी)
                  </label>
                  <input
                    type="text"
                    value={state.titleEnglish}
                    onChange={(e) => update({ titleEnglish: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] placeholder-[var(--dp-muted)] focus:border-[var(--dp-gold)] focus:ring-2 focus:ring-[var(--dp-gold)]/25 outline-none text-sm min-h-[44px]"
                    placeholder="e.g. Selected Abhangas of Sant Tukaram"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-2">
                    पुस्तकाचा प्रकार व आकार
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BOOK_TYPES.map((bt) => (
                      <button
                        key={bt.value}
                        type="button"
                        onClick={() => update({ bookType: bt.value })}
                        className={`p-3.5 rounded-xl border text-left transition-all min-h-[56px] ${
                          state.bookType === bt.value
                            ? 'border-[var(--dp-gold)] bg-[var(--dp-ground-elevated)] ring-1 ring-[var(--dp-gold)]'
                            : 'border-[var(--dp-rule)] bg-[var(--dp-ground-well)]/70 hover:border-[var(--dp-rule-strong)]'
                        }`}
                      >
                        <p className="font-bold text-sm font-marathi text-[var(--dp-ink)]">
                          {bt.label}
                        </p>
                        <p className="text-xs text-[var(--dp-muted)] font-marathi mt-0.5">
                          {bt.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Curation Criteria */}
            {step === 1 && (
              <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-6">
                <div className="border-b border-[var(--dp-rule)] pb-3">
                  <h2 className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)]">
                    साहित्य निवड निकष
                  </h2>
                  <p className="text-xs text-[var(--dp-muted)] font-marathi mt-0.5">
                    कोणते काव्यप्रकार व संतांच्या रचना समाविष्ट करायच्या आहेत ते निवडा
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-2.5">
                    रचना प्रकार (कमीत कमी १ किंवा सर्व)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COMPOSITION_TYPES.map((ct) => (
                      <button
                        key={ct.value}
                        type="button"
                        onClick={() => toggleCompositionType(ct.value)}
                        className={`px-3.5 py-2 rounded-full text-xs font-marathi border transition-all min-h-[44px] inline-flex items-center ${
                          state.compositionTypes.includes(ct.value)
                            ? 'bg-[var(--dp-gold)] text-[#0d0906] font-semibold border-[var(--dp-gold)] shadow-xs'
                            : 'bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] border-[var(--dp-rule)] hover:border-[var(--dp-gold)]'
                        }`}
                      >
                        {ct.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-2.5">
                    संत निवड (पर्यायी)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SAINTS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSaint(s.id)}
                        className={`px-3.5 py-2 rounded-full text-xs font-marathi border transition-all min-h-[44px] inline-flex items-center ${
                          state.saintIds.includes(s.id)
                            ? 'bg-[var(--dp-gold)] text-[#0d0906] font-semibold border-[var(--dp-gold)]'
                            : 'bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] border-[var(--dp-rule)] hover:border-[var(--dp-gold)]'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)]">
                  <p className="text-xs text-[var(--dp-muted)] font-marathi leading-relaxed">
                    टीप: कोणतीही विशिष्ट निवड न केल्यास समग्र संत वाङ्मय अभिलेखागारातून सर्वोत्कृष्ट रचनांचे स्वयंचलित संकलन केले जाईल.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Cover Design */}
            {step === 2 && (
              <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-6">
                <div className="border-b border-[var(--dp-rule)] pb-3">
                  <h2 className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)]">
                    मुखपृष्ठ व सौंदर्य रचना
                  </h2>
                  <p className="text-xs text-[var(--dp-muted)] font-marathi mt-0.5">
                    पुस्तकाची बाह्य रंगसंगती व सजावट निश्चित करा
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-3">
                    मुखपृष्ठ रंगसंगती
                  </label>
                  <div className="flex flex-wrap gap-4 items-center">
                    {PALETTES.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => update({ palette: p.value })}
                        className={`w-12 h-12 rounded-full border-2 transition-transform min-h-[44px] min-w-[44px] relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] ${
                          state.palette === p.value
                            ? 'border-[var(--dp-gold)] scale-110 shadow-[0_0_12px_rgba(201,162,39,0.5)]'
                            : 'border-[var(--dp-rule)] hover:scale-105'
                        }`}
                        style={{ backgroundColor: p.color }}
                        title={p.label}
                        aria-label={`रंगसंगती: ${p.label}`}
                      >
                        {state.palette === p.value && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Sparkles size={14} className="text-white drop-shadow-md" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-xl border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={state.foilEffect}
                      onChange={(e) => update({ foilEffect: e.target.checked })}
                      className="mt-0.5 w-4 h-4 text-[var(--dp-gold)] rounded border-[var(--dp-rule)] bg-[var(--dp-ground)] focus:ring-[var(--dp-gold)]"
                    />
                    <div>
                      <p className="font-semibold text-sm text-[var(--dp-ink)] font-marathi">
                        सुवर्ण फॉइल इफेक्ट (Golden Foil Embossing)
                      </p>
                      <p className="text-xs text-[var(--dp-muted)] font-marathi mt-0.5">
                        शीर्षकावर व प्रतीकावर सोनेरी उठावदार चमक दिली जाईल
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-xl border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={state.isPublic}
                      onChange={(e) => update({ isPublic: e.target.checked })}
                      className="mt-0.5 w-4 h-4 text-[var(--dp-gold)] rounded border-[var(--dp-rule)] bg-[var(--dp-ground)] focus:ring-[var(--dp-gold)]"
                    />
                    <div>
                      <p className="font-semibold text-sm text-[var(--dp-ink)] font-marathi">
                        सार्वजनिक वाचनालयासाठी उपलब्ध करा (Public Archive)
                      </p>
                      <p className="text-xs text-[var(--dp-muted)] font-marathi mt-0.5">
                        इतर वारकरी भाविकांना हे पुस्तक वाचण्याची व अभ्यासण्याची परवानगी द्या
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Review & Generate */}
            {step === 3 && (
              <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
                <div className="border-b border-[var(--dp-rule)] pb-3">
                  <h2 className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)]">
                    ग्रंथ निर्मिती सारांश
                  </h2>
                  <p className="text-xs text-[var(--dp-muted)] font-marathi mt-0.5">
                    सर्व माहिती तपासून अंतिम निर्मिती सुरू करा
                  </p>
                </div>

                <div className="space-y-3 text-sm font-marathi">
                  <Row label="ग्रंथ शीर्षक" value={state.titleMarathi} />
                  {state.titleEnglish && <Row label="इंग्रजी नाव" value={state.titleEnglish} />}
                  <Row
                    label="प्रकार"
                    value={BOOK_TYPES.find((b) => b.value === state.bookType)?.label ?? ''}
                  />
                  <Row
                    label="काव्यप्रकार"
                    value={
                      state.compositionTypes.length > 0
                        ? state.compositionTypes.join(', ')
                        : 'समग्र उपलब्ध प्रकार'
                    }
                  />
                  <Row
                    label="रंगसंगती"
                    value={PALETTES.find((p) => p.value === state.palette)?.label ?? ''}
                  />
                  <Row label="सुवर्ण फॉइल" value={state.foilEffect ? 'समाविष्ट' : 'नाही'} />
                  <Row label="सार्वजनिक संग्रह" value={state.isPublic ? 'होय' : 'केवळ वैयक्तिक'} />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep((prev) => (Math.max(0, prev - 1) as Step))}
                className={`px-5 py-2.5 border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] rounded-lg text-xs sm:text-sm font-marathi transition-colors min-h-[44px] inline-flex items-center gap-1.5 ${
                  step === 0 ? 'invisible' : ''
                }`}
              >
                <ArrowLeft size={14} />
                <span>मागे</span>
              </button>

              {state.error && (
                <p className="text-red-400 text-xs font-marathi px-2 text-center">
                  {state.error}
                </p>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (Math.min(3, prev + 1) as Step))}
                  disabled={!canProceed(step)}
                  className="px-6 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] font-semibold rounded-lg hover:bg-[var(--dp-gold-celestial)] text-xs sm:text-sm font-marathi transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] inline-flex items-center gap-1.5"
                >
                  <span>पुढील टप्पा</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={state.generating || !canProceed(step)}
                  className="px-6 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] font-semibold rounded-lg hover:bg-[var(--dp-gold-celestial)] text-xs sm:text-sm font-marathi transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] inline-flex items-center gap-2"
                >
                  {state.generating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>ग्रंथ तयार होत आहे...</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      <span>ग्रंथ निर्मिती सुरू करा</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[var(--dp-rule)]/40 last:border-0 text-xs font-marathi">
      <span className="text-[var(--dp-muted)]">{label}</span>
      <span className="font-semibold text-[var(--dp-ink)]">{value}</span>
    </div>
  );
}
