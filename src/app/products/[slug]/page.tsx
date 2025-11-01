'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import styles from './ProductDetail.module.css';

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ slug }) => {
      setSlug(slug);
      fetchProduct(slug);
    });
  }, [params]);

  useEffect(() => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(product.id));
    }
  }, [product]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!product) return;

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((id: number) => id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...favorites, product.id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <main className="container">
        <div className="loading">
          <div className="spinner"></div>
          Loading product...
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container">
        <div className={styles.error}>
          <h2>Error loading product</h2>
          <p>{error || 'Product not found'}</p>
          <Link href="/" className={styles.backBtn}>
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.backLink}>
          ← Back to Products
        </Link>
      </div>

      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className={styles.productImage}
            />
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.category}>{product.category}</div>
          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.rating}>
            <span className={styles.stars}>
              {'★'.repeat(Math.floor(product.rating.rate))}
              {'☆'.repeat(5 - Math.floor(product.rating.rate))}
            </span>
            <span className={styles.ratingText}>
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <div className={styles.price}>
            ${product.price.toFixed(2)}
          </div>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className={styles.actions}>
            <button
              onClick={toggleFavorite}
              className={`${styles.favoriteBtn} ${isFavorite ? styles.favorite : ''}`}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
            <button className={styles.addToCartBtn}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
