import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  const shipping = totalPrice > 2999 ? 0 : 199;
  const total = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-6 opacity-20">◻</div>
        <h2 className="font-display text-3xl font-bold mb-2">Your bag is empty</h2>
        <p className="text-[var(--warm-gray)] text-sm mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/shop"
          className="bg-[var(--charcoal)] text-white px-10 py-3 text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-4xl font-bold mb-2">Your Bag</h1>
      <p className="text-[var(--warm-gray)] text-sm mb-10">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ── Cart Items ── */}
        <div className="lg:col-span-2 space-y-0 divide-y divide-[var(--border)]">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-5 py-6 animate-fadeIn">
              {/* Image */}
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <div className="w-24 sm:w-32 aspect-[3/4] bg-[var(--accent-light)] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[var(--warm-gray)] mb-1 capitalize">{item.category}</p>
                    <Link to={`/product/${item.id}`} className="font-medium text-sm hover:text-[var(--accent)] transition-colors">{item.name}</Link>
                  </div>
                  <p className="text-sm font-medium flex-shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>

                <p className="text-xs text-[var(--warm-gray)] mt-2">Size: {item.size}</p>

                {/* Qty controls */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-[var(--border)]">
                    <button
                      onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.size, item.quantity - 1) : removeItem(item.id, item.size)}
                      className="px-2.5 py-1.5 text-sm hover:bg-[var(--border)] transition-colors"
                    >−</button>
                    <span className="px-3 py-1.5 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-sm hover:bg-[var(--border)] transition-colors"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-xs text-[var(--warm-gray)] hover:text-red-500 transition-colors underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-between items-center">
            <Link to="/shop" className="text-xs tracking-widest uppercase underline hover:text-[var(--accent)] transition-colors">
              ← Continue Shopping
            </Link>
            <button onClick={clearCart} className="text-xs text-[var(--warm-gray)] hover:text-red-500 transition-colors underline">
              Clear Bag
            </button>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[var(--border)] p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-[var(--warm-gray)]">Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--warm-gray)]">Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-[var(--warm-gray)]">Add ₹{(2999 - totalPrice).toLocaleString('en-IN')} more for free shipping</p>
              )}
            </div>

            <div className="border-t border-[var(--border)] pt-4 mb-6">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Promo code */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--charcoal)] transition-colors"
              />
              <button className="border border-[var(--charcoal)] px-4 py-2 text-xs hover:bg-[var(--charcoal)] hover:text-white transition-colors">
                Apply
              </button>
            </div>

            {/* ── TODO: hook up to payment/checkout API ── */}
            <Link
              to="/checkout"
              className="block w-full bg-[var(--charcoal)] text-white text-center py-3.5 text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors"
            >
              Proceed to Checkout
            </Link>

            <div className="flex items-center justify-center gap-3 mt-4 text-xs text-[var(--warm-gray)]">
              {['🔒', '💳', '↩️'].map((icon, i) => (
                <span key={i} className="flex items-center gap-1">
                  {icon} {['Secure', 'Cards', 'Returns'][i]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
