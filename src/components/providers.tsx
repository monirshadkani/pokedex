"use client";
import React, { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default Providers;
