// ─────────────────────────────────────────────────────────────────────────────
// API Service — Replace BASE_URL and endpoints with your actual backend
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api.com/api/v1';

const fetcher = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(localStorage.getItem('token') && {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error ${res.status}`);
  }
  return res.json();
};

// ─── Products ───────────────────────────────────────────────────────────────
export const productService = {
  /** GET /products?page=1&limit=12&category=&sort=&minPrice=&maxPrice= */
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetcher(`/products?${query}`);
  },

  /** GET /products/:id */
  getById: (id) => fetcher(`/products/${id}`),

  /** GET /products/featured */
  getFeatured: () => fetcher('/products/featured'),

  /** GET /products/new-arrivals */
  getNewArrivals: () => fetcher('/products/new-arrivals'),

  /** GET /products/search?q= */
  search: (query) => fetcher(`/products/search?q=${encodeURIComponent(query)}`),
};

// ─── Categories ──────────────────────────────────────────────────────────────
export const categoryService = {
  /** GET /categories */
  getAll: () => fetcher('/categories'),
};

// ─── Cart ────────────────────────────────────────────────────────────────────
export const cartService = {
  /** GET /cart */
  get: () => fetcher('/cart'),

  /** POST /cart { productId, size, quantity } */
  addItem: (payload) => fetcher('/cart', { method: 'POST', body: JSON.stringify(payload) }),

  /** PATCH /cart/:itemId { quantity } */
  updateItem: (itemId, payload) =>
    fetcher(`/cart/${itemId}`, { method: 'PATCH', body: JSON.stringify(payload) }),

  /** DELETE /cart/:itemId */
  removeItem: (itemId) => fetcher(`/cart/${itemId}`, { method: 'DELETE' }),

  /** DELETE /cart */
  clear: () => fetcher('/cart', { method: 'DELETE' }),
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authService = {
  /** POST /auth/login { email, password } */
  login: (payload) =>
    fetcher('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),

  /** POST /auth/register { name, email, password } */
  register: (payload) =>
    fetcher('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),

  /** POST /auth/logout */
  logout: () => fetcher('/auth/logout', { method: 'POST' }),

  /** GET /auth/me */
  me: () => fetcher('/auth/me'),
};

// ─── Orders ───────────────────────────────────────────────────────────────────
export const orderService = {
  /** POST /orders */
  create: (payload) =>
    fetcher('/orders', { method: 'POST', body: JSON.stringify(payload) }),

  /** GET /orders */
  getAll: () => fetcher('/orders'),

  /** GET /orders/:id */
  getById: (id) => fetcher(`/orders/${id}`),
};
