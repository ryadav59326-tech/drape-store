import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeletons';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS } from '../services/mockData';

// ── TODO: Replace mock imports with API hooks when backend is ready ──────────
// import { productService } from '../services/api';

const HERO = {
  title: ['New', 'Season'],
  sub: 'S/S 2025 Collection',
  desc: 'Effortless pieces crafted from the finest natural fibres.',
  image: 'https://picsum.photos/seed/herodrape/1400/800',
};

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ── TODO: replace with productService.getFeatured() and productService.getNewArrivals()
    const load = async () => {
      await new Promise((r) => setTimeout(r, 700));
      setFeatured(MOCK_PRODUCTS.slice(0, 4));
      setNewArrivals(MOCK_PRODUCTS.filter((p) => p.isNew).slice(0, 4));
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden px-4">
        <img
          src={HERO.image}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[8s] hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--charcoal)]/70 via-[var(--charcoal)]/30 to-transparent" />

        <div className="relative h-full flex items-end pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="opacity-0 animate-fadeUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <p className="text-[var(--accent-light)] text-xs tracking-[0.3em] uppercase mb-4">{HERO.sub}</p>
            <h1 className="font-display text-6xl sm:text-8xl font-bold text-white leading-[0.9] mb-6">
              {HERO.title[0]}<br />
              <em className="font-normal italic">{HERO.title[1]}</em>
            </h1>
            <p className="text-white/70 mb-8 max-w-xs text-sm font-light leading-relaxed">{HERO.desc}</p>
            <div className="flex gap-4">
              <Link
                to="/shop"
                className="bg-white text-[var(--charcoal)] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[var(--accent)] hover:text-white transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/shop?category=new-in"
                className="border border-white text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors"
              >
                New In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <div className="bg-[var(--charcoal)] text-[var(--cream)] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MOCK_BRANDS, ...MOCK_BRANDS].map((brand, i) => (
            <span key={i} className="mx-8 text-xs tracking-[0.3em] uppercase font-light opacity-60">
              {brand} &nbsp;·
            </span>
          ))}
        </div>
      </div>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-4xl font-bold">Shop by<br /><em className="font-normal italic">category</em></h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {MOCK_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group relative aspect-square overflow-hidden bg-[var(--accent-light)] opacity-0 animate-fadeUp"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'forwards' }}
            >
              <img
                src={`https://picsum.photos/seed/cat${cat.id}/400/400`}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[var(--charcoal)]/30 group-hover:bg-[var(--charcoal)]/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-white font-display text-lg font-semibold">{cat.name}</p>
                <p className="text-white/60 text-xs mt-1">{cat.count} pieces</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-4xl font-bold">Editor's<br /><em className="font-normal italic">picks</em></h2>
          <Link to="/shop" className="text-xs tracking-widest uppercase underline underline-offset-4 hover:text-[var(--accent)] transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ── Banner ──────────────────────────────────────────────────────── */}
      <section className="relative h-80 overflow-hidden mx-4 sm:mx-8 lg:mx-16 mb-20">
        <img src="https://picsum.photos/seed/banner/1200/500" alt="banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--charcoal)]/50 flex items-center justify-center flex-col text-center">
          <p className="text-[var(--accent-light)] text-xs tracking-[0.3em] uppercase mb-3">Limited time</p>
          <h3 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">Up to 40% off<br /><em>Sale Items</em></h3>
          <Link
            to="/shop?category=sale"
            className="border border-white text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-[var(--charcoal)] transition-colors"
          >
            Shop Sale
          </Link>
        </div>
      </section>

      {/* ── New Arrivals ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-4xl font-bold">Just<br /><em className="font-normal italic">arrived</em></h2>
          <Link to="/shop?category=new-in" className="text-xs tracking-widest uppercase underline underline-offset-4 hover:text-[var(--accent)] transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="bg-[var(--accent-light)] py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            { icon: '✦', title: 'Natural Fibres', desc: 'Linen, cotton, silk and cashmere sourced responsibly' },
            { icon: '◈', title: 'Slow Fashion', desc: 'Considered production, crafted to last seasons' },
            { icon: '◎', title: 'Free Returns', desc: 'Easy 30-day returns, no questions asked' },
          ].map((v) => (
            <div key={v.title}>
              <p className="text-[var(--accent)] text-2xl mb-3">{v.icon}</p>
              <h4 className="font-display text-lg font-semibold mb-2">{v.title}</h4>
              <p className="text-sm text-[var(--warm-gray)] font-light">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
