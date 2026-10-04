"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Smartphone } from "@/data/types";
import { products, searchProducts, getPopularProducts } from "@/lib/products";

interface ProductSelectorProps {
  label: string;
  selectedId: string | null;
  onSelect: (product: Smartphone | null) => void;
  excludeIds?: string[];
  placeholder?: string;
}

export default function ProductSelector({
  label,
  selectedId,
  onSelect,
  excludeIds = [],
  placeholder = "Search phones...",
}: ProductSelectorProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = selectedId
    ? products.find((p) => p.id === selectedId) ?? null
    : null;

  // HTML ids must not contain whitespace ("Phone A" would produce an invalid id
  // and an unparseable aria-controls token).
  const idSlug = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const inputId = `selector-${idSlug}`;
  const listboxId = `listbox-${idSlug}`;

  const suggestions = query.length >= 2
    ? searchProducts(query, excludeIds)
    : getPopularProducts(6).filter((p) => !excludeIds.includes(p.id));

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightIndex(-1);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        onSelect(suggestions[highlightIndex]);
        setQuery("");
        closeDropdown();
      } else if (suggestions.length === 1) {
        onSelect(suggestions[0]);
        setQuery("");
        closeDropdown();
      }
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  }

  function handleSelect(product: Smartphone) {
    onSelect(product);
    setQuery("");
    closeDropdown();
    inputRef.current?.blur();
  }

  function handleClear() {
    onSelect(null);
    setQuery("");
    inputRef.current?.focus();
  }

  if (selected) {
    return (
      <div className="w-full">
        <span className="block text-sm font-medium text-text mb-1.5">{label}</span>
        <div className="flex items-center justify-between w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg">
          <div>
            <span className="font-medium text-text">{selected.fullName}</span>
            <span className="ml-2 text-sm text-text-secondary">
              {selected.pricing.msrp
                ? `From $${selected.pricing.msrp.toLocaleString()}`
                : "TBA"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="ml-2 p-1 text-text-light hover:text-error transition-colors"
            aria-label={`Clear ${label}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative" ref={containerRef}>
      <label htmlFor={inputId} className="block text-sm font-medium text-text mb-1.5">
        {label}
      </label>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setHighlightIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      {isOpen && suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 w-full bg-white border border-border rounded-lg shadow-lg max-h-72 overflow-y-auto"
        >
          {query.length < 2 && (
            <li className="px-4 py-2 text-xs font-medium text-text-light bg-bg-secondary border-b border-border">
              Popular phones
            </li>
          )}
          {suggestions.map((product, index) => (
            <li
              key={product.id}
              role="option"
              aria-selected={index === highlightIndex}
              className={`px-4 py-3 cursor-pointer border-b border-border-light last:border-b-0 ${
                index === highlightIndex ? "bg-primary-light" : "hover:bg-bg-secondary"
              }`}
              onClick={() => handleSelect(product)}
              onMouseEnter={() => setHighlightIndex(index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-text">{product.fullName}</span>
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                      product.status === "available"
                        ? "bg-accent-light text-accent"
                        : product.status === "announced"
                          ? "bg-warning-light text-warning"
                          : "bg-bg-secondary text-text-light"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">
                  {product.pricing.msrp
                    ? `$${product.pricing.msrp.toLocaleString()}`
                    : "TBA"}
                </span>
              </div>
              <div className="text-xs text-text-light mt-0.5">
                {product.brand} · {product.display.size}&quot; {product.display.panelType} ·{" "}
                {product.performance.chipset}
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-border rounded-lg shadow-lg p-4 text-center">
          <p className="text-sm text-text-secondary">
            No phones found matching &ldquo;{query}&rdquo;
          </p>
          <p className="text-xs text-text-light mt-1">
            Check spelling or try searching by brand
          </p>
        </div>
      )}
    </div>
  );
}
