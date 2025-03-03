import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ChatMessage } from '@/app/utils/schemaTypes';


const AGENT_URL = process.env.AGENT_URL;
if (!AGENT_URL) {
  throw new Error('AGENT_URL is not defined');
}

const timeout = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 10000;

export async function POST(request: NextRequest) {
  console.log('INVOKE REQEUST', request);
  const {agent, model, threadId, message} = await request.json();
  const url = agent ? `${AGENT_URL}/${agent}/invoke` : `${AGENT_URL}/invoke`;
  const response = await axios.post<ChatMessage>(
    url,
    {
      threadId: threadId,
      message,
      model,
    },
    { headers: {}, timeout }
  );
  const data = response.data;
  console.log('INFO RESPONSE', data);
  return NextResponse.json(data);
}
