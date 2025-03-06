'use client';

import { ChatMessage } from '@/app/utils/schemaTypes';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { Conversation } from './Conversation';
import { Box, Heading, useDisclosure } from '@chakra-ui/react';
import { ConversationInput } from './ConversationInput';
import { ThreadDrawer } from './ThreadDrawer';
import { AGENT_STORAGE_KEY, MODEL_STORAGE_KEY } from '@/constants/storageConstants';
import { APP_CONFIG } from '@/config';

export function Home() {
  const [threadId] = useState<string>(uuidv4());
  const [state, setState] = useState<{
    sendingMessage: boolean;
    messages: ChatMessage[];
    input: string;
  }>({
    sendingMessage: false,
    messages: [],
    input: "",
  });

  const onSendMessage = useCallback(async () => {
    const humanMessage: ChatMessage = {
      content: state.input,
      type: "human",
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, humanMessage],
      input: "",
    }));

    const agent = APP_CONFIG.enableAgentSelect ? localStorage.getItem(AGENT_STORAGE_KEY) ?? undefined : undefined;
    const model = APP_CONFIG.enableModelSelect ? localStorage.getItem(MODEL_STORAGE_KEY) ?? undefined : undefined;

    const sendRes = await axios.post<ChatMessage>(`/api/invoke`, {
      threadId: threadId,
      message: state.input,
      model,
      agent,
    });

    const { data: newMessage } = sendRes;
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  }, [state.input, threadId]);

  const setInput = useCallback((input: string) => {
    setState((prev) => ({ ...prev, input }));
  }, []);

  const { open, onOpen, onClose } = useDisclosure();

  return (
    <main>
      <Box h="100vh">
        {!state.messages.length ? (
          <Box w="full" flex={1} display="flex" flexDirection={"column"} justifyContent="center" alignItems="center">
            <Box w="full" display="flex" flexDirection={"row"} alignItems={'center'} p={4}>
              <ThreadDrawer
                open={open}
                onClose={onClose}
                onOpen={onOpen}
                onNewThread={() => { }}
                threads={[]}
                onSelectModel={() => { }}
              />
              <Heading display={"flex"} flex={1} textAlign={'center'}>Welcome to the chat!</Heading>
            </Box>
            <ConversationInput input={state.input} setInput={setInput} sendMessage={onSendMessage} loading={state.sendingMessage} />
          </Box>
        ) : (
          <Conversation
            messages={state.messages}
            loading={state.sendingMessage}
            onSendMessage={onSendMessage}
            input={state.input}
            setInput={setInput}
          />
        )}
      </Box>

    </main>
  );
}
