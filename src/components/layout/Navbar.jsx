import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { label: 'New In', to: '/shop?category=new-in' },
  { label: 'Women', to: '/shop?category=women' },
  { label: 'Men', to: '/shop?category=men' },
  { label: 'Accessories', to: '/shop?category=accessories' },
  { label: 'Sale', to: '/shop?category=sale' },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[var(--charcoal)] text-[var(--cream)] text-center py-2 text-xs tracking-widest uppercase font-light">
        Free shipping on orders over ₹2999 &nbsp;·&nbsp; Easy returns
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[var(--cream)]/95 backdrop-blur-md shadow-sm' : 'bg-[var(--cream)]'
        } border-b border-[var(--border)]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu btn */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-5 h-px bg-[var(--charcoal)] mb-1.5" />
              <span className="block w-4 h-px bg-[var(--charcoal)] mb-1.5" />
              <span className="block w-5 h-px bg-[var(--charcoal)]" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-display text-2xl font-bold tracking-tight text-[var(--charcoal)] absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            >
              STRAPE
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm tracking-wide transition-colors relative group ${
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--charcoal)] hover:text-[var(--accent)]'
                    }`
                  }
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1 hover:text-[var(--accent)] transition-colors"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <Link to="/account" className="p-1 hover:text-[var(--accent)] transition-colors hidden sm:block" aria-label="Account">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <Link to="/cart" className="p-1 relative hover:text-[var(--accent)] transition-colors" aria-label="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3 animate-fadeIn">
              <form onSubmit={handleSearch} className="relative">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for pieces…"
                  className="w-full border-b border-[var(--charcoal)] bg-transparent py-2 pr-10 text-sm placeholder:text-[var(--warm-gray)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-[var(--cream)] flex flex-col p-8 animate-fadeIn">
            <button className="self-end mb-8" onClick={() => setMobileOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <p className="font-display text-2xl font-bold mb-8">DRAPE</p>
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-light tracking-wide border-b border-[var(--border)] pb-4 hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <Link to="/account" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--warm-gray)]">My Account</Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--warm-gray)]">Cart ({totalItems})</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
