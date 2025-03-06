'use client';

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerRoot,
} from "@/components/ui/drawer"
import { Button, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { FaPenSquare } from "react-icons/fa";
import axios from "axios";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card"
import { AGENT_STORAGE_KEY, MODEL_STORAGE_KEY } from "@/constants/storageConstants";

type ThreadDrawerprops = {
  threads: { id: string; title: string }[];
  onNewThread: () => void;
  onSelectModel?: (model: string) => void;
  open: boolean;
  onOpen: (payload: any) => void;
  onClose: () => void;
};

export const ThreadDrawer = ({
  threads,
  onNewThread,
  onSelectModel,
  open,
  onOpen,
  onClose,
}: ThreadDrawerprops) => {
  const [info, setInfoState] = useState<{
    agents: {
      key: string;
      description: string;
    }[];
    models: string[];
    default_agent: string;
    default_model: string;
  }>({
    agents: [],
    models: [],
    default_agent: "",
    default_model: "",
  });

  const handleModelChange = useCallback((details: {value: string}) => {
    const {value} = details;
    localStorage.setItem(MODEL_STORAGE_KEY, value);
  }, []);

  const handleAgentChange = useCallback((details: {value: string}) => {
    const {value} = details;
    localStorage.setItem(AGENT_STORAGE_KEY, value);
  }, []);

  useEffect(() => {
    const req = async () => {
      const res = await axios.get('/api/info');
      const data = res.data;
      setInfoState(data);
    };
    req();
  }, []);

  if (!info.default_agent) {
    return null;
  }

  return (
    <>
      <DrawerRoot open={open} placement="start" onOpenChange={onClose} size="sm">
        <DrawerBackdrop />
        <Button onClick={onOpen} variant="outline" size="sm">
          <FaBars />
        </Button>
        <DrawerContent>
          <DrawerBody>
            <Button colorScheme="blue" width="full" mb={4} onClick={onNewThread}>
              <FaPenSquare />
            </Button>
            <RadioCardRoot defaultValue={localStorage.getItem(MODEL_STORAGE_KEY) ?? info.default_model} onValueChange={handleModelChange} mb={4}>
              <RadioCardLabel>Model</RadioCardLabel>
              <HStack align="stretch">
                {info.models.map((item) => (
                  <RadioCardItem
                    label={item}
                    key={item}
                    value={item}
                  />
                ))}
              </HStack>
            </RadioCardRoot>
            <Separator />
            <RadioCardRoot defaultValue={localStorage.getItem(AGENT_STORAGE_KEY) ?? info.default_agent} onValueChange={handleAgentChange} mb={4}>
              <RadioCardLabel>Agent</RadioCardLabel>
              <HStack align="stretch" flexWrap={'wrap'}>
                {info.agents.map((item) => (
                  <RadioCardItem
                    label={item.key}
                    key={item.key}
                    value={item.key}
                    description={item.description}
                  />
                ))}
              </HStack>
            </RadioCardRoot>
            <Separator />
            <VStack align="stretch" spaceY={3}>
              {threads.length > 0 ? (
                threads.map((thread) => (
                  <Button key={thread.id} variant="outline" width="full">
                    {thread.title}
                  </Button>
                ))
              ) : (
                <Text fontSize="sm" color="gray.500">
                  No previous threads
                </Text>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};
