export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-400 text-sm">
        <p className="mb-1">
          Veriler GİB ve ÇSGB mevzuatına dayanmaktadır. Sonuçlar bilgilendirme amaçlıdır.
        </p>
        <p>
          © {new Date().getFullYear()} BordroHesapla &mdash; Yasal danışmanlık niteliği taşımaz.
        </p>
      </div>
    </footer>
  );
}
