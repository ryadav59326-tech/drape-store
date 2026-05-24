// Mock data — used as fallback while API is not integrated
// Replace with real API calls via productService, categoryService, etc.

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Women', slug: 'women', count: 120 },
  { id: 2, name: 'Men', slug: 'men', count: 85 },
  { id: 3, name: 'Accessories', slug: 'accessories', count: 40 },
  { id: 4, name: 'New In', slug: 'new-in', count: 25 },
  { id: 5, name: 'Sale', slug: 'sale', count: 60 },
];

export const MOCK_PRODUCTS = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  name: [
    'Linen Wrap Dress',
    'Oversized Cotton Blazer',
    'Silk Slip Skirt',
    'Tailored Trousers',
    'Cashmere Knit Top',
    'Wide-Leg Linen Pants',
    'Structured Tote Bag',
    'Ribbed Midi Dress',
    'Relaxed Linen Shirt',
    'Pleated Midi Skirt',
    'Merino Wool Sweater',
    'Cropped Blazer',
    'Slip Dress',
    'High-Waist Jeans',
    'Knitwear Cardigan',
    'Flowy Maxi Dress',
  ][i],
  price: [89, 145, 79, 119, 95, 105, 135, 88, 72, 98, 125, 140, 82, 110, 92, 115][i],
  originalPrice: i % 3 === 0 ? [120, 180, 100, 150, 120, 130, null, 110, 90, 125, null, 170, 100, 140, 115, 145][i] : null,
  category: ['women', 'women', 'women', 'men', 'women', 'men', 'accessories', 'women', 'men', 'women', 'men', 'women', 'women', 'men', 'women', 'women'][i],
  image: `https://picsum.photos/seed/cloth${i + 1}/500/650`,
  hoverImage: `https://picsum.photos/seed/cloth${i + 10}/500/650`,
  isNew: i < 4,
  isSale: i % 3 === 0,
  rating: 3.5 + Math.random() * 1.5,
  reviewCount: Math.floor(Math.random() * 120) + 5,
  colors: ['#1C1C1E', '#8A8480', '#C4956A', '#E8D5BF'].slice(0, Math.floor(Math.random() * 3) + 2),
  sizes: ['XS', 'S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 3) + 3),
  description: 'A beautifully crafted piece made from premium natural fibers. Designed for effortless style and everyday comfort.',
  inStock: i !== 7,
}));

export const MOCK_HERO_SLIDES = [
  {
    id: 1,
    title: 'New Season',
    subtitle: 'Summer Collection',
    description: 'Effortless pieces designed for the way you live.',
    cta: 'Discover Now',
    image: 'https://picsum.photos/seed/hero1/1200/700',
    link: '/shop',
  },
  {
    id: 2,
    title: 'Made to Last',
    subtitle: 'Timeless Essentials',
    description: 'Quality fabrics, considered cuts, enduring style.',
    cta: 'Shop Essentials',
    image: 'https://picsum.photos/seed/hero2/1200/700',
    link: '/shop?category=essentials',
  },
];

export const MOCK_BRANDS = ['LINEN CO.', 'MAISON', 'STITCH', 'ATELIER', 'BLOOM', 'WOVEN', 'FIBRE'];
