import { Heading } from '@chakra-ui/react';
import { AccordionItemTrigger } from '@/components/ui/accordion';

interface ThreadDrawerAccordionHeaderProps {
  title: string;
}

export function ThreadDrawerAccordionHeader({ title }: ThreadDrawerAccordionHeaderProps) {
  return (
    <AccordionItemTrigger>
      <Heading size={"xl"} fontSize={"xl"} fontWeight={"bold"} mt={2}>
        {title}
      </Heading>
    </AccordionItemTrigger>
  );
}
