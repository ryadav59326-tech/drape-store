import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProduct } from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';
import { ProductDetailSkeleton } from '../components/ui/Skeletons';
import { MOCK_PRODUCTS } from '../services/mockData';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [related, setRelated] = useState([]);

  const images = product
    ? [product.image, product.hoverImage, `https://picsum.photos/seed/det${id}c/500/650`, `https://picsum.photos/seed/det${id}d/500/650`]
    : [];

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setActiveImage(0);
      // ── TODO: replace with productService.getRelated(id)
      setRelated(MOCK_PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) return alert('Please select a size');
    addItem(product, selectedSize, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error || !product) return (
    <div className="text-center py-32">
      <p className="font-display text-2xl text-[var(--warm-gray)]">Product not found</p>
      <Link to="/shop" className="mt-4 inline-block text-sm underline">Back to Shop</Link>
    </div>
  );

  const accordionItems = [
    { title: 'Description', body: product.description },
    { title: 'Size & Fit', body: 'Model is 5\'9" and wears size S. We recommend sizing up for a relaxed fit. See our full size guide for more information.' },
    { title: 'Material & Care', body: '100% Natural Fibres. Machine wash cold, gentle cycle. Lay flat to dry. Do not tumble dry. Iron on low heat if needed.' },
    { title: 'Delivery & Returns', body: 'Free standard delivery on orders over ₹2999. Express delivery available. Free returns within 30 days of delivery.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--warm-gray)] mb-8 flex gap-2">
        <Link to="/" className="hover:text-[var(--charcoal)]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[var(--charcoal)]">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-[var(--charcoal)] capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-[var(--charcoal)]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
        {/* ── Images ─────────────────────────────────────────────────────── */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="hidden sm:flex flex-col gap-2 w-16 flex-shrink-0">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-[3/4] overflow-hidden border-2 transition-colors ${
                  activeImage === i ? 'border-[var(--charcoal)]' : 'border-transparent hover:border-[var(--border)]'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative flex-1 aspect-[3/4] bg-[var(--accent-light)] overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover animate-fadeIn"
              key={activeImage}
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <p className="font-display text-2xl text-[var(--warm-gray)]">Sold Out</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Info ───────────────────────────────────────────────────────── */}
        <div className="lg:pt-4">
          <p className="text-xs tracking-widest uppercase text-[var(--warm-gray)] mb-2 capitalize">{product.category}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24"
                  fill={i < Math.round(product.rating) ? 'var(--accent)' : 'none'}
                  stroke="var(--accent)" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-[var(--warm-gray)]">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-medium">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-[var(--warm-gray)] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-xs bg-[var(--accent)] text-white px-2 py-0.5">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Colours */}
          {product.colors && (
            <div className="mb-5">
              <p className="text-xs tracking-widest uppercase mb-3">Colour</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-[var(--charcoal)] scale-110' : 'border-transparent hover:border-[var(--warm-gray)]'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs tracking-widest uppercase">Size</p>
                <button className="text-xs text-[var(--warm-gray)] underline">Size Guide</button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-3 py-2 text-sm border transition-colors ${
                      selectedSize === size
                        ? 'bg-[var(--charcoal)] text-white border-[var(--charcoal)]'
                        : 'border-[var(--border)] hover:border-[var(--charcoal)]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-[var(--accent)] mt-1.5">Please select a size</p>
              )}
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center border border-[var(--border)]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 hover:bg-[var(--border)] transition-colors">−</button>
              <span className="px-4 py-3 text-sm min-w-[2.5rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-3 hover:bg-[var(--border)] transition-colors">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 py-3 text-sm tracking-widest uppercase transition-colors font-medium ${
                addedToCart
                  ? 'bg-green-700 text-white'
                  : 'bg-[var(--charcoal)] text-white hover:bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {!product.inStock ? 'Sold Out' : addedToCart ? '✓ Added to bag' : 'Add to Bag'}
            </button>
          </div>

          <Link
            to="/cart"
            className="block w-full text-center border border-[var(--charcoal)] py-3 text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] hover:text-white transition-colors mb-8"
          >
            View Bag
          </Link>

          {/* Accordion */}
          <div className="divide-y divide-[var(--border)]">
            {accordionItems.map((item) => (
              <div key={item.title}>
                <button
                  className="w-full flex justify-between items-center py-4 text-sm tracking-wide text-left"
                  onClick={() => setActiveAccordion(activeAccordion === item.title ? null : item.title)}
                >
                  {item.title}
                  <span className="text-lg">{activeAccordion === item.title ? '−' : '+'}</span>
                </button>
                {activeAccordion === item.title && (
                  <p className="text-sm text-[var(--warm-gray)] font-light leading-relaxed pb-4 animate-fadeIn">{item.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Related Products ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[var(--border)]">
          <h2 className="font-display text-3xl font-bold mb-8">You may also <em className="font-normal italic">like</em></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
