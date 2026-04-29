import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center gap-10 p-20">
      <Link href="/test_1">test_1</Link>
      <Link href="/test_2">test_2</Link>
      <Link href="/test_3">test_3</Link>
      <Link href="/test_4">test_4</Link>
    </div>
  );
}
