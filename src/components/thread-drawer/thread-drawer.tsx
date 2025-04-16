'use client';

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerRoot,
} from "@/components/ui/drawer"
import { Box, Button } from "@chakra-ui/react";
import { FaBars, FaPenSquare } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AccordionRoot } from "@/components/ui/accordion";
import Link from "next/link";
import { ThreadDrawerModels } from './thread-drawer-models';
import { ThreadDrawerAgents } from './thread-drawer-agents';
import { ThreadDrawerThreads } from './thread-drawer-threads';
import { saveAgent, saveModel } from "@/app/utils/storage-utils";

type ThreadDrawerprops = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const ThreadDrawer = ({
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

  const [value, setValue] = useState(["threads"]);

  const handleModelChange = useCallback((details: { value: string }) => {
    const { value } = details;
    saveModel(value);
  }, []);

  const handleAgentChange = useCallback((details: { value: string }) => {
    const { value } = details;
    saveAgent(value);
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
    <Box
      data-state="open"
      _open={{
        animation: "slide-from-left-full 0.5s ease-out",
      }}
    >
      <DrawerRoot open={open} placement="start" onOpenChange={onClose} size="md" >
        <DrawerBackdrop />
        <Button onClick={onOpen} variant="outline" size="sm">
          <FaBars />
        </Button>
        <DrawerContent>
          <DrawerBody>
            <Box pb={4} justifySelf={'end'}>
              <Link href={`/`}>
                <FaPenSquare size={40} />
              </Link>
            </Box>
            <AccordionRoot multiple value={value} onValueChange={(e) => setValue(e.value)}>
              <ThreadDrawerModels
                models={info.models}
                defaultModel={info.default_model}
                onModelChange={handleModelChange}
              />
              <ThreadDrawerAgents
                agents={info.agents}
                defaultAgent={info.default_agent}
                onAgentChange={handleAgentChange}
              />
              <ThreadDrawerThreads />
            </AccordionRoot>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </Box>
  );
};
