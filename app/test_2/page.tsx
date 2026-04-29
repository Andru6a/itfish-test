"use client";
import Link from "next/link";
import { useStore } from "@/store/useStore";

const Test_2 = () => {
  const login = useStore((s) => s.login);

  return (
    <div className="flex flex-col items-center gap-6 p-20">
      <h1 className="text-2xl font-bold text-amber-50">test2</h1>
      <p className="text-amber-50">{login} success</p>
      <Link
        href="/test_3"
        className="bg-gray-900 text-amber-50 rounded-lg shadow shadow-cyan-300 px-4 py-2"
      >
        Перейти к test3
      </Link>
    </div>
  );
};

export default Test_2;
