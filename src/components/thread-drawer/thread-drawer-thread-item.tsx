'use client';

import { StorageThread } from "@/app/utils/storage-utils";
import { Box, HStack, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaCheck, FaPen } from "react-icons/fa";

type ThreadDrawerThreadItemProps = {
  thread: StorageThread;
  onUpdateThreadTitle: (threadId: string, title: string) => void;
}

export function ThreadDrawerThreadItem({ thread, onUpdateThreadTitle }: ThreadDrawerThreadItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [threadTitle, setThreadTitle] = useState(thread.title);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    onUpdateThreadTitle(thread.id, threadTitle);
  }, [thread.id, threadTitle, onUpdateThreadTitle]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  }, [handleSave]);

  return (
    <HStack ml={2}>
      {isEditing ? (
        <Input
          pl={2}
          autoFocus
          value={threadTitle}
          onKeyDown={handleKeyDown}
          onChange={(e) => setThreadTitle(e.target.value)} />
      ) : (
        <Link href={`/thread/${thread.id}`} style={{ flex: 1 }}>
          <Text lineClamp={1}>{thread.title}</Text>
        </Link>
      )}
      {isEditing ? (
        <Box onClick={handleSave} cursor="pointer">
          <FaCheck size={10} />
        </Box>
      ) : (
        <Box onClick={handleEditClick} cursor="pointer">
          <FaPen size={10} />
        </Box>
      )}
    </HStack>
  );
}
