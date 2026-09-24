import { Smartphone, Brand, Category } from "@/data/types";

import iphone18ProMax from "@/data/smartphones/apple/iphone-18-pro-max.json";
import iphone17e from "@/data/smartphones/apple/iphone-17e.json";
import iphoneDuo from "@/data/smartphones/apple/iphone-duo.json";
import galaxyS26Ultra from "@/data/smartphones/samsung/galaxy-s26-ultra.json";
import galaxyZFold8 from "@/data/smartphones/samsung/galaxy-z-fold-8.json";
import galaxyA17 from "@/data/smartphones/samsung/galaxy-a17-5g.json";
import pixel11ProXl from "@/data/smartphones/google/pixel-11-pro-xl.json";
import pixel10a from "@/data/smartphones/google/pixel-10a.json";
import oneplus15 from "@/data/smartphones/oneplus/oneplus-15.json";
import razrFold from "@/data/smartphones/motorola/razr-fold.json";
import motoGPower from "@/data/smartphones/motorola/moto-g-power-2026.json";
import xiaomi17ProMax from "@/data/smartphones/xiaomi/xiaomi-17-pro-max.json";

import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";

export const products: Smartphone[] = [
  iphone18ProMax as Smartphone,
  iphone17e as Smartphone,
  iphoneDuo as Smartphone,
  galaxyS26Ultra as Smartphone,
  galaxyZFold8 as Smartphone,
  galaxyA17 as Smartphone,
  pixel11ProXl as Smartphone,
  pixel10a as Smartphone,
  oneplus15 as Smartphone,
  razrFold as Smartphone,
  motoGPower as Smartphone,
  xiaomi17ProMax as Smartphone,
];

export const brands: Brand[] = brandsData as Brand[];
export const categories: Category[] = categoriesData as Category[];

export function getProductById(id: string): Smartphone | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Smartphone | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(brand: string): Smartphone[] {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getProductsByCategory(category: string): Smartphone[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string, excludeIds: string[] = []): Smartphone[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return products
    .filter((p) => !excludeIds.includes(p.id))
    .filter(
      (p) =>
        p.fullName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q)
    )
    .slice(0, 8);
}

export function getPopularProducts(limit = 6): Smartphone[] {
  const popularIds = [
    "apple-iphone-18-pro-max",
    "samsung-galaxy-s26-ultra",
    "google-pixel-11-pro-xl",
    "apple-iphone-17e",
    "google-pixel-10a",
    "oneplus-15",
  ];
  return popularIds
    .map((id) => getProductById(id))
    .filter((p): p is Smartphone => Boolean(p))
    .slice(0, limit);
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
