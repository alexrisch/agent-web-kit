"use-client";
import { HStack, Input, Button } from "@chakra-ui/react";
import { FC } from "react";
import { FaPaperPlane } from "react-icons/fa";

type ConversationInputProps = {
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  loading: boolean;
};

export const ConversationInput: FC<ConversationInputProps> = ({
  input,
  setInput,
  sendMessage,
  loading,
}) => {
  return (
    <HStack w="full" pt={4} px={4}>
      <Input
        flex={1}
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button colorScheme="blue" onClick={sendMessage} disabled={loading}>
        <FaPaperPlane />
      </Button>
    </HStack>
  );
}

