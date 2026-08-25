"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CurrencyCode, CurrencyConfig } from "@/types";

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rateFromUSD: 1.0, label: "USD ($) United States" },
  EUR: { code: "EUR", symbol: "€", rateFromUSD: 0.92, label: "EUR (€) Europe" },
  GBP: { code: "GBP", symbol: "£", rateFromUSD: 0.79, label: "GBP (£) United Kingdom" },
  INR: { code: "INR", symbol: "₹", rateFromUSD: 86.5, label: "INR (₹) India" },
  AED: { code: "AED", symbol: "AED ", rateFromUSD: 3.67, label: "AED (د.إ) UAE" },
  JPY: { code: "JPY", symbol: "¥", rateFromUSD: 152.0, label: "JPY (¥) Japan" },
  AUD: { code: "AUD", symbol: "A$", rateFromUSD: 1.54, label: "AUD (A$) Australia" },
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (amountUSD: number) => string;
  convertPrice: (amountUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: CURRENCIES.USD,
  setCurrencyCode: () => {},
  formatPrice: (amountUSD: number) => `$${amountUSD.toLocaleString()}`,
  convertPrice: (amountUSD: number) => amountUSD,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCode, setCurrentCode] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("dream_house_currency") as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrentCode(saved);
    }
  }, []);

  const setCurrencyCode = (code: CurrencyCode) => {
    setCurrentCode(code);
    localStorage.setItem("dream_house_currency", code);
  };

  const currency = CURRENCIES[currentCode] || CURRENCIES.USD;

  const convertPrice = (amountUSD: number) => {
    return Math.round(amountUSD * currency.rateFromUSD);
  };

  const formatPrice = (amountUSD: number) => {
    const converted = convertPrice(amountUSD);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrencyCode,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
