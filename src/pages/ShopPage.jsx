import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { ProductGridSkeleton } from '../components/ui/Skeletons';
import { useProducts } from '../hooks/useProducts';
import { MOCK_CATEGORIES } from '../services/mockData';

const SORT_OPTIONS = [
  { label: 'Featured', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceMax, setPriceMax] = useState(500);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  const { products, loading, error, totalCount } = useProducts({ category, search, sort });

  const updateParam = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Header ── */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-[var(--warm-gray)] mb-1">
          {search ? `Results for "${search}"` : category ? MOCK_CATEGORIES.find(c => c.slug === category)?.name || 'Shop' : 'All Collections'}
        </p>
        <h1 className="font-display text-4xl font-bold">
          {search ? 'Search' : category ? (MOCK_CATEGORIES.find(c => c.slug === category)?.name || 'Shop') : 'Everything'}
        </h1>
      </div>

      {/* ── Category Pills ── */}
      <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => updateParam('category', '')}
          className={`px-4 py-1.5 text-xs tracking-wide border rounded-full whitespace-nowrap transition-colors ${
            !category ? 'bg-[var(--charcoal)] text-white border-[var(--charcoal)]' : 'border-[var(--border)] hover:border-[var(--charcoal)]'
          }`}
        >
          All
        </button>
        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateParam('category', cat.slug)}
            className={`px-4 py-1.5 text-xs tracking-wide border rounded-full whitespace-nowrap transition-colors ${
              category === cat.slug ? 'bg-[var(--charcoal)] text-white border-[var(--charcoal)]' : 'border-[var(--border)] hover:border-[var(--charcoal)]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between border-y border-[var(--border)] py-3 mb-8">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 text-sm hover:text-[var(--accent)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="8" y2="18" />
          </svg>
          Filters
        </button>
        <p className="text-xs text-[var(--warm-gray)]">{loading ? '—' : `${totalCount} pieces`}</p>
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="text-sm bg-transparent border-none focus:outline-none cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-8">
        {/* ── Sidebar filters ── */}
        {filterOpen && (
          <aside className="hidden lg:block w-52 flex-shrink-0 animate-fadeIn">
            <div className="sticky top-24 space-y-8">
              {/* Price filter */}
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-4">Price</h4>
                <input
                  type="range" min={0} max={500} step={10}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[var(--warm-gray)] mt-1">
                  <span>₹0</span>
                  <span>up to ₹{(priceMax * 300).toLocaleString('en-IN')}</span>
                </div>
              </div>
              {/* Colour */}
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-4">Colour</h4>
                <div className="flex flex-wrap gap-2">
                  {['#1C1C1E', '#8A8480', '#C4956A', '#E8D5BF', '#FFFFFF', '#2D5A4A', '#8B3A3A'].map((c) => (
                    <button
                      key={c}
                      className="w-6 h-6 rounded-full border-2 border-[var(--border)] hover:border-[var(--charcoal)] transition-colors"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              {/* Size */}
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-4">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button key={size} className="px-2 py-1 text-xs border border-[var(--border)] hover:border-[var(--charcoal)] transition-colors">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* ── Product Grid ── */}
        <div className="flex-1">
          {error && (
            <div className="text-center py-20">
              <p className="text-[var(--warm-gray)]">Failed to load products. Please try again.</p>
            </div>
          )}
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-[var(--warm-gray)]">No pieces found</p>
              <p className="text-sm mt-2 text-[var(--warm-gray)]">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-fadeUp"
                  style={{ animationDelay: `${(i % 8) * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* ── TODO: pagination / infinite scroll ── */}
          {!loading && products.length > 0 && (
            <div className="text-center mt-16">
              <button className="border border-[var(--charcoal)] px-10 py-3 text-xs tracking-widest uppercase hover:bg-[var(--charcoal)] hover:text-white transition-colors">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
