interface FaqItem {
  q: string;
  a: string;
}

interface InfoSectionProps {
  title: string;
  intro: string;
  formula?: string;
  steps?: string[];
  faqs: FaqItem[];
}

export function InfoSection({ title, intro, formula, steps, faqs }: InfoSectionProps) {
  return (
    <section className="mt-10 space-y-6">
      <div className="border border-zinc-200 rounded-xl p-6 bg-white">
        <h2 className="text-lg font-semibold text-zinc-800 mb-3">{title}</h2>
        <p className="text-zinc-600 text-sm leading-relaxed">{intro}</p>

        {formula && (
          <div className="mt-4 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3">
            <p className="text-sm font-mono text-zinc-700 leading-relaxed">{formula}</p>
          </div>
        )}

        {steps && steps.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
              Adım Adım
            </p>
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {faqs.length > 0 && (
        <div className="border border-zinc-200 rounded-xl bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              Sık Sorulan Sorular
            </p>
          </div>
          <div className="divide-y divide-zinc-100">
            {faqs.map((faq, i) => (
              <div key={i} className="px-6 py-4">
                <p className="text-sm font-semibold text-zinc-800 mb-1">{faq.q}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
