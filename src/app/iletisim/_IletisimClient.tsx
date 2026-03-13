'use client';

import { useState } from 'react';
import { Mail, Clock, Bug } from 'lucide-react';

const SUBJECTS = [
  'Hata Bildirimi',
  'Hesaplama Yanlışlığı',
  'Özellik Önerisi',
  'Diğer',
];

export default function IletisimClient() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(
      `Ad Soyad: ${form.name}\nKonu: ${form.subject}\n\n${form.message}`,
    );
    window.location.href = `mailto:info@hesaplayim.com?subject=${encodeURIComponent(form.subject)}&body=${body}`;
}

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Bizimle İletişime Geçin</h1>
      <p className="text-slate-500 mb-10">
        Hata bildirimi, öneri veya sorularınız için aşağıdaki formu kullanabilirsiniz.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Adınız ve soyadınız"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-posta</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ornek@eposta.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Konu</label>
            <select
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {SUBJECTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mesaj</label>
            <textarea
              required
              minLength={50}
              rows={6}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Mesajınızı buraya yazın (en az 50 karakter)..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Gönder
          </button>
        </form>

        {/* Info cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">E-posta</p>
              <a href="mailto:info@hesaplayim.com" className="text-sm text-slate-700 hover:text-blue-600 transition-colors">
                info@hesaplayim.com
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Yanıt Süresi</p>
              <p className="text-sm text-slate-700">1–3 iş günü içinde yanıt veriyoruz.</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <Bug size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Hata Bildirimi</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Hesaplama hatası bulduysanız lütfen hangi sayfada ve hangi değerlerle
                hata aldığınızı belirtin.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 mt-2">
            <p className="text-sm text-amber-800 leading-relaxed">
              <span className="font-semibold">ℹ️ Bilgi:</span> Muhasebe veya hukuki danışmanlık
              hizmeti vermiyoruz. Hesaplamalar bilgilendirme amaçlıdır.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
