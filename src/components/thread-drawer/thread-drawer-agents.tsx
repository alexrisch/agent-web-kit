import { HStack } from "@chakra-ui/react";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";
import { AccordionItem, AccordionItemContent } from "@/components/ui/accordion";
import { ThreadDrawerAccordionHeader } from './thread-drawer-accordian-header';
import { getSavedAgent } from "@/app/utils/storage-utils";

interface Agent {
  key: string;
  description: string;
}

interface ThreadDrawerAgentsProps {
  agents: Agent[];
  defaultAgent: string;
  onAgentChange: (details: { value: string }) => void;
}

export function ThreadDrawerAgents({ agents, defaultAgent, onAgentChange }: ThreadDrawerAgentsProps) {
  return (
    <AccordionItem key={"agents"} value={"agents"}>
      <ThreadDrawerAccordionHeader title="Agent" />
      <AccordionItemContent>
        <RadioCardRoot pr={2} pl={1} defaultValue={getSavedAgent() ?? defaultAgent} onValueChange={onAgentChange} mb={4}>
          <HStack align="stretch" flexWrap={'wrap'}>
            {agents.map((item) => (
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
  );
} 