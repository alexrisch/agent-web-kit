'use client';

import axios from "axios";
import { useEffect, useState } from "react";

export default function InfoPage() {
  const [data, setData] = useState<null | unknown>(null)
  useEffect(() => {
    axios.get('/api/info').then(res => {
      setData(res.data)
    })
  }, [])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <pre>
          <code>
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      </main>
    </div>
  )
}
