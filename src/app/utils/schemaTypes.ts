import { AllModelEnum } from "./models";

/**
 * Info about an available agent.
 */
export type AgentInfo = {
  /**
   * Agent key
   * example: research-assistant
   */
  key: string;
  /**
   * Description of the agent.
   * Example: A research assistant for generating research papers.
   */
  description: string;
};

/**
 * Metadata about the service including available agents and models.
 */
export type ServiceMetadata = {
  /**
   * List of available agents.
   */
  agents: AgentInfo[];
  /**
   * List of available LLMs.
   */
  models: AllModelEnum[];
  /**
   * Default agent used when none is specified.
   * example: research-assistant
   */
  default_agent: string;
  /**
   * Default model used when none is specified.
   */
  default_model: AllModelEnum;
};

/**
 * Basic user input for the agent.
 */
export type UserInput = {
  /**
   * User input to the agent.
   * example: What is the weather in Tokyo?
   */
  message: string;
  /**
   * LLM Model to use for the agent.
   * examples: [OpenAIModelName.GPT_4O_MINI, AnthropicModelName.HAIKU_35]
   */
  model?: AllModelEnum;
  /**
   * Thread ID to persist and continue a multi-turn conversation.
   * example: 847c6285-8fc9-4560-a83f-4e6285809254
   */
  thread_id?: string;
  /**
   * Additional configuration to pass through to the agent.
   * example: { spicy_level: 0.8 }
   */
  agent_config?: Record<string, unknown>;
};

/**
 * User input for streaming the agent's response.
 */
export type StreamInput = UserInput & {
  /**
   * Whether to stream LLM tokens to the client.
   */
  stream_tokens?: boolean;
};

/**
 * Represents a request to call a tool.
 */
export type ToolCall = {
  /**
   * The name of the tool to be called.
   */
  name: string;
  /**
   * The arguments to the tool call.
   */
  args: Record<string, unknown>;
  /**
   * An identifier associated with the tool call.
   */
  id: string | null;
  /**
   * Type marker for tool call.
   */
  type?: "tool_call";
};

/**
 * Message in a chat.
 */
export type ChatMessage = {
  /**
   * Role of the message.
   * examples: ["human", "ai", "tool", "custom"]
   */
  type: "human" | "ai" | "tool" | "custom";
  /**
   * Content of the message.
   * example: Hello, world!
   */
  content: string;
  /**
   * Tool calls in the message.
   */
  tool_calls?: ToolCall[];
  /**
   * Tool call that this message is responding to.
   * example: call_Jja7J89XsjrOLA5r!MEOW!SL
   */
  tool_call_id?: string | null;
  /**
   * Run ID of the message.
   * example: 847c6285-8fc9-4560-a83f-4e6285809254
   */
  run_id?: string | null;
  /**
   * Response metadata. For example: response headers, logprobs, token counts.
   */
  response_metadata?: Record<string, unknown>;
  /**
   * Custom message data.
   */
  custom_data?: Record<string, unknown>;
};

/**
 * Feedback for a run, to record to LangSmith.
 */
export type Feedback = {
  /**
   * Run ID to record feedback for.
   * example: 847c6285-8fc9-4560-a83f-4e6285809254
   */
  run_id: string;
  /**
   * Feedback key.
   * example: human-feedback-stars
   */
  key: string;
  /**
   * Feedback score.
   * example: 0.8
   */
  score: number;
  /**
   * Additional feedback kwargs, passed to LangSmith.
   * example: { comment: "In-line human feedback" }
   */
  kwargs?: Record<string, unknown>;
};

/**
 * Response indicating successful feedback submission.
 */
export type FeedbackResponse = {
  status: "success";
};

/**
 * Input for retrieving chat history.
 */
export type ChatHistoryInput = {
  /**
   * Thread ID to persist and continue a multi-turn conversation.
   * example: 847c6285-8fc9-4560-a83f-4e6285809254
   */
  thread_id: string;
};

/**
 * Chat history comprising a list of messages.
 */
export type ChatHistory = {
  messages: ChatMessage[];
};

