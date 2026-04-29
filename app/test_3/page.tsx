"use client";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useState, useEffect, useMemo} from "react";
import Link from "next/link";
import {useStore} from "@/store/useStore";

type Post = { id: number; title: string; body: string; userId: number };

const Test_3 = () => {
    const setPosts = useStore((s) => s.setPosts);

    const [inputValue, setInputValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const {data, isLoading} = useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: () =>
            axios
                .get("https://jsonplaceholder.typicode.com/posts")
                .then((r) => r.data),
    });

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(inputValue), 300);

        return () => clearTimeout(timer);
    }, [inputValue]);

    useEffect(() => {
        if (data) {
            setPosts(data.slice(0, 10));
        }
    }, [data, setPosts]);

    // Примечание: подсказка в этом файле говорила "нечётным" — расхождение с test.md, выбрал инфу из test.md.
    const filtered = useMemo(
        () =>
            (data ?? [])
                .filter((p) => p.id % 2 === 0)
                .filter((p) => p.title.includes(debouncedSearch)),
        [data, debouncedSearch]
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-amber-50 text-lg">Загрузка...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-20 gap-4">
            <Link
                href="/test_4"
                className="bg-gray-900 text-amber-50 rounded-lg shadow shadow-cyan-300 px-4 py-2 mt-4"
            >
                Перейти к test4
            </Link>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Поиск по title"
                className="p-2 bg-gray-900 text-amber-50 rounded-lg shadow shadow-cyan-300 placeholder:text-gray-400 outline-none w-80"
            />
            <ul className="flex flex-col gap-1 w-80">
                {filtered.map((post) => (
                    <li key={post.id} className="bg-gray-900 text-amber-50 rounded-lg p-2">
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Test_3;
