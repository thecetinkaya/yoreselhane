-- Supabase Seed Data (Örnek Veriler)

-- 1. KATEGORİLERİ EKLE
INSERT INTO public.categories (id, name, slug, description, display_order) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Bal & Arı Ürünleri', 'bal', 'Doğal yayla balları, petek bal ve arı ürünleri.', 1),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Peynir Çeşitleri', 'peynir', 'Yöresel peynirler, ezine, tulum ve kaşar çeşitleri.', 2),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Zeytin & Zeytinyağı', 'zeytin', 'Ege ve Marmara bölgesinden doğal zeytinler.', 3),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Kahvaltılık', 'kahvaltilik', 'Reçel, helva, ezme ve diğer kahvaltılıklar.', 4),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Kuruyemiş & Kuru Meyve', 'kuruyemis', 'Taze ceviz, fındık ve kuru meyveler.', 5),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Pekmez & Tahin', 'pekmez', 'Doğal üzüm, dut pekmezleri ve tahin.', 6);

-- 2. ÜRÜNLERİ EKLE
INSERT INTO public.products (id, title, slug, description, price, category_id, stock_quantity, badges, tags, weight_g, is_featured) VALUES
-- 1. Bal
(
  '11111111-1111-1111-1111-111111111111',
  'Hakiki Sivas Yayla Petek Balı',
  'sivas-yayla-petek-bali-1000g',
  'Doğal çiçek balı, Sivas yaylalarında üretilmiştir. Katkısız ve %100 doğaldır.',
  2250.00,
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', -- Bal Kategorisi
  50,
  ARRAY['Yeni', 'Popüler'],
  ARRAY['sivas balı', 'petek bal', 'yayla balı', 'çiçek balı', 'doğal bal'],
  1000,
  true
),
-- 2. Peynir
(
  '22222222-2222-2222-2222-222222222222',
  'Ezine Koyun Peyniri 600g',
  'ezine-koyun-peyniri-600g',
  'Marmara bölgesinden, tam yağlı koyun sütünden üretilmiş coğrafi işaretli Ezine peyniri.',
  349.90,
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', -- Peynir Kategorisi
  100,
  ARRAY['Popüler'],
  ARRAY['ezine peyniri', 'koyun peyniri', 'tam yağlı', 'kahvaltılık'],
  600,
  true
),
-- 3. Zeytin
(
  '33333333-3333-3333-3333-333333333333',
  'Yeşil Kırma Zeytin 1kg',
  'yesil-kirma-zeytin-1kg',
  'Ege’den hafif tuzlu, limonlu salamurada kırma zeytin. Ev yapımı tadında.',
  189.90,
  'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', -- Zeytin Kategorisi
  200,
  NULL,
  ARRAY['kırma zeytin', 'yeşil zeytin', 'ege zeytini', 'salamura'],
  1000,
  false
),
-- 4. Ceviz
(
  '44444444-4444-4444-4444-444444444444',
  'Yerli Ceviz İçi 1000g',
  'ceviz-ici-1000g',
  'Üstün kalite, ince kabuklu yerli ceviz içi. Taze kırılmış.',
  320.00,
  'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', -- Kuruyemiş Kategorisi
  80,
  NULL,
  ARRAY['ceviz içi', 'yerli ceviz', 'kuruyemiş', 'omega 3'],
  1000,
  false
),
-- 5. Beypazarı Kurusu
(
  '55555555-5555-5555-5555-555555555555',
  'Beypazarı Kurusu',
  'beypazari-kurusu-1kg',
  'Ankara Beypazarı''ndan meşhur, tereyağlı ve lezzetli kurusu. Çay saatlerinin vazgeçilmezi.',
  350.00,
  'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', -- Kahvaltılık Kategorisi
  150,
  ARRAY['Yöresel'],
  ARRAY['beypazarı kurusu', 'kurabiye', 'atıştırmalık', 'yöresel'],
  1000,
  true
),
-- 6. Pekmez
(
  '66666666-6666-6666-6666-666666666666',
  'Doğal Üzüm Pekmezi 1000g',
  'uzum-pekmezi-1000g',
  'Geleneksel yöntemlerle odun ateşinde kaynatılmış doğal üzüm pekmezi.',
  199.90,
  'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', -- Pekmez Kategorisi
  60,
  NULL,
  ARRAY['üzüm pekmezi', 'doğal pekmez', 'kan yapıcı', 'enerji'],
  1000,
  false
);

-- 3. ÜRÜN RESİMLERİNİ EKLE (Supabase Storage URL'leri veya yerel pathler)
-- Not: Gerçek bir senaryoda bu URL'ler Supabase Storage'a yüklenen resimlerin public URL'leri olmalıdır.
-- Şimdilik projedeki yerel path yapısını simüle ediyoruz veya placeholder kullanıyoruz.
INSERT INTO public.product_images (product_id, url, is_primary, display_order) VALUES
('11111111-1111-1111-1111-111111111111', '/images/bal.png', true, 1),
('22222222-2222-2222-2222-222222222222', '/images/koyunpeyniri.png', true, 1),
('33333333-3333-3333-3333-333333333333', '/images/yesilzeytin.png', true, 1),
('44444444-4444-4444-4444-444444444444', '/images/ceviz.png', true, 1),
('55555555-5555-5555-5555-555555555555', '/images/beypazari.png', true, 1),
('66666666-6666-6666-6666-666666666666', '/images/pekmez.png', true, 1);

-- 4. ÜRÜN VARYANTLARINI EKLE (Gramaj Seçenekleri)
INSERT INTO public.product_variants (product_id, name, price_adjustment, stock_quantity) VALUES
-- Peynir Varyantları
('22222222-2222-2222-2222-222222222222', '600 gr', 0, 100),
('22222222-2222-2222-2222-222222222222', '300 gr', -175.00, 50), -- Yarım fiyat (yaklaşık)

-- Zeytin Varyantları
('33333333-3333-3333-3333-333333333333', '1000 gr', 0, 200),
('33333333-3333-3333-3333-333333333333', '500 gr', -95.00, 100),

-- Ceviz Varyantları
('44444444-4444-4444-4444-444444444444', '1000 gr', 0, 80),
('44444444-4444-4444-4444-444444444444', '500 gr', -160.00, 40);

-- 5. İÇERİK BLOKLARI (Slider vb.)
INSERT INTO public.content_blocks (key, type, title, content) VALUES
(
  'home_hero_slider',
  'slider',
  'Ana Sayfa Slider',
  '[
    {
      "image": "/images/slider1.jpg",
      "title": "Doğal Lezzetler Kapınızda",
      "subtitle": "Yöreselhane ile Türkiye''nin en seçkin lezzetlerini keşfedin.",
      "buttonText": "Alışverişe Başla",
      "link": "/tum-urunler"
    },
    {
      "image": "/images/slider2.jpg",
      "title": "Hakiki Karakovan Balı",
      "subtitle": "Sivas yaylalarından sofranıza gelen şifa kaynağı.",
      "buttonText": "İncele",
      "link": "/kategori/bal"
    }
  ]'::jsonb
);
