"use client";
import { SessionProvider } from "next-auth/react";
import { OktoProvider } from "@okto_web3/react-sdk";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the config type and context type
const defaultConfig = {
  environment: "sandbox",
  clientPrivateKey: "",
  clientSWA: "",
};

export const ConfigContext = createContext({
  config: defaultConfig,
  setConfig: (config) => {},
  authMethod: "google",
  setAuthMethod: (method) => {},
});

const STORAGE_KEY = "okto_config";

function AppProvider({ children, session }) {
  // Initialize state with a function to avoid unnecessary initial calculations
  const [config, setConfig] = useState(() => {
    try {
      // Check if we're in the browser environment
      if (typeof window !== "undefined") {
        const savedConfig = localStorage.getItem(STORAGE_KEY);
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig);
          return {
            environment: parsed.environment || defaultConfig.environment,
            clientPrivateKey:
              parsed.clientPrivateKey || defaultConfig.clientPrivateKey,
            clientSWA: parsed.clientSWA || defaultConfig.clientSWA,
          };
        }
      }
    } catch (error) {
      console.error("Error loading config from localStorage:", error);
    }
    // Default config if nothing in localStorage or error occurred
    return {
      environment:
        process.env.NEXT_PUBLIC_ENVIRONMENT || defaultConfig.environment,
      clientPrivateKey:
        process.env.NEXT_PUBLIC_CLIENT_PRIVATE_KEY ||
        defaultConfig.clientPrivateKey,
      clientSWA: process.env.NEXT_PUBLIC_CLIENT_SWA || defaultConfig.clientSWA,
    };
  });
  const [authMethod, setAuthMethod] = useState(() => {
    const savedMethod = localStorage.getItem("okto_auth_method");
    if (savedMethod) return savedMethod;
    else return "google";
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      localStorage.setItem("okto_auth_method", authMethod);
    } catch (error) {
      console.error("Error saving config to localStorage:", error);
    }
  }, [config, authMethod]);

  return (
    <SessionProvider session={session}>
      <ConfigContext.Provider
        value={{ config, setConfig, authMethod, setAuthMethod }}
      >
        <OktoProvider config={config}>{children}</OktoProvider>
      </ConfigContext.Provider>
    </SessionProvider>
  );
}

export default AppProvider;
