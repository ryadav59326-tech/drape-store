import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    const size = selectedSize || product.sizes?.[1] || 'M';
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[var(--accent-light)] aspect-[3/4] mb-3">
        <img
          src={hovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="product-img w-full h-full object-cover transition-transform duration-700"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-[var(--charcoal)] text-[var(--cream)] text-[10px] tracking-widest uppercase px-2 py-1">
              New
            </span>
          )}
          {discount && (
            <span className="bg-[var(--accent)] text-white text-[10px] tracking-widest uppercase px-2 py-1">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-[var(--warm-gray)] text-white text-[10px] tracking-widest uppercase px-2 py-1">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick add overlay */}
        <div className="product-overlay absolute bottom-0 left-0 right-0 bg-white/95 opacity-0 transition-opacity duration-300 p-3">
          {product.sizes && (
            <div className="flex gap-2 justify-center mb-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                  className={`text-xs px-2 py-1 border transition-colors ${
                    selectedSize === size
                      ? 'border-[var(--charcoal)] bg-[var(--charcoal)] text-white'
                      : 'border-[var(--border)] hover:border-[var(--charcoal)]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="w-full bg-[var(--charcoal)] text-[var(--cream)] text-xs tracking-widest uppercase py-2 hover:bg-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {added ? '✓ Added' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="text-[10px] tracking-widest uppercase text-[var(--warm-gray)] mb-1">{product.category}</p>
        <h3 className="text-sm font-medium text-[var(--charcoal)] line-clamp-2 mb-1.5">{product.name}</h3>

        {/* Colors */}
        {product.colors && (
          <div className="flex gap-1.5 mb-2">
            {product.colors.map((color) => (
              <span
                key={color}
                className="w-3 h-3 rounded-full border border-white ring-1 ring-[var(--border)]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--charcoal)]">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-xs text-[var(--warm-gray)] line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
