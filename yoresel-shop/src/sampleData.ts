import type { Product } from './slices/productsSlice'
import beypazari from './images/beypazari.png'
import bal from './images/bal.png'
import ceviz from './images/ceviz.png'
import findik from './images/findik.png'
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
		badges: ['Popüler'],
		gtin13: '8680000000001',
		aggregateRating: { ratingValue: 4.7, reviewCount: 24 }
	},
	{
		id: '2',
		title: 'Ceviz içi 1000g',
		slug: 'ceviz-ici-1000g',
		price: 289.5,
		image: ceviz,
		category: 'ceviz',
		description: 'Üstün kalite ceviz içi.',
		gtin13: '8680000000002'
	},
	{
		id: '3',
		title: 'Beypazarı Kuru 1kg',
		slug: 'beypazari-kuru-1kg',
		price: 229.0,
		image: beypazari,
		category: 'kahvaltilik', // Kategori kahvaltilik olarak değiştirildi
		description: 'Ankara Beypazarı\'ndan meşhur, tereyağlı ve lezzetli kurusu.',
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
		gtin13: '8680000000004'
	},
	{
		id: '5',
		title: 'Giresun Fındığı 1000g',
		slug: 'giresun-findigi-1000g',
		price: 379.0,
		image: findik,
		category: 'findik',
		description: 'Giresun yöresine özgü, zengin lezzetli fındık.',
		gtin13: '8680000000005'
	},
	{
		id: '6',
		title: 'Yeşil Kırma Zeytin 1kg',
		slug: 'yesil-kirma-zeytin-1kg',
		price: 189.9,
		image: yesilzeytin,
		category: 'zeytin',
		description: 'Ege’den hafif tuzlu, limonlu salamurada kırma zeytin.',
		gtin13: '8680000000006'
	},
	{
		id: '7',
		title: 'Sivas Yayla Balı 1000g',
		slug: 'sivas-yayla-bali-1000g',
		price: 209.9,
		image: bal,
		category: 'bal',
		description: 'Doğal çiçek balı, sivas yaylalarında üretilmiştir.',
		badges: ['Yeni'],
		gtin13: '8680000000007',
		aggregateRating: { ratingValue: 4.4, reviewCount: 8 }
	},
]
