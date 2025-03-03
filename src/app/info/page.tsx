import axios from "axios";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.baseUrl ?? "http://localhost:3000";
const requestUrl = `${baseUrl}/api/info`;
console.log('requestUrl', requestUrl);

export default async function InfoPage() {
  const res = await axios.get(`${baseUrl}/api/info`);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <pre>
          <code>
            {JSON.stringify(res.data, null, 2)}
          </code>
        </pre>
      </main>
    </div>
  )
}
