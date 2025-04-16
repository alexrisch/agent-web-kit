'use client';
import { Text, VStack } from "@chakra-ui/react";
import { AccordionItem, AccordionItemContent } from "@/components/ui/accordion";
import { ThreadDrawerAccordionHeader } from './thread-drawer-accordian-header';
import { ThreadDrawerThreadItem } from './thread-drawer-thread-item';
import { useThreads } from "@/hooks/useThreads";

export function ThreadDrawerThreads() {
  const { threads, onUpdateThreadTitle } = useThreads();

  return (
    <AccordionItem key={"threads"} value={"threads"}>
      <ThreadDrawerAccordionHeader title="Threads" />
      <AccordionItemContent>
        <VStack align="stretch" spaceY={3}>
          {threads.length > 0 ? (
            threads.map((thread) => (
              <ThreadDrawerThreadItem key={thread.id} thread={thread} onUpdateThreadTitle={onUpdateThreadTitle} />
            ))
          ) : (
            <Text fontSize="sm" color="gray.500">
              No previous threads
            </Text>
          )}
        </VStack>
      </AccordionItemContent>
    </AccordionItem>
  );
}
