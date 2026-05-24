import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// ── TODO: import orderService when backend is ready
// import { orderService } from '../services/api';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '', country: 'India',
    cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
  });

  const shipping = totalPrice > 2999 ? 0 : 199;
  const total = totalPrice + shipping;

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      // ── TODO: Replace with real order API call ───────────────────────────
      // const order = await orderService.create({ items, shippingAddress: form, total });
      // navigate(`/order-confirmation/${order.id}`);
      // ────────────────────────────────────────────────────────────────────
      await new Promise((r) => setTimeout(r, 1500)); // Simulate API
      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="font-display text-2xl mb-4">Your bag is empty</p>
        <Link to="/shop" className="text-sm underline hover:text-[var(--accent)]">Continue Shopping</Link>
      </div>
    );
  }

  const inputClass = 'w-full border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--charcoal)] transition-colors bg-white';
  const labelClass = 'block text-xs tracking-wide uppercase text-[var(--warm-gray)] mb-1.5';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <Link to="/" className="font-display text-2xl font-bold tracking-tight">DRAPE</Link>

      {/* Steps */}
      <div className="flex items-center gap-4 mt-8 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-4">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 text-sm ${i <= step ? 'text-[var(--charcoal)]' : 'text-[var(--warm-gray)]'} ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                i < step ? 'bg-[var(--accent)] border-[var(--accent)] text-white' :
                i === step ? 'border-[var(--charcoal)]' :
                'border-[var(--border)] text-[var(--warm-gray)]'
              }`}>
                {i < step ? '✓' : i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < STEPS.length - 1 && <div className="w-8 h-px bg-[var(--border)]" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Form ── */}
        <div className="lg:col-span-2">
          {/* Step 0: Shipping */}
          {step === 0 && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="font-display text-2xl font-bold mb-6">Shipping Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input className={inputClass} value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="Aarav" />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input className={inputClass} value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Singh" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input className={inputClass} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input className={inputClass} type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <input className={inputClass} value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="123, Park Street, Flat 4B" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input className={inputClass} value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Mumbai" />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input className={inputClass} value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="Maharashtra" />
                </div>
                <div>
                  <label className={labelClass}>PIN Code</label>
                  <input className={inputClass} value={form.pincode} onChange={(e) => update('pincode', e.target.value)} placeholder="400001" />
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="w-full bg-[var(--charcoal)] text-white py-3.5 text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors mt-4"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="font-display text-2xl font-bold mb-6">Payment</h2>
              {/* ── TODO: Integrate payment gateway (Razorpay / Stripe) here ── */}
              <div className="border border-[var(--border)] p-4 bg-[var(--accent-light)] text-sm text-[var(--warm-gray)] mb-4">
                🔒 Payments are encrypted and secure. Integrate Razorpay or Stripe here.
              </div>
              <div>
                <label className={labelClass}>Name on Card</label>
                <input className={inputClass} value={form.nameOnCard} onChange={(e) => update('nameOnCard', e.target.value)} placeholder="Aarav Singh" />
              </div>
              <div>
                <label className={labelClass}>Card Number</label>
                <input className={inputClass} value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Expiry</label>
                  <input className={inputClass} value={form.expiry} onChange={(e) => update('expiry', e.target.value)} placeholder="MM / YY" />
                </div>
                <div>
                  <label className={labelClass}>CVV</label>
                  <input className={inputClass} value={form.cvv} onChange={(e) => update('cvv', e.target.value)} placeholder="•••" maxLength={4} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="flex-1 border border-[var(--charcoal)] py-3.5 text-xs tracking-widest uppercase hover:bg-[var(--border)] transition-colors">
                  Back
                </button>
                <button onClick={() => setStep(2)} className="flex-1 bg-[var(--charcoal)] text-white py-3.5 text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl font-bold mb-6">Review Order</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-[var(--border)] pb-4">
                    <div className="w-16 aspect-[3/4] bg-[var(--accent-light)] overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-[var(--warm-gray)] mt-1">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[var(--accent-light)] p-4 rounded text-sm mb-6">
                <p className="font-medium mb-1">Shipping to:</p>
                <p className="text-[var(--warm-gray)] font-light">{form.firstName} {form.lastName}, {form.address}, {form.city}, {form.state} – {form.pincode}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-[var(--charcoal)] py-3.5 text-xs tracking-widest uppercase hover:bg-[var(--border)] transition-colors">
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="flex-1 bg-[var(--accent)] text-white py-3.5 text-xs tracking-widest uppercase hover:bg-[var(--dark-accent)] transition-colors disabled:opacity-60"
                >
                  {placing ? 'Placing Order…' : `Place Order · ₹${total.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Order Summary ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[var(--border)] p-5 sticky top-24">
            <h3 className="font-display text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-[var(--warm-gray)] truncate mr-2">{item.name} ×{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[var(--warm-gray)]">
                <span>Subtotal</span><span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[var(--warm-gray)]">
                <span>Shipping</span><span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-[var(--border)]">
                <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
