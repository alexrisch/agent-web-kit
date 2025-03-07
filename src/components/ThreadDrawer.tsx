'use client';

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerRoot,
} from "@/components/ui/drawer"
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { FaPenSquare } from "react-icons/fa";
import axios from "axios";
import {
  RadioCardItem,
  RadioCardRoot,
} from "@/components/ui/radio-card"
import { AGENT_STORAGE_KEY, MODEL_STORAGE_KEY } from "@/constants/storageConstants";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion"

type ThreadDrawerprops = {
  threads: { id: string; title: string }[];
  onNewThread: () => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const ThreadDrawer = ({
  threads,
  onNewThread,
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

  const [value, setValue] = useState(["threads"])

  const handleModelChange = useCallback((details: { value: string }) => {
    const { value } = details;
    localStorage.setItem(MODEL_STORAGE_KEY, value);
  }, []);

  const handleAgentChange = useCallback((details: { value: string }) => {
    const { value } = details;
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
      <DrawerRoot open={open} placement="start" onOpenChange={onClose} size="md" >
        <DrawerBackdrop />
        <Button onClick={onOpen} variant="outline" size="sm">
          <FaBars />
        </Button>
        <DrawerContent>
          <DrawerBody>
            <Box pb={4} justifySelf={'end'}>
              <FaPenSquare size={40} onClick={onNewThread} />
            </Box>
            <AccordionRoot multiple value={value} onValueChange={(e) => setValue(e.value)}>
              <AccordionItem key={"models"} value={"models"}>
                <AccordionItemTrigger>
                  <Heading>
                    Model
                  </Heading>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <RadioCardRoot pl={1} defaultValue={localStorage.getItem(MODEL_STORAGE_KEY) ?? info.default_model} onValueChange={handleModelChange} mb={4}>
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
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem key={"agents"} value={"agents"}>
                <AccordionItemTrigger>
                  <Heading>
                    Agent
                  </Heading>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <RadioCardRoot pl={1} defaultValue={localStorage.getItem(AGENT_STORAGE_KEY) ?? info.default_agent} onValueChange={handleAgentChange} mb={4}>
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
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem key={"threads"} value={"threads"}>
                <AccordionItemTrigger>Threads</AccordionItemTrigger>
                <AccordionItemContent>
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
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};
