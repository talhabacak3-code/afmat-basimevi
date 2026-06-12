# Afmat Basımevi — Tanıtım Web Sitesi

Afyonkarahisar'daki **Afmat Basımevi** kumaş & tekstil baskı merkezi için tek sayfalık,
modern ve mobil uyumlu tanıtım sitesi. Saf HTML/CSS/JS — kurulum veya build gerektirmez.

## Çalıştırma
`index.html` dosyasına çift tıklayın; tarayıcıda açılır. Hepsi bu.

> İpucu: Google Maps haritasının görünmesi için internet bağlantısı gerekir.
> Sitenin geri kalanı çevrimdışı da çalışır.

## Dosya Yapısı
```
afmat/
├── index.html      # Tüm sayfa (navbar, hero, kategoriler, galeri, hakkımızda, iletişim, footer)
├── css/style.css   # Tasarım — renkleri :root içinden değiştirebilirsiniz
├── js/main.js      # Menü, galeri lightbox, harita linki, animasyonlar
├── images/         # Fotoğraflar (bkz. images/README.txt)
└── README.md
```

## Gerçek Fotoğrafları Ekleme
Site şu an şık **yer tutucu** görseller gösterir. Gerçek fotoğrafları
`images/` klasörüne doğru dosya adlarıyla atınca otomatik görünür.
Dosya adları için: [images/README.txt](images/README.txt).

Fotoğraflar: https://www.instagram.com/afmat_basimevi/

## İçerik / Bağlantılar
- **Telefon:** 0546 633 39 93
- **WhatsApp:** otomatik `wa.me/905466333993` (her butonda + sağ alt sabit ikon)
- **Konum:** İletişim bölümündeki adres kartına tıklayınca Google Maps açılır
- **Mağazalar:** Trendyol & Hepsiburada ikonları doğru mağazalara yönlendirir
- **Instagram:** profil bağlantısı

## Düzenleme İpuçları
- **Renk teması:** `css/style.css` → `:root` içindeki `--c1..--c4` değişkenleri.
- **Kategori ekle/çıkar:** `index.html` → `#kategoriler` bölümündeki `<article class="cat-card">` bloklarını kopyalayın/silin.
- **Galeri sayısı:** `index.html` → `#gallery` içindeki `.g-item` butonlarını ekleyin/çıkarın (dosya adlarıyla eşleşmeli).
- **Adres değişirse:** `js/main.js` içindeki `ADRES` değişkenini ve `index.html`'deki harita `iframe` `src`'sini güncelleyin.
