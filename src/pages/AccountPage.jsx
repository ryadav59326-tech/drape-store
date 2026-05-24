import { useState, useEffect } from 'react';
// ── TODO: import authService, orderService when backend is ready
// import { authService, orderService } from '../services/api';

const TABS = ['Profile', 'Orders', 'Wishlist', 'Settings'];

const MOCK_ORDERS = [
  { id: 'DRP-001234', date: '15 May 2025', status: 'Delivered', total: 4580, items: 3 },
  { id: 'DRP-001189', date: '2 Apr 2025', status: 'Delivered', total: 8990, items: 2 },
  { id: 'DRP-001050', date: '10 Feb 2025', status: 'Delivered', total: 2340, items: 1 },
];

const STATUS_COLOR = {
  Delivered: 'text-green-600 bg-green-50',
  Processing: 'text-amber-600 bg-amber-50',
  Shipped: 'text-blue-600 bg-blue-50',
  Cancelled: 'text-red-500 bg-red-50',
};

export default function AccountPage() {
  const [tab, setTab] = useState('Profile');
  const [profile, setProfile] = useState({ name: 'Priya Mehta', email: 'priya@example.com', phone: '+91 98765 43210' });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (tab === 'Orders') {
      setLoadingOrders(true);
      // ── TODO: replace with orderService.getAll()
      setTimeout(() => {
        setOrders(MOCK_ORDERS);
        setLoadingOrders(false);
      }, 500);
    }
  }, [tab]);

  const update = (key, val) => setProfile((p) => ({ ...p, [key]: val }));

  const inputClass = 'w-full border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--charcoal)] transition-colors bg-white';
  const labelClass = 'block text-xs tracking-wide uppercase text-[var(--warm-gray)] mb-1.5';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[var(--warm-gray)] mb-1">Welcome back</p>
        <h1 className="font-display text-4xl font-bold">{profile.name.split(' ')[0]}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <nav className="space-y-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors border-l-2 ${
                  tab === t
                    ? 'border-[var(--accent)] text-[var(--charcoal)] bg-[var(--accent-light)] font-medium'
                    : 'border-transparent text-[var(--warm-gray)] hover:text-[var(--charcoal)] hover:bg-[var(--border)]/40'
                }`}
              >
                {t}
              </button>
            ))}
            <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-600 transition-colors border-l-2 border-transparent mt-4">
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 animate-fadeIn" key={tab}>
          {/* Profile */}
          {tab === 'Profile' && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">My Profile</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input className={inputClass} value={profile.name} onChange={(e) => update('name', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input className={inputClass} type="email" value={profile.email} onChange={(e) => update('email', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input className={inputClass} value={profile.phone} onChange={(e) => update('phone', e.target.value)} />
                </div>
                {/* ── TODO: connect to authService.updateProfile(profile) ── */}
                <button className="bg-[var(--charcoal)] text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors mt-2">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Orders */}
          {tab === 'Orders' && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">My Orders</h2>
              {loadingOrders ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="skeleton h-20 w-full" />)}
                </div>
              ) : orders.length === 0 ? (
                <p className="text-[var(--warm-gray)] text-sm">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-[var(--border)] p-4 hover:border-[var(--charcoal)] transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">{order.id}</p>
                          <p className="text-xs text-[var(--warm-gray)] mt-0.5">{order.date} · {order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹{order.total.toLocaleString('en-IN')}</p>
                          <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${STATUS_COLOR[order.status]}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          {tab === 'Wishlist' && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">Wishlist</h2>
              {/* ── TODO: fetch wishlist items from API ── */}
              <div className="text-center py-12 border border-dashed border-[var(--border)]">
                <p className="text-[var(--warm-gray)] text-sm">Your wishlist is empty</p>
                <a href="/shop" className="text-xs mt-2 inline-block underline hover:text-[var(--accent)]">Browse the collection</a>
              </div>
            </div>
          )}

          {/* Settings */}
          {tab === 'Settings' && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">Settings</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className={labelClass}>New Password</label>
                  <input className={inputClass} type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <input className={inputClass} type="password" placeholder="••••••••" />
                </div>
                {/* ── TODO: connect to authService.changePassword() ── */}
                <button className="bg-[var(--charcoal)] text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
