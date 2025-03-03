import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ServiceMetadata } from '@/app/utils/schemaTypes';

const LOG_SCOPE = ["THREAD"]

const AGENT_URL = process.env.AGENT_URL;
if (!AGENT_URL) {
  throw new Error('AGENT_URL is not defined');
}

const timeout = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 10000;

export async function GET(request: NextRequest) {
  console.log(`${LOG_SCOPE} REQEUST`, request);
  const url = new URL(request.url);
  const threadId = url.searchParams.get('threadId');
  console.log(`${LOG_SCOPE} threadId`, threadId);
  const response = await axios.post<ServiceMetadata>(
    `${AGENT_URL}/history`,
    {
      thread_id: threadId
    },
    { headers: {}, timeout }
  );
  const info = response.data;
  console.log(`${LOG_SCOPE} RESPONSE`, response.data);
  return NextResponse.json(info);
}
