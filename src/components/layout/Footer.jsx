import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--cream)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 tracking-tight">DRAPE</h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Considered clothing for the considered life. Premium fabrics, timeless design.
            </p>
            <div className="flex gap-4 mt-6">
              {['instagram', 'twitter', 'pinterest'].map((s) => (
                <a key={s} href={`https://${s}.com`} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-xs uppercase">
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5 text-white/40">Shop</h4>
            <ul className="space-y-3">
              {['New In', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
                <li key={item}>
                  <Link to={`/shop?category=${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-white/60 hover:text-[var(--accent-light)] transition-colors font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5 text-white/40">Help</h4>
            <ul className="space-y-3">
              {['Size Guide', 'Shipping & Returns', 'FAQ', 'Contact Us', 'Track Order'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/60 hover:text-[var(--accent-light)] transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5 text-white/40">Stay in the loop</h4>
            <p className="text-sm text-white/50 mb-4 font-light">New arrivals and exclusive offers in your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-none px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <button type="submit"
                className="bg-[var(--accent)] hover:bg-[var(--dark-accent)] text-white px-4 py-2 text-xs tracking-widest uppercase transition-colors">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© 2025 Drape. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
