import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Feedback } from '@/app/utils/schemaTypes';


const AGENT_URL = process.env.AGENT_URL;
if (!AGENT_URL) {
  throw new Error('AGENT_URL is not defined');
}

const timeout = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 10000;

export async function POST(request: NextRequest) {
  console.log('INVOKE REQEUST', request);
  const feedback: Feedback = await request.json();
  const response = await axios.post<object, Feedback>(
    `${AGENT_URL}/feedback`,
    feedback,
    { headers: {}, timeout }
  );
  console.log('INFO RESPONSE', response);
  return NextResponse.json({});
}
