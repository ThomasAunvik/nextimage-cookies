"use client";
import Image from "next/image";

export default function Home() {
  const requestStartCookie = () => {
    fetch("/api/cookie", { method: "GET" });
  };

  return (
    <div>
      <button
        type="button"
        onClick={requestStartCookie}
      >
        🍪 Get Cookie
      </button>

      <div>
        <div>
          <span>Optimized</span>
          <Image
            src="/api/image"
            alt="Test Image (Reload page after cookie retrieved)"
            width={200}
            height={200}
          />
        </div>
        <div>
          <span>Unoptimized</span>
          <Image
            src="/api/image"
            alt="Test Image (Reload page after cookie retrieved)"
            width={200}
            height={200}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
