import { ChatMessage } from "@/app/utils/schemaTypes";
import { Box, VStack, HStack, Text, Spinner, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { ConversationInput } from "./ConversationInput";
import { ThreadDrawer } from "./thread-drawer/thread-drawer";

type ConversationProps = {
  messages: ChatMessage[];
  loading: boolean;
  onSendMessage: () => void;
  input: string;
  setInput: (input: string) => void;
  animationMessageIndex: number | null;
};

export const Conversation: FC<ConversationProps> = ({
  messages,
  loading,
  onSendMessage,
  input,
  setInput,
  animationMessageIndex,
}) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box w="full" h="full" display="flex" flexDirection="column" p={4}>
      <Box
        data-state="open"
        _open={{
          animation: "slide-from-left-full 0.5s ease-out",
        }}
      >
        <ThreadDrawer
          open={open}
          onClose={onClose}
          onOpen={onOpen}
        />
      </Box>
      <VStack
        flex={1}
        w="full"
        spaceX={4}
        spaceY={4}
        overflowY="auto"
        align="start"
        data-state="open"
        _open={{
          animation: "fade-in 0.5s ease-out",
        }}
      >
        {messages.map((msg, index) => {
          const fromAi = msg.type === "ai";
          return (
            <HStack
              key={index}
              alignSelf={fromAi ? "flex-start" : "flex-end"}
              bg={fromAi ? "gray.200" : "blue.500"}
              color={fromAi ? "black" : "white"}
              px={4}
              py={2}
              borderRadius={"md"}
              maxW="80%"
              data-state={index === animationMessageIndex ? "open" : "closed"}
              _open={{
                animation: "slide-from-bottom-full 0.5s ease-out",
              }}
            >
              {/* {msg.type === "ai" && <Avatar size="xs" name="AI" />} */}
              <Text>{msg.content}</Text>
            </HStack>
          );
        }
        )}
        {loading && <Spinner size="sm" alignSelf="flex-start" />}
      </VStack>
      <ConversationInput input={input} setInput={setInput} sendMessage={onSendMessage} loading={loading} />
    </Box>
  );
};