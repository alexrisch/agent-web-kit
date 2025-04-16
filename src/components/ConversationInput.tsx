"use-client";
import { HStack, Button, Textarea } from "@chakra-ui/react";
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
    <HStack w="full" pt={4} px={4}
      data-state="open"
      _open={{
        animation: "slide-from-bottom-full 0.5s ease-out",
      }}
    >
      <Textarea
        flex={1}
        placeholder="Type your message..."
        value={input}
        aria-multiline
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        padding={2}
      />
      <Button colorScheme="blue" onClick={sendMessage} disabled={loading}>
        <FaPaperPlane />
      </Button>
    </HStack>
  );
}

