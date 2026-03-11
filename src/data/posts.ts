export interface Post {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
  relatedTool?: { name: string; href: string };
  faqs: { q: string; a: string }[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: '2026-asgari-ucret-net-maas',
    title: '2026 Asgari Ücret Net Maaş Ne Kadar?',
    description:
      '2026 asgari ücreti brüt 22.104,67 TL. Bekâr, evli ve çocuklu çalışanlar için net maaş, SGK kesintileri ve işveren maliyeti hesaplaması.',
    excerpt:
      '2026 yılı asgari ücreti brüt 22.104,67 TL olarak açıklandı. Peki eline geçen net tutar ne kadar? Tüm kesintilerle birlikte adım adım hesaplama.',
    date: 'Mart 2026',
    category: 'Maaş & Bordro',
    readingTime: '5 dk',
    relatedTool: { name: 'Brütten Nete Maaş Hesaplama', href: '/brutten-nete' },
    faqs: [
      {
        q: '2026 asgari ücret net ne kadar?',
        a: '2026 yılı asgari ücreti brüt 22.104,67 TL olup bekâr bir çalışan için net maaş yaklaşık 17.968 TL, evli ve eşi çalışmayan çalışan için ise yaklaşık 18.010 TL civarındadır. Medeni duruma ve AGİ tutarına bağlı olarak değişiklik gösterir.',
      },
      {
        q: '2026 asgari ücretten ne kadar SGK kesiliyor?',
        a: 'SGK işçi payı %14 oranında uygulanır: 22.104,67 x 0,14 = 3.094,65 TL. İşsizlik sigortası işçi payı %1: 22.104,67 x 0,01 = 221,05 TL. Toplam işçi kesintisi: 3.315,70 TL.',
      },
      {
        q: 'İşveren asgari ücretli için toplam ne kadar ödüyor?',
        a: 'İşverenin brüt maaşa eklediği SGK işveren payı (%15,5) = 3.426,22 TL ve işsizlik işveren payı (%2) = 442,09 TL. Toplam maliyet: 22.104,67 + 3.868,31 = yaklaşık 25.973 TL. 5 puan teşvikten yararlanılırsa bu tutar düşer.',
      },
      {
        q: 'AGİ nedir, asgari ücret çalışanına etkisi nedir?',
        a: 'Asgari Geçim İndirimi (AGİ), hesaplanan gelir vergisinden indirilen bir tutardır. 2026\'da bekâr çalışan için aylık yaklaşık 165,79 TL AGİ sayesinde o kadar daha fazla net maaş alınır. Evli ve çocuklu çalışanlarda bu tutar artar.',
      },
    ],
    content: `<p><strong>2026 yılı asgari ücreti</strong>, Asgari Ücret Tespit Komisyonu tarafından aylık brüt <strong>22.104,67 TL</strong> olarak belirlendi. Bu tutar 1 Ocak 2026 itibarıyla geçerlidir. Peki bu brüt tutardan ne kadar net maaş elde edilir?</p>

<h2>Brüt Maaş Neden Net Olmuyor?</h2>
<p>Brüt maaş; SGK işçi primi, işsizlik sigortası, gelir vergisi ve damga vergisi gibi yasal kesintilere tabidir. Bu kesintiler düşüldükten ve Asgari Geçim İndirimi (AGİ) eklendikten sonra elde edilen tutar net maaştır.</p>

<h2>Net Maaş Hesaplama Adımları</h2>

<h3>1. SGK İşçi Primi (%14)</h3>
<p>Brüt maaşın %14'ü SGK işçi payı olarak kesilir:</p>
<p><strong>22.104,67 x 0,14 = 3.094,65 TL</strong></p>

<h3>2. İşsizlik Sigortası İşçi Payı (%1)</h3>
<p>Brüt maaşın %1'i işsizlik sigortası olarak kesilir:</p>
<p><strong>22.104,67 x 0,01 = 221,05 TL</strong></p>

<h3>3. Gelir Vergisi Matrahı</h3>
<p>SGK ve işsizlik primleri düşülünce kalan tutar, gelir vergisi matrahını oluşturur:</p>
<p><strong>22.104,67 - 3.094,65 - 221,05 = 18.788,97 TL</strong></p>

<h3>4. Gelir Vergisi</h3>
<p>2026 yılında aylık 18.788,97 TL'lik matrah %15'lik gelir vergisi dilimine girer:</p>
<p><strong>18.788,97 x 0,15 = 2.818,35 TL</strong></p>
<p>Kümülatif matrah yıl içinde arttıkça üst dilimlere geçiş olabilir. Özellikle yılın ikinci yarısından itibaren %20 diliminde vergi ödeniyor olabilirsiniz.</p>

<h3>5. Asgari Geçim İndirimi (AGİ)</h3>
<p>AGİ, hesaplanan gelir vergisinden indirilir. 2026 yılı için medeni duruma göre aylık AGİ tutarları:</p>
<ul>
  <li><strong>Bekâr:</strong> yaklaşık 165,79 TL</li>
  <li><strong>Evli, eşi çalışmıyor:</strong> yaklaşık 207,23 TL</li>
  <li><strong>Evli, eşi çalışmıyor, 1 çocuk:</strong> yaklaşık 228,96 TL</li>
  <li><strong>Evli, eşi çalışmıyor, 2 çocuk:</strong> yaklaşık 250,69 TL</li>
  <li><strong>Evli, eşi çalışmıyor, 3+ çocuk:</strong> yaklaşık 280,59 TL</li>
</ul>

<h3>6. Damga Vergisi (%0,759)</h3>
<p>Brüt maaş üzerinden binde 7,59 oranında damga vergisi kesilir:</p>
<p><strong>22.104,67 x 0,00759 = 167,77 TL</strong></p>

<h2>2026 Asgari Ücret Net Maaş Özeti</h2>
<ul>
  <li>Brüt Maaş: 22.104,67 TL</li>
  <li>SGK İşçi Payı (-): 3.094,65 TL</li>
  <li>İşsizlik Sigortası (-): 221,05 TL</li>
  <li>Gelir Vergisi (-): 2.652,56 TL (AGİ sonrası, bekâr için)</li>
  <li>Damga Vergisi (-): 167,77 TL</li>
  <li><strong>Net Maaş (bekâr): yaklaşık 15.968 TL</strong></li>
</ul>
<p>Evli ve çocuklu çalışanlar AGİ avantajından daha fazla yararlanarak biraz daha yüksek net maaş alırlar.</p>

<h2>İşverenin Asgari Ücret Maliyeti</h2>
<p>İşveren, brüt maaşın üstüne kendi SGK ve işsizlik paylarını da öder:</p>
<ul>
  <li>SGK İşveren Payı (%15,5): 3.426,22 TL</li>
  <li>İşsizlik İşveren Payı (%2): 442,09 TL</li>
  <li><strong>Toplam İşveren Maliyeti: yaklaşık 25.973 TL</strong></li>
</ul>
<p>5 puanlık SGK işveren teşvikinden yararlanan firmalar için bu maliyet daha düşük olabilir. Teşvik kapsamında işveren SGK payı %15,5 yerine %10,5 olarak uygulanır; fark Hazine tarafından karşılanır.</p>

<h2>Asgari Ücretin Üzerinde Maaş Alıyorsanız</h2>
<p>Asgari ücretin üzerinde maaş alan çalışanlar için hesaplama çok daha karmaşık bir hal alır. Gelir vergisi kümülatif matrah sistemiyle uygulandığından yıl içinde birden fazla dilimden vergi ödenebilir. Bu hesaplamayı otomatik yapmak için <a href="/brutten-nete">Brütten Nete Maaş Hesaplama</a> aracımızı kullanabilirsiniz.</p>

<h2>Kümülatif Vergi Dilimi ve Yıl Sonu Etkisi</h2>
<p>Ocak ayından itibaren her ay matrahlar birikir. Yılın ikinci yarısında kümülatif matrah 110.000 TL'yi aşmaya başladığında %20 dilimine girilir. Bu durum özellikle asgari ücretin üzerinde kazanan çalışanlarda Temmuz-Aralık döneminde net maaşı hafifçe düşürür.</p>

<h2>Asgari Ücret ve Emeklilik Hakkı</h2>
<p>SGK primleri asgari ücret tabanı üzerinden yatırılmak zorundadır. Daha düşük matrah üzerinden prim bildirimi yapılamaz. Bu durum hem emeklilik hakkının doğmasını hem de hastalık, iş kazası gibi sigorta haklarını koruma altına alır.</p>

<h2>Sonuç</h2>
<p>2026 yılında asgari ücretli bir çalışan, brüt 22.104,67 TL'lik maaşından yaklaşık 4.000-4.300 TL vergi ve prim kesintisi öder; eline geçen net tutar medeni duruma göre 15.900-16.200 TL arasındadır. Kendi maaşınız için hesaplama yapmak isterseniz <a href="/brutten-nete">Brütten Nete Maaş Hesaplama</a> aracımızı kullanabilirsiniz.</p>`,
  },

  {
    slug: 'kidem-tazminati-alma-sartlari',
    title: 'Kıdem Tazminatı Alma Şartları 2026',
    description:
      'Kıdem tazminatına hak kazanma şartları, 2026 tavan tutarı (64.948,77 TL), hesaplama formülü ve sık yapılan hatalar.',
    excerpt:
      'Kıdem tazminatı alabilmek için hangi şartlar gerekiyor? 2026 güncel tavan, hesaplama formülü ve hangi durumlarda hak kaybedildiği bu rehberde.',
    date: 'Mart 2026',
    category: 'Maaş & Bordro',
    readingTime: '6 dk',
    relatedTool: { name: 'Kıdem Tazminatı Hesaplama', href: '/kidem-tazminati' },
    faqs: [
      {
        q: 'Kıdem tazminatı için kaç yıl çalışmak gerekiyor?',
        a: 'Kıdem tazminatına hak kazanmak için aynı işverenin yanında aralıksız en az 1 tam yıl çalışmış olmak gerekir. 1 yılın altındaki çalışma süresi için kıdem tazminatı ödenmez.',
      },
      {
        q: 'İstifa edince kıdem tazminatı alınabilir mi?',
        a: 'Normal istifada kıdem tazminatı alınamaz. Ancak; askerlik için ayrılma, evlendikten sonra 1 yıl içinde ayrılan kadın çalışanlar, emeklilik hakkı kazanma veya İş Kanunu 24. madde kapsamında haklı nedenle fesih hallerinde istifa etmiş olsanız dahi tazminat alabilirsiniz.',
      },
      {
        q: '2026 kıdem tazminatı tavan tutarı ne kadar?',
        a: '2026 yılı için kıdem tazminatı tavanı 64.948,77 TL\'dir. Aylık brüt maaşınız bu tutarın üzerinde olsa bile hesaplamada en fazla 64.948,77 TL esas alınır.',
      },
      {
        q: 'Kıdem tazminatından vergi kesilir mi?',
        a: 'Kıdem tazminatı gelir vergisinden muaf tutulur. Ancak %0,759 oranında damga vergisi kesilir. Yani brüt kıdem tazminatı tutarından yalnızca damga vergisi düşüldükten sonra kalan tutar ödenir.',
      },
    ],
    content: `<p>Kıdem tazminatı, Türk iş hukukunun en önemli işçi güvencelerinden biridir. Yıllarca çalışan bir kişinin işten ayrılırken elde ettiği bu hak, doğru bilinmediğinde kolayca kaybedilebilir. Bu rehberde 2026 yılı güncel bilgilerini bulabilirsiniz.</p>

<h2>Kıdem Tazminatı Nedir?</h2>
<p>Kıdem tazminatı; bir işyerinde asgari 1 yıl çalışan işçiye, iş sözleşmesinin belirli koşullarda sona ermesi halinde işveren tarafından ödenen tazminattır. Her tam çalışma yılı için bir aylık brüt maaş üzerinden hesaplanır; kalan süre için orantılı ödeme yapılır.</p>

<h2>Temel Hak Kazanma Şartları</h2>
<ul>
  <li>4857 sayılı İş Kanunu'na tabi olmak</li>
  <li>Aynı işverenin yanında aralıksız en az <strong>1 tam yıl</strong> çalışmış olmak</li>
  <li>İş sözleşmesinin tazminat doğuran nedenlerden biriyle sona ermesi</li>
</ul>

<h2>Hangi Durumlarda Kıdem Tazminatı Alınır?</h2>
<ol>
  <li><strong>İşveren tarafından haksız veya geçersiz fesih:</strong> İşveren haklı neden olmaksızın sözleşmeyi sonlandırırsa işçi tazminata hak kazanır.</li>
  <li><strong>Zorunlu askerlik:</strong> Erkek çalışanların askerlik nedeniyle ayrılması.</li>
  <li><strong>Kadın çalışanın evlenmesi:</strong> Evlilik tarihinden itibaren 1 yıl içinde kendi isteğiyle ayrılan kadın çalışan tazminat alabilir.</li>
  <li><strong>Emeklilik, yaş veya prim dolumu:</strong> SGK'dan emekli olmaya hak kazanmak.</li>
  <li><strong>Çalışanın ölümü:</strong> Yasal mirasçılar tazminat alır.</li>
  <li><strong>İşyerinin kapanması veya devir:</strong> Bazı koşullarda tazminat hakkı doğar.</li>
  <li><strong>İşçinin haklı nedenle feshi (İK m.24):</strong> İşverenin ahlak ve iyiniyet kurallarına aykırı davranması, ücreti ödememesi gibi durumlarda işçi sözleşmeyi feshederek tazminat alabilir.</li>
</ol>

<h2>Hangi Durumlarda Kıdem Tazminatı Alınamaz?</h2>
<ul>
  <li>Herhangi bir haklı neden olmaksızın gönüllü istifa</li>
  <li>Deneme süresinde işten ayrılma</li>
  <li>İK Madde 25/II kapsamında işverenin haklı nedenle feshi (sarhoşluk, hırsızlık, işe gelmeme gibi)</li>
  <li>Belirli süreli sözleşmelerin doğal süre bitiminde sona ermesi</li>
  <li>1 yılı doldurmadan işten ayrılma</li>
</ul>

<h2>2026 Kıdem Tazminatı Tavan Tutarı</h2>
<p>Her tam çalışma yılı için ödenecek tutar, bir yıllık brüt maaşı aşamaz ve ayrıca yasal tavan rakamıyla sınırlandırılır. <strong>2026 yılı kıdem tazminatı tavanı: 64.948,77 TL.</strong></p>
<p>Brüt maaşınız bu tutarın üzerindeyse, hesaplamada aylık taban olarak en fazla 64.948,77 TL kullanılabilir.</p>

<h2>Hesaplama Formülü</h2>
<p>Kıdem tazminatı hesaplama formülü:</p>
<p><strong>Brüt Maaş x (Toplam Çalışma Günü / 365)</strong></p>
<p>Örnek: Brüt 35.000 TL maaşla 4 yıl 6 ay (1.642 gün) çalışan bir kişinin tazminatı:</p>
<ul>
  <li>35.000 x (1.642 / 365) = 35.000 x 4,498 = <strong>157.418,08 TL brüt tazminat</strong></li>
  <li>Tavan kontrolü: 35.000 TL &lt; 64.948,77 TL olduğundan tavan uygulanmaz.</li>
  <li>Damga vergisi: 157.418,08 x 0,00759 = 1.194,88 TL</li>
  <li><strong>Net tazminat: 156.223,20 TL</strong></li>
</ul>

<h2>Kıdem Tazminatında Damga Vergisi</h2>
<p>Kıdem tazminatı, gelir vergisinden muaf tutulur. Ancak <strong>%0,759 damga vergisi</strong> kesilir. Bu kesinti brüt tazminat tutarı üzerinden yapılır ve kalan net tutar çalışana ödenir.</p>

<h2>İhbar Tazminatıyla Karıştırılmamalı</h2>
<p>Kıdem tazminatı ile ihbar tazminatı birbirinden farklı haklardır. İhbar tazminatı, sözleşmeyi sona erdiren tarafın yasal ihbar süresine uymadığında ödemesi gereken tazminattır. Her iki tazminat birlikte alınabilir; birinin alınması diğerini engellemez.</p>

<h2>Kıdem Tazminatı Ne Zaman Ödenir?</h2>
<p>Kıdem tazminatı; iş sözleşmesinin sona erdiği tarihten itibaren mümkün olan en kısa sürede (genellikle birkaç gün içinde) ödenmelidir. Gecikme halinde en yüksek banka mevduat faiz oranı üzerinden gecikme faizi işler.</p>

<h2>Kıdem Süresine Dahil Edilen Süreler</h2>
<p>Aşağıdaki süreler kıdeme dahildir:</p>
<ul>
  <li>Ücretsiz izin süreleri (anlaşmayla)</li>
  <li>Hastalık nedeniyle geçirilen süreler (belirli sınırlara kadar)</li>
  <li>Yıllık izinde geçirilen süreler</li>
  <li>Kısmi çalışmada fiilen çalışılan süreler</li>
</ul>

<h2>Sonuç</h2>
<p>Kıdem tazminatı, en az 1 yıl çalışmış ve iş sözleşmesi haklı nedenlerle sona ermiş işçilere tanınan önemli bir güvencedir. 2026 tavan tutarı 64.948,77 TL olup gelir vergisinden muaf, yalnızca damga vergisine tabidir. Hesaplama yapmak için <a href="/kidem-tazminati">Kıdem Tazminatı Hesaplama</a> aracımızı kullanabilirsiniz.</p>`,
  },

  {
    slug: '2026-gelir-vergisi-dilimleri',
    title: '2026 Gelir Vergisi Dilimleri ve Oranları',
    description:
      '2026 yılı güncel gelir vergisi dilimleri: %15, %20, %27, %35, %40. Kümülatif matrah nasıl hesaplanır, örnek hesaplamalar ve yıl sonu etkisi.',
    excerpt:
      '2026 gelir vergisi dilimleri güncellendi. %15\'ten %40\'a kadar 5 dilim ve kümülatif matrah sistemi hakkında her şeyi bu yazıda bulabilirsiniz.',
    date: 'Mart 2026',
    category: 'Vergi',
    readingTime: '5 dk',
    relatedTool: { name: 'Brütten Nete Maaş Hesaplama', href: '/brutten-nete' },
    faqs: [
      {
        q: '2026 gelir vergisi dilimleri nelerdir?',
        a: '2026 yılı ücret geliri vergisi dilimleri: 0-110.000 TL %15, 110.001-230.000 TL %20, 230.001-580.000 TL %27, 580.001-3.000.000 TL %35, 3.000.001 TL ve üzeri %40 oranında gelir vergisine tabidir.',
      },
      {
        q: 'Kümülatif vergi matrahı ne anlama gelir?',
        a: 'Kümülatif matrah, Ocak ayından itibaren her ay eklenen aylık gelir vergisi matrahlarının toplamıdır. Vergi dilimi, bu biriken toplama göre belirlenir. Bu nedenle yılın başında düşük dilimden, yılın sonuna doğru daha yüksek dilimden vergi ödenebilir.',
      },
      {
        q: 'Yıl sonunda neden daha fazla vergi kesiliyor?',
        a: 'Kümülatif matrah sistemi nedeniyle Ocak\'tan Aralık\'a doğru birikimli matrah artar. Matrah üst dilimlere ulaşınca o kısım için daha yüksek oran uygulanır. Bu yasal ve beklenen bir durumdur; brüt maaştan kaynaklı bir değişiklik değildir.',
      },
      {
        q: 'AGİ gelir vergisini nasıl etkiliyor?',
        a: 'Asgari Geçim İndirimi (AGİ), hesaplanan gelir vergisi tutarından doğrudan düşülür. 2026\'da bekâr çalışan için aylık AGİ yaklaşık 165,79 TL\'dir. Bu tutar vergi borcundan indirildiği için çalışanın eline biraz daha fazla para geçer.',
      },
    ],
    content: `<p>Gelir vergisi, Türkiye'de ücret gelirlerinden kesilen en önemli vergilerden biridir. Sabit bir oran yerine artan oranlı tarife sistemi uygulanır. 2026 yılı için GİB tarafından açıklanan güncel dilimler ve örnek hesaplamalar bu rehberde yer almaktadır.</p>

<h2>Gelir Vergisi Nedir?</h2>
<p>Gelir vergisi, kişilerin elde ettikleri gelir üzerinden devlete ödedikleri doğrudan vergidir. Maaşlı çalışanlarda işveren, her ay ücret bordrosunda gelir vergisini hesaplar, keser ve muhtasar beyanname ile vergi dairesi adına öder. Çalışan bu tutarı net maaşından kesilmiş olarak alır.</p>

<h2>2026 Gelir Vergisi Dilimleri</h2>
<p>Gelir Vergisi Kanunu Madde 103 kapsamında, ücret gelirlerine uygulanan 2026 yılı tarife dilimleri şunlardır:</p>
<ul>
  <li><strong>0 – 110.000 TL:</strong> %15</li>
  <li><strong>110.001 – 230.000 TL:</strong> %20</li>
  <li><strong>230.001 – 580.000 TL:</strong> %27</li>
  <li><strong>580.001 – 3.000.000 TL:</strong> %35</li>
  <li><strong>3.000.001 TL ve üzeri:</strong> %40</li>
</ul>
<p>Bu oranlar <strong>yıllık kümülatif matrah</strong> üzerinden uygulanır; tek bir oran değil, her dilim kendi oranıyla değerlendirilir.</p>

<h2>Kümülatif Matrah Sistemi</h2>
<p>Türkiye'de ücret gelirleri kümülatif matrah sistemine göre vergilendirilir. Bu sistem şu anlama gelir:</p>
<ul>
  <li>Ocak ayında aylık matrah hesaplanır ve yıllık kümülatif toplama eklenir.</li>
  <li>Şubat ayında yine aylık matrah hesaplanır, kümülatif toplam artırılır.</li>
  <li>Her ay vergi, o ayki kümülatif toplama göre hesaplanır; önceki ay ödenen vergi düşülerek fark ödenir.</li>
</ul>
<p>Sonuç olarak yıl başında düşük dilimden vergi ödenirken, yıl sonuna doğru kümülatif matrah üst dilimlere ulaşabilir.</p>

<h2>Örnek: Aylık Brüt 30.000 TL için Yıl Boyunca Vergi</h2>
<p>SGK ve işsizlik sigortası kesintileri sonrası aylık matrah yaklaşık 25.500 TL olur. Altı ay boyunca birikirsek 153.000 TL kümülatif matrah oluşur. Bu noktada 110.000 TL'lik dilim aşılmış ve %20 diline girilmiş olur.</p>
<ul>
  <li><strong>Ocak – Dördüncü ay civarında:</strong> Yıllık kümülatif 110.000 TL'nin altında → %15 dilim</li>
  <li><strong>Beşinci aydan itibaren:</strong> Kümülatifin bir kısmı 110.001-230.000 TL arasına girer → Aşan kısım için %20</li>
  <li><strong>Yüksek maaşlarda ilerleyen aylarda:</strong> %27 ve üstü dilimler devreye girebilir</li>
</ul>

<h2>Net Maaşa Etkisi: Yıl İçi Fark</h2>
<p>Kümülatif matrah sistemi nedeniyle aynı brüt maaş için yılın farklı aylarında farklı miktarda gelir vergisi ödenir. Ocak ayı ile Aralık ayı arasında net maaşta farklılık normaldir. Örneğin:</p>
<ul>
  <li>Ocak: 30.000 TL brüt → yaklaşık X TL net</li>
  <li>Temmuz: 30.000 TL brüt → yaklaşık X - 300 TL net (üst dilim etkisiyle)</li>
</ul>
<p>Bu farklılık yasal bir durumdur, işveren hatası değildir. Bazı işverenler yıllık dengeleme yaparak bu etkiyi düzenlerler.</p>

<h2>AGİ'nin Etkisi</h2>
<p>Asgari Geçim İndirimi (AGİ), hesaplanan gelir vergisinden belirli bir tutarın indirilmesini sağlar. 2026 yılı AGİ oranları:</p>
<ul>
  <li>Bekâr: Asgari ücretin %50'si üzerinden %15 = aylık ~165,79 TL</li>
  <li>Evli, eşi çalışmıyor: Asgari ücretin %60'ı üzerinden ~207,23 TL</li>
  <li>Her çocuk için ek: Asgari ücretin %7,5'i üzerinden ~27,63 TL (ilk iki çocuk için); üçüncü çocuk için ~41,45 TL</li>
</ul>

<h2>Damga Vergisi</h2>
<p>Gelir vergisine ek olarak brüt maaş üzerinden <strong>%0,759 damga vergisi</strong> de kesilir. Bu kesinti hem SGK priminden hem de gelir vergisinden bağımsız olarak uygulanır.</p>

<h2>Serbest Meslek ve Diğer Gelirler</h2>
<p>Yukarıdaki dilimler ücret gelirleri için geçerlidir. Kira, faiz gibi menkul sermaye iratları ile serbest meslek kazançları için benzer ancak farklılık gösteren tarifeler uygulanabilir. Serbest meslek sahiplerinin ayrıca yıllık beyanname vermesi gerekir.</p>

<h2>Kolay Hesaplama</h2>
<p>Brüt maaşınızın eline geçen net tutarını öğrenmek için 2026 güncel dilimleri kullanan <a href="/brutten-nete">Brütten Nete Maaş Hesaplama</a> aracımızı kullanabilirsiniz. Medeni durumunuzu ve brüt maaşınızı girerek saniyeler içinde sonuç alırsınız.</p>

<h2>Sonuç</h2>
<p>2026 yılı gelir vergisi dilimleri beş kademeden oluşmakta; %15 ile başlayıp en yüksek %40 ile devam etmektedir. Kümülatif matrah sistemi nedeniyle yıl boyunca net maaşınızda ufak değişimler yaşanabilir. Bu tamamen normaldir ve yıllık vergi hesabının doğal bir sonucudur.</p>`,
  },

  {
    slug: 'sgk-prim-oranlari-2026',
    title: 'SGK Prim Oranları 2026: İşçi ve İşveren Payları',
    description:
      'SGK prim oranları 2026: işçi payı %15, işveren payı %17,5. Prim tavan ve tabanı, 5 puanlık teşvik ve emeklilik üzerindeki etkisi.',
    excerpt:
      '2026 yılı SGK prim oranları güncellendi. İşçi ve işveren payları, prim tavan-taban sınırları ve 5 puan teşvikin etkisi bu rehberde.',
    date: 'Mart 2026',
    category: 'Vergi',
    readingTime: '5 dk',
    relatedTool: { name: 'Brütten Nete Maaş Hesaplama', href: '/brutten-nete' },
    faqs: [
      {
        q: '2026 SGK işçi payı yüzde kaç?',
        a: 'SGK işçi payı toplamı %14\'tür (uzun vadeli sigorta %9 + kısa vadeli %0 + genel sağlık %5). Buna işsizlik sigortası işçi payı %1 eklenince toplam işçi kesintisi brüt maaşın %15\'i olur.',
      },
      {
        q: 'SGK işveren payı ne kadar?',
        a: 'Standart SGK işveren payı %15,5\'tir. Buna işsizlik sigortası işveren payı %2 eklenince toplam işveren prim yükü %17,5\'e ulaşır. 5 puanlık teşvikten yararlanıldığında SGK işveren payı %10,5\'e iner.',
      },
      {
        q: '2026 SGK prim tavanı ne kadar?',
        a: 'SGK prim tavanı, asgari ücretin 7,5 katıdır. 2026 için: 22.104,67 x 7,5 = 165.785,03 TL. Bu tutarın üzerindeki maaş kısmı için prim kesilmez.',
      },
      {
        q: '5 puanlık SGK teşviki nedir?',
        a: '5 puanlık SGK teşviki, işverenlerin SGK işveren payının 5 puanlık kısmını Hazine\'nin karşılaması esasına dayanır. Bu sayede işveren SGK payı %15,5 yerine %10,5 olarak uygulanır; büyük ölçüde işverenlerin faydalanabileceği bir indirimdir.',
      },
    ],
    content: `<p>Sosyal Güvenlik Kurumu (SGK) primleri, çalışanların emeklilik, sağlık ve iş kazası gibi haklarını güvence altına alır. Hem çalışanın maaşından kesinti yapılır hem de işveren kendi payını üstlenir. 2026 yılı güncel prim oranları ve uygulama esasları bu rehberde yer almaktadır.</p>

<h2>SGK Prim Sistemi Nasıl Çalışır?</h2>
<p>Türkiye'de sosyal güvenlik primleri iki taraftan toplanır:</p>
<ul>
  <li><strong>İşçi payı:</strong> Çalışanın brüt maaşından kesilir ve net maaşını düşürür.</li>
  <li><strong>İşveren payı:</strong> İşveren tarafından brüt maaşa ek olarak ödenir; işçinin maaşını etkilemez.</li>
</ul>
<p>Her iki pay da SGK'ya bildirilir ve çalışanın sosyal güvenlik hesabına işlenir.</p>

<h2>2026 İşçi Prim Oranları</h2>
<ul>
  <li><strong>Uzun vadeli sigorta (malullük, yaşlılık, ölüm):</strong> %9</li>
  <li><strong>Kısa vadeli sigorta (iş kazası, meslek hastalığı):</strong> %0 (işçiden kesilmez)</li>
  <li><strong>Genel Sağlık Sigortası (GSS):</strong> %5</li>
  <li><strong>Toplam SGK işçi payı: %14</strong></li>
  <li><strong>İşsizlik Sigortası işçi payı: %1</strong></li>
  <li><strong>İşçi toplam kesintisi: %15</strong></li>
</ul>

<h2>2026 İşveren Prim Oranları</h2>
<ul>
  <li><strong>Uzun vadeli sigorta:</strong> %11</li>
  <li><strong>Kısa vadeli sigorta:</strong> İşyeri tehlike sınıfına göre %1 ile %6,5 arasında değişir (işverenden)</li>
  <li><strong>Genel Sağlık Sigortası:</strong> %7,5</li>
  <li><strong>Toplam SGK işveren payı (standart): %15,5 + kısa vade</strong></li>
  <li><strong>İşsizlik Sigortası işveren payı: %2</strong></li>
  <li><strong>İşveren toplam yükü: yaklaşık %17,5 (standart + kısa vade ayrı)</strong></li>
</ul>

<h2>Toplam Prim Yükü</h2>
<p>İşçi (%15) + İşveren (%17,5) = Brüt maaşın <strong>%32,5'i</strong> sosyal güvenlik sistemi için ayrılmaktadır. Bu oran OECD ülkeleriyle karşılaştırıldığında orta seviyededir.</p>

<h2>5 Puanlık SGK Teşviki</h2>
<p>Türkiye'de birçok işveren, SGK işveren payını 5 puan düşüren teşvikten yararlanır. Bu teşvikle işveren SGK payı %15,5 yerine <strong>%10,5</strong> olarak uygulanır; fark olan %5 Hazine tarafından karşılanır. Teşvik için genel olarak SGK borcu bulunmaması ve çalışan sayısına dair belirli koşulların sağlanması gerekmektedir.</p>

<h2>Prim Taban ve Tavanı</h2>
<p>SGK primleri hesaplanırken iki önemli sınır söz konusudur:</p>
<ul>
  <li><strong>Prim tabanı (alt limit):</strong> Asgari ücret olan 22.104,67 TL. Hiçbir çalışan bu tutarın altında prime tabi tutulamaz.</li>
  <li><strong>Prim tavanı (üst limit):</strong> Asgari ücretin 7,5 katı = 22.104,67 x 7,5 = <strong>165.785,03 TL.</strong> Bu tutarın üzerindeki maaş kısmı için prim hesaplanmaz.</li>
</ul>
<p>Prim tavanını aşan maaş kısmı, prim açısından dikkate alınmaz; ancak bu kısım için gelir vergisi hesaplanmaya devam eder.</p>

<h2>Kısa Vadeli Sigorta Primleri</h2>
<p>İş kazası ve meslek hastalığı primlerini kapsayan kısa vadeli sigorta oranları işyeri tehlike sınıfına göre belirlenir. Bu oran tamamen işveren tarafından ödenir; işçiden herhangi bir kesinti yapılmaz. Örnek oranlar:</p>
<ul>
  <li>Ofis ortamı (1. sınıf): %1</li>
  <li>İmalat (orta tehlike): %2-3</li>
  <li>Madencilik ve ağır sanayi: %4-6,5</li>
</ul>

<h2>Emeklilik ve Prim Günleri</h2>
<p>SGK primleri yalnızca para kesintisi değildir; aynı zamanda emeklilik için prim gün sayısı biriktirmenizi sağlar. Türkiye'de emekliliğe hak kazanmak için:</p>
<ul>
  <li>1/4/2000 sonrası sigortalılar için: 7.200 gün prim ve 58/60 yaş (kadın/erkek) koşulları uygulanmaktadır.</li>
  <li>Her tam takvim günü çalışma 1 prim günüdür.</li>
  <li>Eksik veya hatalı bildirilen primler emeklilik hakkını geciktirebilir.</li>
</ul>

<h2>Kayıt Dışı Çalışmanın Riskleri</h2>
<p>SGK'ya bildirilmeksizin çalışmak hem işçi hem de işveren için önemli riskler doğurur. İşçi açısından emeklilik hakkı, sağlık güvencesi ve iş kazası tazminatı alınamaz. İşveren açısından idari para cezaları ve geriye dönük prim borçları gündeme gelir. SGK denetimleri giderek daha sık yapılmaktadır.</p>

<h2>Maaş Hesabınızı Yapın</h2>
<p>SGK primlerinin net maaşa etkisini görmek için 2026 güncel oranlarıyla çalışan <a href="/brutten-nete">Brütten Nete Maaş Hesaplama</a> aracımızı kullanabilirsiniz. Brüt maaşınızı girin, medeni durumunuzu seçin; tüm kesintiler otomatik hesaplandır.</p>

<h2>Sonuç</h2>
<p>2026 yılında SGK işçi payı brüt maaşın %15'i, işveren payı ise %17,5'idir (standart). 5 puanlık teşvikten yararlanan işverenler bu yükü azaltabilir. Prim tabanı asgari ücret, tavanı ise asgari ücretin 7,5 katıdır; bu sınırlar dışına çıkılamaz.</p>`,
  },

  {
    slug: 'yillik-izin-haklari-turkiye',
    title: 'Türkiye\'de Yıllık İzin Hakları: Tam Rehber',
    description:
      'Türkiye\'de yıllık izin süreleri: 1-5 yıl 14 gün, 5-15 yıl 20 gün, 15+ yıl 26 gün. Kullanılmayan izinler, izin ücreti ve özel hükümler.',
    excerpt:
      'Yıllık izin ne zaman hak kazanılır? İzin süreleri, kullanılmayan izinlerin paraya çevrilmesi ve özel durumlar için tam rehber.',
    date: 'Mart 2026',
    category: 'Maaş & Bordro',
    readingTime: '6 dk',
    relatedTool: { name: 'Kıdem Tazminatı Hesaplama', href: '/kidem-tazminati' },
    faqs: [
      {
        q: 'Yıllık izin hakkı ne zaman doğar?',
        a: 'Yıllık ücretli izin hakkı, aynı işyerinde aralıksız en az 1 tam yıl çalışıldığında doğar. 1 yılı doldurmayan çalışanlar yasal yıllık izin hakkından yararlanamazlar; ancak işveren isteğe bağlı olarak avans izin kullandırabilir.',
      },
      {
        q: 'Kaç yıl çalışınca kaç gün izin alınır?',
        a: '1-5 yıl çalışma için yılda en az 14 iş günü, 5-15 yıl için 20 iş günü, 15 yıl ve üzerinde ise 26 iş günü yıllık izin hakkı doğmaktadır. Bu süreler yasal minimumlar olup toplu iş sözleşmesiyle artırılabilir.',
      },
      {
        q: 'Kullanılmayan yıllık izinler ne olur?',
        a: 'Yıllık izin hakkı, iş sözleşmesi devam ettiği sürece para ile satın alınamaz ve kullandırılmak zorundadır. Ancak sözleşme sona erdiğinde kullanılmamış tüm izün günleri için işveren, sözleşme bitiş tarihindeki ücret üzerinden izin ücreti ödemekle yükümlüdür.',
      },
      {
        q: 'Yıllık izin ücreti nasıl hesaplanır?',
        a: 'İzin ücreti, çalışanın brüt günlük ücreti üzerinden hesaplanır. Günlük brüt ücret genellikle aylık brüt maaşın 30\'a bölünmesiyle bulunur. İzin ücretine fazla mesai, prim vb. ek ödemeler dahil edilmez.',
      },
    ],
    content: `<p>Yıllık ücretli izin, 4857 sayılı İş Kanunu tarafından güvence altına alınan temel çalışan haklarından biridir. Bu rehberde izin hakkının ne zaman doğduğu, süresi, kullanım kuralları ve sözleşme sonundaki hakkınız hakkında 2026 güncel bilgileri bulabilirsiniz.</p>

<h2>Yıllık İzin Hakkı Ne Zaman Doğar?</h2>
<p>İş Kanunu'nun 53. maddesi uyarınca yıllık ücretli izin hakkı, bir işyerinde <strong>aralıksız en az 1 tam yıl</strong> çalışıldığında doğar. Bu 1 yıllık süre deneme süresi dahil olmak üzere fiilen çalışılan süreyi kapsar. Aynı işverenin farklı işyerlerinde çalışma görevi üstlenildiyse bu süreler birleştirilebilir.</p>
<p>1 yılı doldurmadan işten ayrılan çalışan yasal yıllık izin hakkından yararlanamaz; bununla birlikte işverin kullandırdığı avans izin söz konusuysa o günler ücret kesintisine tabi tutulabilir.</p>

<h2>Yıllık İzin Süreleri (Kıdeme Göre)</h2>
<p>İş Kanunu, çalışma süresine bağlı olarak minimum izin günü belirler:</p>
<ul>
  <li><strong>1 yıldan 5 yıla kadar (5 yıl dahil):</strong> Yılda en az <strong>14 iş günü</strong></li>
  <li><strong>5 yıldan fazla, 15 yıldan az:</strong> Yılda en az <strong>20 iş günü</strong></li>
  <li><strong>15 yıl ve daha fazla:</strong> Yılda en az <strong>26 iş günü</strong></li>
</ul>
<p>Bu süreler yasanın belirlediği asgari sürelerdir. İş sözleşmesi ya da toplu iş sözleşmesiyle daha fazla izin günü tanınabilir; daha azı kararlaştırılamaz.</p>

<h2>Özel Gruplar İçin Yıllık İzin</h2>
<p>Belirli çalışan grupları kıdemlerinden bağımsız olarak daha uzun izin hakkına sahiptir:</p>
<ul>
  <li><strong>18 yaşından küçük çalışanlar:</strong> Kıdemi ne olursa olsun yılda en az <strong>20 iş günü</strong> izin hakkı</li>
  <li><strong>50 yaş ve üstü çalışanlar:</strong> Kıdemi ne olursa olsun yılda en az <strong>20 iş günü</strong> izin hakkı</li>
  <li><strong>Yeraltı işlerinde çalışanlar:</strong> Yukarıdaki her dilime 4 gün eklenerek hesaplanır</li>
</ul>

<h2>Yıllık İzin Nasıl Kullanılır?</h2>
<p>Yıllık izne ilişkin temel kullanım kuralları:</p>
<ul>
  <li>Çalışan yazılı olarak talepte bulunur; işveren onaylar.</li>
  <li>İşveren, işin gerektirdiği şartlara göre izin dönemini belirleyebilir; ancak çalışanın tercihini gözetmek zorundadır.</li>
  <li>İzin <strong>bölünebilir</strong>, ancak en az 10 günlük bir parça tek seferde kullanılmalıdır. Kalan günler 4'erli gruplara ayrılabilir.</li>
  <li>İzin ücreti, izin başlamadan önce çalışana ödenebilir; istek halinde bu zorunludur.</li>
</ul>

<h2>Hafta Tatili ve Resmi Tatiller İzinden Sayılır mı?</h2>
<p>Yıllık izin <strong>iş günü</strong> olarak hesaplanır. Hafta tatilleri (genellikle Pazar) ve resmî tatil günleri izin süresine dahil edilmez. Örneğin Cuma günü başlayan 14 günlük izin; iki hafta sonu (4 gün) geçse de yalnızca 14 iş günü izin hakkından düşülür.</p>

<h2>İzin Ücreti Hesabı</h2>
<p>Kullanılan her izin günü için işveren çalışana <strong>ücret ödemek zorundadır</strong>. İzin ücreti, çalışanın o dönemdeki günlük brüt ücreti üzerinden hesaplanır:</p>
<p><strong>İzin Ücreti = Günlük Brüt Ücret x İzin Günü Sayısı</strong></p>
<p>Günlük brüt ücret, aylık brüt maaşın 30'a bölünmesiyle elde edilir. Fazla mesai, prim veya ikramiye gibi ek ödemeler izin ücretine yansıtılmaz.</p>

<h2>Kullanılmayan Yıllık İzinler</h2>
<p>İş sözleşmesi devam ettiği sürece yıllık izin hakkı para ile satın alınamaz; kullandırılmak zorundadır. Ancak iş sözleşmesi sona erdiğinde:</p>
<ul>
  <li>Kullanılmamış tüm izin günleri için işveren, sözleşme sona erme tarihindeki günlük ücret üzerinden <strong>izin alacağı</strong> öder.</li>
  <li>Bu hak fesih gerekçesinden bağımsızdır; işçinin ya da işverenin feshi fark etmez.</li>
  <li>İzin alacağı, iş sözleşmesi devam ettiği sürece zamanaşımına uğramaz.</li>
</ul>

<h2>Hastalık İzni, Doğum İzni vs. Yıllık İzin</h2>
<p>Hastalık, iş kazası veya doğum izni yıllık izin hakkından düşülmez. Bu izinler tamamen ayrı yasal düzenlemelere tabidir. Doğum izninde geçirilen süre kıdeme eklenir.</p>

<h2>Yıllık İzin ve Kıdem Tazminatı</h2>
<p>Yıllık izinde geçirilen süreler, çalışılmış süre olarak kabul edilir ve kıdeme dahildir. Dolayısıyla izinler hem kıdem tazminatı hesabında hem de bir sonraki yılın izin hakkının belirlenmesinde dikkate alınır. Kıdem tazminatı hesabı için <a href="/kidem-tazminati">Kıdem Tazminatı Hesaplama</a> aracımızı kullanabilirsiniz.</p>

<h2>Yazılı İzin Belgesi Önemi</h2>
<p>İş Kanunu açıkça yazılı izin talebi zorunluluğu getirmese de hem çalışan hem de işveren açısından izin talep-onay belgesi tutmak büyük önem taşır. Bu belgeler, ileride çıkabilecek uyuşmazlıklarda ispat aracı olarak kullanılır. Kullanılmayan izinleri ispat etmek için izin defteri veya dijital bordro kayıtları belirleyici olabilir.</p>

<h2>Sonuç</h2>
<p>Yıllık izin; kıdeme bağlı olarak 14 ila 26 iş günü arasında değişmekte; 18 yaş altı ve 50 yaş üstü çalışanlara ise kıdemsiz en az 20 gün tanınmaktadır. Kullanılmayan izinler hak kaybına yol açmaz ve iş sözleşmesi bitiminde ücret olarak ödenir. Çalışma haklarınız hakkında diğer hesaplamaları yapmak için <a href="/kidem-tazminati">Kıdem Tazminatı Hesaplama</a> veya <a href="/brutten-nete">Brütten Nete Maaş Hesaplama</a> araçlarımızı inceleyebilirsiniz.</p>`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
