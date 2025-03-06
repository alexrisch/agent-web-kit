
import axios from "axios";
import { ChatHistory, ChatHistoryInput, ChatMessage, Feedback, ServiceMetadata, StreamInput, UserInput } from "./schemaTypes";
import { AllModelEnum } from "./models";


const AgentClientError = Error;

type AgentClientConstructorParams = {
  base_url: string;
  agent?: string;
  timeout?: number;
};

type AgentClientInvokeParams = {
  message: string;
  model?: AllModelEnum;
  thread_id?: string;
  agent_config?: Record<string, any>;
};


export class AgentClient {
  base_url: string;
  auth_secret: string | undefined;
  timeout: number | undefined;
  agent: string | null;

  constructor(
    {
      base_url = "http://0.0.0.0",
      agent,
      timeout,
    }: AgentClientConstructorParams
  ) {
    this.base_url = base_url;
    this.auth_secret = process.env.AUTH_SECRET;
    this.timeout = timeout;
    this.agent = null;
    if (agent) {
      this.updateAgent(agent);
    }
  }

  get headers() {
    let headers: Record<string, string> = {};
    if (this.auth_secret) {
      headers["Authorization"] = `Bearer ${this.auth_secret}`;
    }
    return headers;
  }

  updateAgent(agent: string, verify: boolean = true) {
    this.agent = agent;
  }

  async ainvoke(
    {
      message,
      model,
      thread_id,
      agent_config
    }: AgentClientInvokeParams
  ) {
    if (!this.agent) {
      throw new Error("No agent selected. Use update_agent() to select an agent.");
    }
    const request: UserInput = { message };
    if (thread_id) {
      request.thread_id = thread_id;
    }
    if (model) {
      request.model = model;
    }
    if (agent_config) {
      request.agent_config = agent_config;
    }
    try {
      const response = await axios.post<ChatMessage>(
        `${this.base_url}/${this.agent}/invoke`,
        request,
        { headers: this.headers, timeout: this.timeout }
      );
      return response.data;
    } catch (e) {
      throw new AgentClientError(`Error: ${e}`);
    }
  }


  /**
   *  Stream the agent's response asynchronously.
  
          Each intermediate message of the agent process is yielded as an AnyMessage.
          If stream_tokens is True(the default value), the response will also yield
          content tokens from streaming modelsas they are generated.
   */
  // async astream(
  //   message: string,
  //   model: AllModelEnum | undefined = undefined,
  //   thread_id: string | undefined = undefined,
  //   agent_config: Record<string, any> | undefined = undefined,
  //   stream_tokens: boolean = true,
  // ): Promise<ChatMessage | string> {
  //   if (!this.agent) {
  //     throw new AgentClientError("No agent selected. Use update_agent() to select an agent.");
  //   }
  //   const request: StreamInput = { message, stream_tokens };
  //   if (thread_id) {
  //     request.thread_id = thread_id
  //   }
  //   if (model) {
  //     request.model = model
  //   }
  //   if (agent_config) {
  //     request.agent_config = agent_config
  //   }
  //   // TODO: Implement streaming
  // }


  /**
   * 
   * Create a feedback record for a run.

    This is a simple wrapper for the LangSmith create_feedback API, so the
    credentials can be stored and managed in the service rather than the client.
    See: https://api.smith.langchain.com/redoc#tag/feedback/operation/create_feedback_api_v1_feedback_post

   * @param run_id 
   * @param key 
   * @param score 
   * @param kwargs 
   * @returns 
   */
  async acreate_feedback(
    run_id: string,
    key: string,
    score: number,
    kwargs: object = {}
  ) {
    const request: Feedback = { run_id, key, score, kwargs }
    try {
      const response = await axios.post(
        `${this.base_url}/feedback`,
        {

          request,
          headers: this.headers,
          timeout: this.timeout,
        }
      )
      return response.data;
    } catch (err) {
      throw new AgentClientError(`Error: ${err}`)
    }

  }

  async getHistory(thread_id: string): Promise<ChatHistory> {
    const request: ChatHistoryInput = { thread_id: thread_id };
    try {
      const response = await axios.post<ChatHistory>(
        `${this.base_url}/history`,
        request,
        { headers: this.headers, timeout: this.timeout }
      );
      return response.data;
    } catch (e) {
      throw new AgentClientError(`Error: ${e}`);
    }
  }

  async invoke(
    { message, model, thread_id, agent_config }: AgentClientInvokeParams
  ): Promise<ChatMessage> {
    if (!this.agent) {
      throw new AgentClientError("No agent selected. Use updateAgent() to select an agent.");
    }
    const request: UserInput = { message };
    if (thread_id) {
      request.thread_id = thread_id;
    }
    if (model) {
      request.model = model;
    }
    if (agent_config) {
      request.agent_config = agent_config;
    }
    try {
      const response = await axios.post<ChatMessage>(
        `${this.base_url}/${this.agent}/invoke`,
        request,
        { headers: this.headers, timeout: this.timeout }
      );
      return response.data;
    } catch (e) {
      throw new AgentClientError(`Error: ${e}`);
    }
  }

  _parseStreamLine(line: string): ChatMessage | string | undefined {
    const trimmed = line.trim();
    if (trimmed.startsWith("data: ")) {
      const data = trimmed.substring(6);
      if (data === "[DONE]") {
        return undefined;
      }
      try {
        const parsed = JSON.parse(data);
        switch (parsed.type) {
          case "message":
            try {
              return parsed.content as ChatMessage;
            } catch (e) {
              throw new Error(`Server returned invalid message: ${e}`);
            }
          case "token":
            return parsed.content;
          case "error":
            throw new Error(parsed.content);
          default:
            return undefined;
        }
      } catch (e) {
        throw new Error(`Error JSON parsing message from server: ${e}`);
      }
    }
    return undefined;
  }
}
