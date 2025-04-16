'use client';

import { getThreads, StorageThread, updateThreadTitle } from "@/app/utils/storage-utils";
import { useCallback, useState } from "react";

export const useThreads = () => {
  const [threads, setThreads] = useState<StorageThread[]>(getThreads());

  const onUpdateThreadTitle = useCallback((threadId: string, title: string) => {
    updateThreadTitle(threadId, title);
    setThreads(getThreads());
  }, []);

  return { threads, onUpdateThreadTitle };
};
