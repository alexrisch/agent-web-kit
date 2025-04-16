'use client';

import { ChatMessage } from '@/app/utils/schemaTypes';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { Conversation } from '../Conversation';
import { Box, useDisclosure } from '@chakra-ui/react';
import { ConversationInput } from '../ConversationInput';
import { ThreadDrawer } from '../thread-drawer/thread-drawer';
import { APP_CONFIG } from '@/config';
import { getSavedAgent, getSavedModel, saveThread } from '@/app/utils/storage-utils';
import { HomeWelcomeMessage } from './home-welcome-message';

export function Home() {
  const [threadId] = useState<string>(uuidv4());
  const [state, setState] = useState<{
    sendingMessage: boolean;
    messages: ChatMessage[];
    input: string;
    animationMessageIndex: number | null;
  }>({
    sendingMessage: false,
    messages: [],
    input: "",
    animationMessageIndex: null,
  });

  const hasSavedThread = useRef<boolean>(false);

  const onSendMessage = useCallback(async () => {
    const humanMessage: ChatMessage = {
      content: state.input,
      type: "human",
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, humanMessage],
      input: "",
      animationMessageIndex: prev.messages.length,
    }));

    const agent = APP_CONFIG.enableAgentSelect ? getSavedAgent() ?? undefined : undefined;
    const model = APP_CONFIG.enableModelSelect ? getSavedModel() ?? undefined : undefined;

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
      animationMessageIndex: prev.messages.length,
    }));
  }, [state.input, threadId]);

  const setInput = useCallback((input: string) => {
    setState((prev) => ({ ...prev, input }));
  }, []);

  useEffect(() => {
    if (state.messages.length > 0 && !hasSavedThread.current) {
      hasSavedThread.current = true;
      saveThread({
        id: threadId,
        title: `New Thread - ${new Date().toLocaleString()}`,
      });
    }
  }, [state.messages.length, threadId]);

  const { open, onOpen, onClose } = useDisclosure();

  return (
    <main>
      <Box h="100vh" p={4}>
        {!state.messages.length ? (
          <Box
            w="full"
            h="full"
            flexGrow={1}
            display="flex"
            flexDirection={"column"}
          >
            <ThreadDrawer
              open={open}
              onClose={onClose}
              onOpen={onOpen}
            />
            <HomeWelcomeMessage />
            <ConversationInput input={state.input} setInput={setInput} sendMessage={onSendMessage} loading={state.sendingMessage} />
          </Box>
        ) : (
          <Conversation
            messages={state.messages}
            loading={state.sendingMessage}
            onSendMessage={onSendMessage}
            input={state.input}
            setInput={setInput}
            animationMessageIndex={state.animationMessageIndex}
          />
        )}
      </Box>
    </main>
  );
}
