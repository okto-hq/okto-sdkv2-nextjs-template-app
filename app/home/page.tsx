"use client";

import React from "react";
import { signOut } from "next-auth/react";
import GetButton from "@/app/components/GetButton";
import {
  getAccount,
  getChains,
  getOrdersHistory,
  getPortfolio,
  getPortfolioActivity,
  getPortfolioNFT,
  getTokens,
  useOkto,
} from "@okto_web3/react-sdk";
import Link from "next/link";
import SignComponent from "../components/SignComponent";
import { useRouter } from "next/navigation";

export default function Home() {
  const oktoClient = useOkto();

  const isloggedIn = oktoClient.isLoggedIn();
  const userSWA = oktoClient.userSWA;
  const clientSWA = oktoClient.clientSWA;
  const router = useRouter();

  async function handleLogout() {
    try {
      // First clear the session
      oktoClient.sessionClear();
      localStorage.removeItem("okto_session");

      // Then sign out from next-auth
      await signOut({ redirect: false });

      // Finally redirect to login page
      router.push("/");
      return { result: "logout success" };
    } catch (error) {
      console.error("Logout error:", error);
      return { result: "logout failed" };
    }
  }

  const getSessionInfo = async () => {
    const session = localStorage.getItem("okto_session");
    const sessionInfo = JSON.parse(session || "{}");
    return { result: sessionInfo };
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-100 to-violet-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center text-4xl font-bold text-violet-900 mb-12">
          Okto v2 SDK Demo
        </div>

        <div className="space-y-4">
          <h2 className="text-violet-900 font-bold text-2xl">User Details</h2>
          <pre className="whitespace-pre-wrap break-words bg-white p-6 rounded-xl text-gray-800 w-full border border-violet-200 shadow-lg">
            {isloggedIn
              ? `Logged in \n userSWA: ${userSWA} \n clientSWA: ${clientSWA}`
              : "not signed in"}
          </pre>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-violet-200 p-6">
          <h2 className="text-violet-900 font-semibold text-2xl mb-6">
            Session
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <GetButton title="Okto Log out" apiFn={handleLogout} tag="" />
            <GetButton
              title="Show Session Info"
              apiFn={getSessionInfo}
              tag=""
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-violet-200 p-6">
          <h2 className="text-violet-900 font-semibold text-2xl mb-6">
            Explorer Functions
          </h2>
          <p className="font-regular text-lg mb-6">
            For a complete list of supported networks, check out{" "}
            <a
              className="underline text-indigo-700"
              href="https://docs.okto.tech/docs/supported-chains"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supported Chains & Tokens Guide
            </a>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <GetButton title="getAccount" apiFn={getAccount} tag="" />
            <GetButton
              title="getChains"
              apiFn={getChains}
              tag="Ensure that chains are whitelisted."
            />
            <GetButton
              title="getOrdersHistory"
              apiFn={getOrdersHistory}
              tag=""
            />
            <GetButton
              title="getPortfolio"
              apiFn={getPortfolio}
              tag="Ensure token is whitelisted to see the balance."
            />
            <GetButton
              title="getPortfolioActivity"
              apiFn={getPortfolioActivity}
              tag=""
            />
            <GetButton
              title="getPortfolioNFT"
              apiFn={getPortfolioNFT}
              tag="Ensure that the NFT is whitelisted"
            />
            <GetButton
              title="getTokens"
              apiFn={getTokens}
              tag="Ensure the token is whitelisted"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-violet-200 p-6">
          <SignComponent />
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-violet-200 p-6">
          <h2 className="text-violet-900 font-semibold text-2xl mb-6">
            Intents
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/transfer"
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center font-medium"
            >
              Transfer Token
            </Link>
            <Link
              href="/transfernft"
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center font-medium"
            >
              Transfer NFT
            </Link>
            <Link
              href="/evmrawtxn"
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center font-medium"
            >
              Raw Transaction
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
