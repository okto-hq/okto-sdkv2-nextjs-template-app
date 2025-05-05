"use client";
import EVMRawTransaction from "../components/EVMRawTransaction";

export default function TransferPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-violet-200 w-full">
      <h1 className="text-black font-bold text-3xl mb-8">EVM Raw Transaction</h1>
      <div className="flex flex-col gap-2 w-full">
        <EVMRawTransaction />
      </div>
    </main>
  );
} 