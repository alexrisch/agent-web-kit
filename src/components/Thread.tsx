'use client';

import { ChatMessage } from "@/app/utils/schemaTypes";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { Conversation } from "./Conversation";

type ThreadProps = {
  id: string;
};

export const Thread: FC<ThreadProps> = ({
  id,
}) => {
  const [state, setState] = useState<{
    loading: boolean;
    messages: ChatMessage[];
  }>({
    loading: true,
    messages: [],
  });

  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const req = async () => {
      const { data } = await axios.get<{ messages: ChatMessage[] }>(`/api/thread?threadId=${id}`);
      setState({
        loading: false,
        messages: data.messages,
      });
    }
    req();
  }, [id]);

  const onSendMessage = useCallback(async () => {
    const humanMessage: ChatMessage = {
      content: input,
      type: "human",
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, humanMessage],
    }));
    const sendRes = await axios.post<ChatMessage, { data: ChatMessage }>(`/api/invoke`, {
      threadId: id,
      message: input,
    });

    const { data: newMessage } = sendRes;
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    setInput('');
  }, [input, setInput, id]);

  return (
    <Conversation
      messages={state.messages}
      loading={state.loading}
      onSendMessage={onSendMessage}
      input={input}
      setInput={setInput}
    />
  );
};
