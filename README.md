# Fablessi — Premium Bahçe Mobilyaları

İnegöl merkezli **Fablessi** markası için geliştirilen kurumsal web sitesi ve dijital ürün kataloğu. Bahçe ve dış mekan mobilyalarını premium, minimalist bir vitrin deneyimiyle sunar; koleksiyonlar, ürün galerileri, iletişim ve konum bilgilerini tek çatı altında toplar.

**Canlı depo:** [github.com/omerhd34/fablessi](https://github.com/omerhd34/fablessi)

![Fablessi bahçe mobilyası](public/acelya-oturma/antrasit-01.jpg)

---

## Proje Özeti

| Alan | Değer |
|------|-------|
| **Marka** | Fablessi |
| **Sektör** | Bahçe & dış mekan mobilyası |
| **Konum** | İnegöl / Bursa |
| **Site türü** | Kurumsal vitrin + ürün kataloğu |
| **Dil** | Türkçe (varsayılan) · İngilizce |

Site; ürün fotoğrafları, varyant renkleri (Antrasit, Cappuccino, Gri vb.), teknik ölçüler ve marka hikâyesini ziyaretçilere profesyonel bir arayüzle aktarmak için tasarlanmıştır. E-ticaret sepeti yerine **keşif odaklı** bir katalog yaklaşımı benimsenmiştir; WhatsApp ve telefon üzerinden doğrudan iletişim desteklenir.

---

## Öne Çıkan Özellikler

- **Ana sayfa vitrini** — Hero slider, kategori vitrinleri, öne çıkan ürünler carousel, marka deneyimi banner
- **Çok dilli arayüz (i18n)** — Türkçe / İngilizce sözlükler, cookie tabanlı dil seçimi, veritabanı alanlarında `nameEn` / `descriptionEn` desteği
- **Ürün kataloğu** — Kategori ve koleksiyon filtreleri, sıralama, ürün detay sayfaları
- **Ürün mega menüsü** — 6 kategori grubu, 16+ ürün görsel kartlarla hızlı erişim
- **Canlı arama** — Header arama çubuğu, debounce ile `/api/search` üzerinden koleksiyon ve ürün sonuçları
- **Ürün detay** — Varyant seçimi, galeri lightbox, parça bazlı ölçü tablosu, ilgili ürünler
- **Misyon & Vizyon** — Marka değerleri, misyon ve vizyon içeriği
- **SSS (Sıkça Sorulan Sorular)** — Kategorize edilmiş accordion yapısı
- **İletişim sayfası** — Showroom adresi, çalışma saatleri, telefon / WhatsApp / e-posta / Instagram ve gömülü harita
- **İletişim araçları** — Sabit WhatsApp / telefon butonları, footer iletişim alanı
- **Veritabanı destekli katalog** — Koleksiyon → Ürün → Varyant → Görsel hiyerarşisi (Prisma + MySQL)
- **Zengin medya arşivi** — Yüzlerce ürün fotoğrafı ve tanıtım videoları (`public/`)

---

## Ürün Koleksiyonları

Sitede yer alan başlıca ürün grupları:

| Seri | Ürünler |
|------|---------|
| **Açelya** | Oturma grubu — Antrasit, Cappuccino |
| **Aston** | Oturma grubu — Antrasit, Cappuccino |
| **Begonia** | Oturma grubu — Antrasit, Gri · 2'li oturma — Cappuccino |
| **Tesla** | Oturma grubu · Köşe grubu · Masa grubu · Salıncak |
| **Velar** | Oturma grubu · Köşe grubu · Masa grubu · Salıncak · Şezlong |
| **Trend** | Sallanır sandalye |

---

## Sayfa Durumu

| Sayfa | Adres | Durum |
|-------|-------|-------|
| Ana sayfa | `/` | Hazır |
| Ürünler | `/urunler` | Hazır |
| Ürün detay | `/urunler/[slug]` | Hazır |
| Misyon & Vizyon | `/misyon-vizyon` | Hazır |
| SSS | `/sss` | Hazır |
| İletişim | `/iletisim` | Hazır |
| Hakkımızda | `/hakkimizda` | Hazır |
| Projeler | `/projeler` | Planlandı |
| KVKK / Gizlilik / Çerez | `/kvkk`, `/gizlilik-politikasi`, `/cerez-politikasi` | Planlandı |

---

## Teknoloji Altyapısı

| Katman | Teknoloji |
|--------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, React Compiler) |
| UI | React 19, [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), Base UI / Radix UI |
| Veritabanı | MySQL + [Prisma ORM](https://www.prisma.io/) 6 |
| HTTP istemcisi | Axios (dahili API çağrıları) |
| Carousel | Embla Carousel |
| Tablo | TanStack React Table |
| Bildirimler | Sonner |
| İkonlar | React Icons |
| Dil | JavaScript (JSX) |

---

## Proje Yapısı

```
fablessi/
├── app/
│   ├── (routes)/           # Sayfa rotaları
│   │   ├── (anasayfa)/     # Ana sayfa
│   │   ├── iletisim/       # İletişim
│   │   ├── misyon-vizyon/  # Misyon & Vizyon
│   │   ├── sss/            # SSS
│   │   └── urunler/        # Ürün listesi ve detay
│   ├── api/
│   │   ├── locale/         # Dil tercihi (cookie)
│   │   └── search/         # Katalog arama
│   └── styles/             # Global ve layout stilleri
├── components/
│   ├── catalog/            # Ürün kataloğu bileşenleri
│   ├── faq/                # SSS bileşenleri
│   ├── home/               # Ana sayfa bileşenleri
│   ├── layout/             # Header, footer, navigasyon, arama
│   ├── mission/            # Misyon & Vizyon bileşenleri
│   ├── product/            # Ürün detay bileşenleri
│   ├── stores/             # Showroom vitrini
│   └── ui/                 # shadcn/ui primitives
├── contexts/
│   └── locale-provider.jsx # İstemci tarafı i18n bağlamı
├── lib/
│   ├── i18n/               # Sözlükler, navigasyon, çeviri yardımcıları
│   ├── navigation.js       # Menü ve marka sabitleri
│   ├── site-contact.js     # Telefon, e-posta, sosyal medya
│   ├── stores.js           # Showroom ve harita bilgileri
│   ├── axios.js            # API istemci yapılandırması
│   └── queries/            # Veritabanı sorguları
├── prisma/
│   ├── schema.prisma       # Veritabanı şeması
│   └── seed.js             # Koleksiyon ve ürün verisi
└── public/                 # Ürün görselleri ve videolar
```

---

## Kurulum (Geliştiriciler İçin)

### Gereksinimler

- Node.js 20+
- MySQL veritabanı (yerel veya Neon / PlanetScale vb.)

### 1. Depoyu klonlayın

```bash
git clone https://github.com/omerhd34/fablessi.git
cd fablessi
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Ortam değişkenlerini ayarlayın

Proje kökünde `.env` dosyası oluşturun (`.env.example` dosyasını referans alabilirsiniz):

```env
# Veritabanı (zorunlu)
DATABASE_URL="mysql://KULLANICI:SIFRE@localhost:3306/fablessi"

# Dahili API tabanı (Axios — arama vb.)
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"

# Uygulama kök URL (isteğe bağlı)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# İletişim bilgileri (isteğe bağlı — footer ve iletişim bileşenleri)
NEXT_PUBLIC_SITE_PHONE="0XXX XXX XX XX"
NEXT_PUBLIC_SITE_PHONE_HREF="tel:+90XXXXXXXXXX"
NEXT_PUBLIC_SITE_EMAIL="info@fablessi.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="90XXXXXXXXXX"

# Sosyal medya (isteğe bağlı)
NEXT_PUBLIC_INSTAGRAM_URL=""
```

### 4. Veritabanını hazırlayın

```bash
npm run db:push      # Şemayı veritabanına uygular
npm run db:seed      # Koleksiyon ve ürün verisi ekler
```

### 5. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## Kullanılabilir Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Prisma client üretimi + production derlemesi |
| `npm run start` | Production sunucusu |
| `npm run lint` | ESLint kontrolü |
| `npm run db:generate` | Prisma client üretir |
| `npm run db:push` | Prisma şemasını DB'ye uygular |
| `npm run db:migrate` | Geliştirme migrasyonu oluşturur / uygular |
| `npm run db:seed` | Örnek veri yükler |
| `npm run db:studio` | Prisma Studio arayüzü |

---

## Veritabanı Modeli

```
Collection (Koleksiyon)
  └── Product (Ürün)
        ├── Variant (Renk / malzeme varyantı)
        └── Image (Galeri görseli)
```

Her ürün; slug, ad, açıklama, ölçü bilgisi (`dimensions`, `dimensionItems` JSON) ve yayın durumu (`isPublished`) ile yönetilir. Ana sayfa vitrini için `isFeatured` ve `featuredOrder` alanları kullanılır. Koleksiyon, ürün, varyant ve görsel kayıtlarında İngilizce karşılıklar (`nameEn`, `descriptionEn`, `altEn` vb.) tutulur.

---

## Çok Dilli Yapı (i18n)

- Varsayılan dil **Türkçe**; desteklenen diller: `tr`, `en`
- Arayüz metinleri `lib/i18n/dictionaries/` altındaki sözlük dosyalarından yüklenir
- Dil tercihi `fablessi_locale` cookie'si ile saklanır; `POST /api/locale` ile güncellenir
- Sunucu bileşenleri `getServerDictionary()` ile, istemci bileşenleri `useTranslations()` hook'u ile çeviri alır
- Navigasyon ve mega menü `lib/i18n/build-navigation.js` ve `lib/i18n/navigation-data.js` üzerinden oluşturulur

---

## Dağıtım (Deployment)

Proje [Vercel](https://vercel.com), [Railway](https://railway.app) veya herhangi bir Node.js hosting ortamında çalıştırılabilir.

1. Depoyu bağlayın
2. `DATABASE_URL` ve `NEXT_PUBLIC_*` değişkenlerini ortam ayarlarına ekleyin
3. Build komutu: `npm run build`
4. Start komutu: `npm run start`

> Production ortamında MySQL bağlantısı zorunludur. Veritabanı olmadan ana sayfa ve ürün kataloğu boş liste gösterir; statik sayfalar (İletişim, SSS, Misyon & Vizyon) normal çalışır.

---

## Medya Dosyaları

Ürün fotoğrafları `public/` altında kategorilere göre düzenlenmiştir:

- `public/acelya-oturma/`, `public/aston-oturma/`, `public/begonia-oturma/` …

Yeni ürün eklerken görselleri ilgili klasöre koyup `lib/i18n/navigation-data.js` içindeki mega menüye ve `prisma/seed.js` dosyasına referans verilmesi gerekir.

---

## Lisans

Bu proje özel mülkiyettedir. Tüm hakları Fablessi markasına aittir.

---

## İletişim

Proje veya site hakkında sorularınız için geliştirici ekibiyle iletişime geçebilirsiniz.
