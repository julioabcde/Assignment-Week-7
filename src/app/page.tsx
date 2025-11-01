'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { Product } from '@/types/product';
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <main className="container">
        <div className="loading">
          <div className="spinner"></div>
          Loading products...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <div className={styles.error}>
          <h2>Error loading products</h2>
          <p>{error}</p>
          <button onClick={fetchProducts} className={styles.retryBtn}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to Product Store</h1>
        <p className={styles.subtitle}>
          Discover amazing products from our curated collection
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <section className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        
        {filteredProducts.length === 0 ? (
          <div className={styles.noResults}>
            <p>No products found matching your search.</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
