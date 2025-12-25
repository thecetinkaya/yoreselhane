import type { Product } from './slices/productsSlice'
import beypazari from './images/beypazari.png'
import bal from './images/bal.png'
import ceviz from './images/ceviz.png'
import pekmez from './images/pekmez.png'
import yesilzeytin from './images/yesilzeytin.png'
import koyunpeyniri from './images/koyunpeyniri.png'

export const mockProducts: Product[] = [
	{
		id: '1',
		title: 'Ezine Koyun Peyniri 600g',
		slug: 'ezine-koyun-peyniri-600g',
		price: 349.9,
		image: koyunpeyniri,
		category: 'peynir',
		description: 'Marmara bölgesinden, tam yağlı koyun sütünden üretilmiş Ezine peyniri.',
		weightOptions: [{ label: '300 gr', multiplier: 0.5 }, { label: '600 gr', multiplier: 1.0 }],
		badges: ['Popüler'],
		tags: ['ezine peyniri', 'koyun peyniri', 'tam yağlı peynir', 'yöresel peynir', 'doğal peynir', 'kahvaltılık', 'şarküteri', 'ezine peyniri fiyatı', 'hakiki ezine peyniri', 'çanakkale ezine', 'sert peynir', 'peynir çeşitleri', 'organik peynir', 'katkısız peynir'],
		gtin13: '8680000000001',
		aggregateRating: { ratingValue: 4.7, reviewCount: 24 }
	},
	{
		id: '2',
		title: 'Ceviz içi 1000g',
		slug: 'ceviz-ici-1000g',
		price: 320.0,
		image: ceviz,
		category: 'ceviz',
		description: 'Üstün kalite ceviz içi.',
		weightOptions: [{ label: '500 gr', multiplier: 0.5 }, { label: '1000 gr', multiplier: 1.0 }],
		tags: ['ceviz içi', 'yerli ceviz', 'doğal ceviz', 'kabuksuz ceviz', 'ceviz fiyatları', 'taze ceviz', 'kuruyemiş', 'sağlıklı atıştırmalık', 'omega 3 kaynağı', 'yöresel ürünler', 'organik ceviz', 'katkısız gıda', 'ceviz satın al'],
		gtin13: '8680000000002'
	},
	{
		id: '3',
		title: 'Beypazarı Kurusu',
		slug: 'beypazari-kurusu-1kg',
		price: 350.0,
		image: beypazari,
		category: 'kahvaltilik', // Kategori kahvaltilik olarak değiştirildi
		description: 'Ankara Beypazarı\'ndan meşhur, tereyağlı ve lezzetli kurusu.',
		weightOptions: [{ label: '500 gr', multiplier: 0.5 }, { label: '1000 gr', multiplier: 1.0 }],
		tags: ['beypazarı kurusu', 'ankara beypazarı', 'yöresel kurabiye', 'tereyağlı kuru', 'çay saati', 'geleneksel lezzetler', 'beypazarı kurusu fiyatı', 'taze kuru', 'fırın ürünleri', 'doğal atıştırmalık', 'katkısız kuru', 'meşhur beypazarı kurusu'],
		gtin13: '8680000000003'
	},
	{
		id: '4',
		title: 'Üzüm Pekmezi 1000g',
		slug: 'uzum-pekmezi-1000g',
		price: 199.9,
		image: pekmez,
		category: 'pekmez',
		description: 'Doğal süzme pekmez.',
		tags: ['üzüm pekmezi', 'doğal pekmez', 'şekersiz pekmez', 'organik pekmez', 'ev yapımı pekmez', 'pekmez fiyatı', 'yöresel pekmez', 'şifalı pekmez', 'katkısız pekmez', 'hakiki pekmez', 'pekmez satın al', 'kan yapıcı', 'enerji deposu', 'geleneksel pekmez'],
		gtin13: '8680000000004'
	},
	{
		id: '6',
		title: 'Yeşil Kırma Zeytin 1kg',
		slug: 'yesil-kirma-zeytin-1kg',
		price: 189.9,
		image: yesilzeytin,
		category: 'zeytin',
		description: 'Ege’den hafif tuzlu, limonlu salamurada kırma zeytin.',
		weightOptions: [{ label: '500 gr', multiplier: 0.5 }, { label: '1000 gr', multiplier: 1.0 }],
		tags: ['kırma zeytin', 'yeşil zeytin', 'ege zeytini', 'doğal zeytin', 'ev yapımı zeytin', 'salamura zeytin', 'kahvaltılık zeytin', 'zeytin fiyatları', 'katkısız zeytin', 'yöresel zeytin', 'hatay zeytini', 'edremit zeytini', 'organik zeytin'],
		gtin13: '8680000000006'
	},
	{
		id: '7',
		title: 'Hakiki Sivas Yayla Petek Balı',
		slug: 'sivas-yayla-petek-bali-1000g',
		price: 2250.0,
		image: bal,
		category: 'bal',
		description: 'Doğal çiçek balı, sivas yaylalarında üretilmiştir.',
		tags: ['sivas balı', 'petek bal', 'yayla balı', 'çiçek balı', 'doğal bal', 'hakiki bal', 'şeker ilavesiz bal', 'organik bal', 'bal fiyatları', 'şifalı bal', 'kahvaltılık bal', 'yöresel bal', 'katkısız bal', 'sivas yayla balı', 'kovan balı'],
		badges: ['Yeni'],
		gtin13: '8680000000007',
		aggregateRating: { ratingValue: 4.4, reviewCount: 8 }
	},
]
