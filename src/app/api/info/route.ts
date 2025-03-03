import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ServiceMetadata } from '@/app/utils/schemaTypes';


const AGENT_URL = process.env.AGENT_URL;
if (!AGENT_URL) {
  throw new Error('AGENT_URL is not defined');
}

const timeout = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 10000;

export async function GET(request: NextRequest) {
  console.log('INFO REQEUST', request);
  const response = await axios.get<ServiceMetadata>(
    `${AGENT_URL}/info`,
    { headers: {}, timeout }
  );
  const info = response.data;
  console.log('INFO RESPONSE', info);
  return NextResponse.json(info);
}
