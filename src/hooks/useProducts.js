import { useState, useEffect, useCallback } from 'react';

/**
 * Generic fetch hook — wrap any async function
 * Usage: const { data, loading, error, refetch } = useFetch(() => productService.getAll())
 */
export const useFetch = (asyncFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
};

/**
 * Products hook — replace mock with real API call
 * TODO: swap MOCK_PRODUCTS for productService.getAll(filters)
 */
export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      try {
        // ── TODO: Replace with real API ──────────────────────────────────────
        // const data = await productService.getAll(filters);
        // setProducts(data.products);
        // setTotalCount(data.total);
        // ────────────────────────────────────────────────────────────────────

        // Mock: simulate network delay
        await new Promise((r) => setTimeout(r, 600));
        const { MOCK_PRODUCTS } = await import('../services/mockData');

        let result = [...MOCK_PRODUCTS];
        if (filters.category) result = result.filter((p) => p.category === filters.category);
        if (filters.search) result = result.filter((p) => p.name.toLowerCase().includes(filters.search.toLowerCase()));
        if (filters.sort === 'price_asc') result.sort((a, b) => a.price - b.price);
        if (filters.sort === 'price_desc') result.sort((a, b) => b.price - a.price);

        setProducts(result);
        setTotalCount(result.length);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [filters.category, filters.search, filters.sort, filters.page]);

  return { products, loading, error, totalCount };
};

/**
 * Single product hook
 * TODO: replace mock with productService.getById(id)
 */
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        // ── TODO: Replace with real API ──────────────────────────────────────
        // const data = await productService.getById(id);
        // setProduct(data);
        // ────────────────────────────────────────────────────────────────────

        await new Promise((r) => setTimeout(r, 400));
        const { MOCK_PRODUCTS } = await import('../services/mockData');
        const found = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
        if (!found) throw new Error('Product not found');
        setProduct(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
