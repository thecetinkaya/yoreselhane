import Seo from '../components/Seo'

export default function KvkkPage() {
  return (
    <div>
      <Seo title="KVKK & Gizlilik" description="YöreselHane KVKK & Gizlilik Bilgilendirmesi" />

      <div className="max-w-4xl mx-auto mt-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Kişisel Verilerin Korunmasına İlişkin Bilgilendirme</h1>
          <p className="text-sm text-slate-600 mt-2">Yürürlük: 05 Aralık 2025 — Bu metin bilgilendirme amaçlıdır.</p>
        </header>

        <ol className="list-decimal list-inside space-y-6 text-slate-800">
          <li>
            <h2 className="text-xl font-semibold">Kişisel verilerin toplanmasına ilişkin yöntemler</h2>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Site üzerinden verilen sipariş formları ve hesap kayıtları aracılığıyla (isim, e‑posta, telefon, adres vb.).</li>
              <li>Ödeme ve fatura süreçleri sırasında ödeme sağlayıcılarından gelen bilgiler.</li>
              <li>Müşteri hizmetleri ve destek talepleri sırasında tarafınızca sağlanan bilgiler.</li>
              <li>Teknik/log verileri otomatik olarak toplanır: IP adresi, tarayıcı bilgisi, cihaz ve erişim zamanları.</li>
              <li>Çerezler ve izleme teknolojileri (analiz amaçlı çerezler) — site genelinde otomatik olarak kullanılabilir.</li>
            </ul>
          </li>

          <li>
            <h2 className="text-xl font-semibold">Kişisel verilerin işlenme amaçları</h2>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Siparişlerin alınması, işlenmesi ve teslimatının sağlanması.</li>
              <li>Hesap yönetimi, faturalama ve finansal yükümlülüklerin yerine getirilmesi.</li>
              <li>Müşteri desteği ve kullanıcı taleplerinin yönetilmesi.</li>
              <li>Hizmet kalitesinin iyileştirilmesi, site performansı ve kullanım analizleri.</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi ve hukuki taleplerin değerlendirilmesi.</li>
            </ul>
          </li>

          <li>
            <h2 className="text-xl font-semibold">Kişisel verilerin aktarılabileceği üçüncü taraflar</h2>
            <p className="mt-2 text-slate-700">Verileriniz aşağıdaki türde üçüncü taraflara aktarılabilir:</p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Ödeme sağlayıcıları ve bankalar (ödeme işlemlerinin gerçekleştirilmesi için).</li>
              <li>Barındırma ve altyapı sağlayıcıları (sunucu, yedekleme vb.).</li>
              <li>Analitik ve ölçümleme hizmetleri (ör. Google Analytics) — analiz çerezleri aracılığıyla.</li>
              <li>Yetkili kamu kurumları ve yasal merciler (kanunen istenmesi halinde).</li>
            </ul>
          </li>

          <li>
            <h2 className="text-xl font-semibold">KVKK kapsamında haklarınız</h2>
            <p className="mt-2 text-slate-700">İlgili kişiler olarak aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
              <li>İşlenmişse bilgi talep etme; işlenme amaçlarını öğrenme.</li>
              <li>Verilerin üçüncü kişilere aktarılıp aktarılmadığını öğrenme.</li>
              <li>Eksik/yanlış verilerin düzeltilmesini talep etme.</li>
              <li>Verilerin silinmesini veya yok edilmesini isteme (kanuni saklama yükümlülükleri saklıdır).</li>
              <li>İşlemenin kısıtlanmasını veya itiraz edilmesini talep etme.</li>
              <li>Rıza verilmişse rızayı geri çekme ve rızaya dayalı işlemlere son verilmesini isteme.</li>
            </ul>
          </li>

          <li>
            <h2 className="text-xl font-semibold">Saklama süreleri</h2>
            <p className="mt-2 text-slate-700">Verileriniz, işleme amaçlarına uygun ve ilgili mevzuat kapsamında gerekli sürelerle saklanır. Örnekler:</p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Muhasebe ve fatura kayıtları: mevzuatta öngörülen süre boyunca saklanır.</li>
              <li>Hesap ve sipariş verileri: işlem tamamlanana ve gerektiğinde itiraz/sorun çözümü süresince saklanır.</li>
              <li>Analiz verileri: anonimleştirme/anonim kullanım politikalarına göre tutulur.</li>
            </ul>
          </li>

          <li>
            <h2 className="text-xl font-semibold">Güvenlik tedbirleri</h2>
            <p className="mt-2 text-slate-700">Kişisel verilerin korunması için teknik ve idari tedbirler uygulanmaktadır. Örnekler:</p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Erişim kontrolleri ve yetkilendirme mekanizmaları.</li>
              <li>Sunucu ve veri iletişiminde şifreleme (TLS/HTTPS vb.).</li>
              <li>Düzenli güvenlik değerlendirmeleri ve yedekleme prosedürleri.</li>
            </ul>
          </li>

          <li>
            <h2 className="text-xl font-semibold">Çerez kullanımı</h2>
            <p className="mt-2 text-slate-700">Sitemizde kullanılan çerezlerin genel başlıkları:</p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>Gereksinim duyulan çerezler: site temel işlevleri için gerekli çerezler.</li>
              <li>Analiz çerezleri: site trafiği ve kullanım analizi için (otomatik veya rıza bazlı kullanılabilir).</li>
              <li>Oturum/performans çerezleri: kullanıcı deneyimini geliştirmeye yardımcı olur.</li>
            </ul>
          </li>

          <li>
            <h2 className="text-xl font-semibold">İletişim ve başvuru</h2>
            <p className="mt-2 text-slate-700">KVKK ile ilgili taleplerinizi aşağıdaki iletişim bilgilerine gönderebilirsiniz:</p>
            <ul className="list-disc list-inside mt-2 text-slate-700">
              <li>E-posta: <a className="text-[var(--brand-300)]" href="mailto:destek@yoreselhane.com">destek@yoreselhane.com</a></li>
              <li>Telefon: +90 542 840 75 89</li>
              <li>Adres: [Şirket adresinizi buraya ekleyin]</li>
            </ul>
          </li>
        </ol>

        <p className="mt-8 text-sm text-slate-500">Not: Bu metin bilgilendirme amaçlıdır ve hukuki tavsiye yerine geçmez. Kesin uyumluluk için veri koruma uzmanı veya avukatla görüşünüz.</p>
      </div>
    </div>
  )
}
