// Available providers
export type Provider =
  | 'OPENAI'
  | 'AZURE_OPENAI'
  | 'DEEPSEEK'
  | 'ANTHROPIC'
  | 'GOOGLE'
  | 'GROQ'
  | 'AWS'
  | 'OLLAMA'
  | 'FAKE';

// OpenAI model names: https://platform.openai.com/docs/models/gpt-4o
export type OpenAIModelName = 'gpt-4o-mini' | 'gpt-4o';

// Azure OpenAI model names
export type AzureOpenAIModelName = 'azure-gpt-4o' | 'azure-gpt-4o-mini';

// Deepseek model name: https://api-docs.deepseek.com/quick_start/pricing
export type DeepseekModelName = 'deepseek-chat';

// Anthropic model names: https://docs.anthropic.com/en/docs/about-claude/models#model-names
export type AnthropicModelName = 'claude-3-haiku' | 'claude-3.5-haiku' | 'claude-3.5-sonnet';

// Google model names: https://ai.google.dev/gemini-api/docs/models/gemini
export type GoogleModelName = 'gemini-1.5-flash';

// Groq model names: https://console.groq.com/docs/models
export type GroqModelName =
  | 'groq-llama-3.1-8b'
  | 'groq-llama-3.3-70b'
  | 'groq-llama-guard-3-8b';

// AWS model names: https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html
export type AWSModelName = 'bedrock-3.5-haiku';

// Ollama model names: https://ollama.com/search
export type OllamaModelName = 'ollama';

// Fake model for testing.
export type FakeModelName = 'fake';

// Union type for all model names.
export type AllModelEnum =
  | OpenAIModelName
  | AzureOpenAIModelName
  | DeepseekModelName
  | AnthropicModelName
  | GoogleModelName
  | GroqModelName
  | AWSModelName
  | OllamaModelName
  | FakeModelName;
  