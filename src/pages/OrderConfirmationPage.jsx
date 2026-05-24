import { Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const orderNumber = `DRP-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center animate-fadeUp">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="font-display text-4xl font-bold mb-3">Order Placed!</h1>
        <p className="text-[var(--warm-gray)] mb-2 text-sm">Thank you for your purchase.</p>
        <p className="text-xs tracking-widest uppercase text-[var(--accent)] mb-8">Order #{orderNumber}</p>
        <p className="text-sm text-[var(--warm-gray)] mb-10 leading-relaxed">
          You'll receive a confirmation email shortly with your order details and tracking information.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/shop"
            className="bg-[var(--charcoal)] text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account"
            className="border border-[var(--charcoal)] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[var(--charcoal)] hover:text-white transition-colors"
          >
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
