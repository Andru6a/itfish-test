"use client";
import { useRef, useState, useEffect } from "react";
import { useStore } from "@/store/useStore";

const test_4 = () => {
  const posts = useStore((s) => s.posts);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center p-20">
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-gray-900 text-amber-50 rounded-lg shadow shadow-cyan-300 px-4 py-2 flex items-center gap-2"
        >
          Посты
          <span
            className={`inline-block transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          >
            ▾
          </span>
        </button>
        {isOpen && (
          <ul className="absolute top-full left-0 bg-gray-900 rounded-lg shadow shadow-cyan-300 w-80 z-10 mt-1">
            {posts.map((post) => (
              <li key={post.id} className="text-amber-50 p-2 border-b border-gray-700">
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default test_4;
