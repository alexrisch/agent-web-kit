import { HStack } from "@chakra-ui/react";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";
import { AccordionItem, AccordionItemContent } from "@/components/ui/accordion";
import { ThreadDrawerAccordionHeader } from './thread-drawer-accordian-header';
import { getSavedModel } from "@/app/utils/storage-utils";

interface ThreadDrawerModelsProps {
  models: string[];
  defaultModel: string;
  onModelChange: (details: { value: string }) => void;
}

export function ThreadDrawerModels({ models, defaultModel, onModelChange }: ThreadDrawerModelsProps) {
  return (
    <AccordionItem key={"models"} value={"models"}>
      <ThreadDrawerAccordionHeader title="Model" />
      <AccordionItemContent>
        <RadioCardRoot pr={2} pl={1} defaultValue={getSavedModel() ?? defaultModel} onValueChange={onModelChange} mb={4}>
          <HStack align="stretch">
            {models.map((item) => (
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
  );
} 