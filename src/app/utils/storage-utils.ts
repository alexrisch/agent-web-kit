import { AGENT_STORAGE_KEY, MODEL_STORAGE_KEY, THREADS_STORAGE_KEY } from "@/constants/storageConstants";

export type StorageThread = {
  id: string;
  title: string;
};

export const getThreads = (): StorageThread[] => {
  const threads = localStorage.getItem(THREADS_STORAGE_KEY);
  return threads ? JSON.parse(threads) : [];
};

export const saveThread = (thread: StorageThread) => {
  const threads = getThreads();
  threads.push(thread);
  localStorage.setItem(THREADS_STORAGE_KEY, JSON.stringify(threads));
};

export const deleteThread = (threadId: string) => {
  const threads = getThreads();
  const filteredThreads = threads.filter((thread) => thread.id !== threadId);
  localStorage.setItem(THREADS_STORAGE_KEY, JSON.stringify(filteredThreads));
};

export const updateThreadTitle = (threadId: string, title: string) => {
  const threads = getThreads();
  const updatedThreads = threads.map((thread) => {
    if (thread.id === threadId) {
      return { ...thread, title };
    }
    return thread;
  });
  localStorage.setItem(THREADS_STORAGE_KEY, JSON.stringify(updatedThreads));
};

export const saveAgent = (agent: string) => {
  localStorage.setItem(AGENT_STORAGE_KEY, agent);
};

export const getSavedAgent = (): string | null => {
  return localStorage.getItem(AGENT_STORAGE_KEY);
};

export const saveModel = (model: string) => {
  localStorage.setItem(MODEL_STORAGE_KEY, model);
};

export const getSavedModel = (): string | null => {
  return localStorage.getItem(MODEL_STORAGE_KEY);
};
