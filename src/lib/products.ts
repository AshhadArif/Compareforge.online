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

import appleIphone15 from "@/data/smartphones/apple/iphone-15.json";
import appleIphone16ProMax from "@/data/smartphones/apple/iphone-16-pro-max.json";
import appleIphone16 from "@/data/smartphones/apple/iphone-16.json";
import appleIphone16e from "@/data/smartphones/apple/iphone-16e.json";
import appleIphoneSe3 from "@/data/smartphones/apple/iphone-se-3.json";
import samsungGalaxyA165g from "@/data/smartphones/samsung/galaxy-a16-5g.json";
import samsungGalaxyA255g from "@/data/smartphones/samsung/galaxy-a25-5g.json";
import samsungGalaxyA365g from "@/data/smartphones/samsung/galaxy-a36-5g.json";
import samsungGalaxyA565g from "@/data/smartphones/samsung/galaxy-a56-5g.json";
import samsungGalaxyS23 from "@/data/smartphones/samsung/galaxy-s23.json";
import samsungGalaxyS24 from "@/data/smartphones/samsung/galaxy-s24.json";
import samsungGalaxyS25Ultra from "@/data/smartphones/samsung/galaxy-s25-ultra.json";
import samsungGalaxyS25 from "@/data/smartphones/samsung/galaxy-s25.json";
import samsungGalaxyZFlip6 from "@/data/smartphones/samsung/galaxy-z-flip-6.json";
import samsungGalaxyZFold6 from "@/data/smartphones/samsung/galaxy-z-fold-6.json";
import googlePixel8Pro from "@/data/smartphones/google/pixel-8-pro.json";
import googlePixel8 from "@/data/smartphones/google/pixel-8.json";
import googlePixel8a from "@/data/smartphones/google/pixel-8a.json";
import googlePixel9ProFold from "@/data/smartphones/google/pixel-9-pro-fold.json";
import googlePixel9Pro from "@/data/smartphones/google/pixel-9-pro.json";
import googlePixel9 from "@/data/smartphones/google/pixel-9.json";
import googlePixel9a from "@/data/smartphones/google/pixel-9a.json";
import oneplusOneplus12 from "@/data/smartphones/oneplus/oneplus-12.json";
import oneplusOneplus13 from "@/data/smartphones/oneplus/oneplus-13.json";
import oneplusOneplus13r from "@/data/smartphones/oneplus/oneplus-13r.json";
import oneplusOneplusOpen from "@/data/smartphones/oneplus/oneplus-open.json";
import motorolaMotoEdge2024 from "@/data/smartphones/motorola/moto-edge-2024.json";
import motorolaMotoRazr2024 from "@/data/smartphones/motorola/moto-razr-2024.json";
import motorolaMotoRazrPlus2024 from "@/data/smartphones/motorola/moto-razr-plus-2024.json";
import nothingNothingPhone2 from "@/data/smartphones/nothing/nothing-phone-2.json";
import nothingNothingPhone2a from "@/data/smartphones/nothing/nothing-phone-2a.json";
import nothingNothingPhone3 from "@/data/smartphones/nothing/nothing-phone-3.json";
import nothingNothingPhone3a from "@/data/smartphones/nothing/nothing-phone-3a.json";
import asusRogPhone8 from "@/data/smartphones/asus/rog-phone-8.json";
import asusZenfone11Ultra from "@/data/smartphones/asus/zenfone-11-ultra.json";

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
  appleIphone15 as Smartphone,
  appleIphone16ProMax as Smartphone,
  appleIphone16 as Smartphone,
  appleIphone16e as Smartphone,
  appleIphoneSe3 as Smartphone,
  samsungGalaxyA165g as Smartphone,
  samsungGalaxyA255g as Smartphone,
  samsungGalaxyA365g as Smartphone,
  samsungGalaxyA565g as Smartphone,
  samsungGalaxyS23 as Smartphone,
  samsungGalaxyS24 as Smartphone,
  samsungGalaxyS25Ultra as Smartphone,
  samsungGalaxyS25 as Smartphone,
  samsungGalaxyZFlip6 as Smartphone,
  samsungGalaxyZFold6 as Smartphone,
  googlePixel8Pro as Smartphone,
  googlePixel8 as Smartphone,
  googlePixel8a as Smartphone,
  googlePixel9ProFold as Smartphone,
  googlePixel9Pro as Smartphone,
  googlePixel9 as Smartphone,
  googlePixel9a as Smartphone,
  oneplusOneplus12 as Smartphone,
  oneplusOneplus13 as Smartphone,
  oneplusOneplus13r as Smartphone,
  oneplusOneplusOpen as Smartphone,
  motorolaMotoEdge2024 as Smartphone,
  motorolaMotoRazr2024 as Smartphone,
  motorolaMotoRazrPlus2024 as Smartphone,
  nothingNothingPhone2 as Smartphone,
  nothingNothingPhone2a as Smartphone,
  nothingNothingPhone3 as Smartphone,
  nothingNothingPhone3a as Smartphone,
  asusRogPhone8 as Smartphone,
  asusZenfone11Ultra as Smartphone,
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
    "samsung-galaxy-s25-ultra",
    "apple-iphone-16-pro-max",
    "google-pixel-9-pro",
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
