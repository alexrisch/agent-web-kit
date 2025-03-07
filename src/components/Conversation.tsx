import { ChatMessage } from "@/app/utils/schemaTypes";
import { Box, VStack, HStack, Text, Spinner, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { ConversationInput } from "./ConversationInput";
import { ThreadDrawer } from "./ThreadDrawer";

type ConversationProps = {
  messages: ChatMessage[];
  loading: boolean;
  onSendMessage: () => void;
  input: string;
  setInput: (input: string) => void;
};

export const Conversation: FC<ConversationProps> = ({
  messages,
  loading,
  onSendMessage,
  input,
  setInput,
}) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box w="full" h="full" display="flex" flexDirection="column" p={4}>
      <Box>
        <ThreadDrawer
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          onNewThread={() => { }}
          threads={[]}
        />
      </Box>
      <VStack flex={1} w="full" spaceX={4} spaceY={4} overflowY="auto" align="start">
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