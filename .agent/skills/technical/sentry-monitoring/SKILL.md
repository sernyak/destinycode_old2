---
name: sentry-monitoring
description: Setup AI Agent Monitoring in any project.
---

# AI Agent Monitoring Setup

## When to Use This Skill
Invoke this skill when:
- Asked to "setup AI monitoring" or "add AI agent tracking".
- Needing to "monitor LLM calls" or "track AI usage".
- Requested "AI observability" or "agent monitoring".
- Mentions of tracking token usage, model latency, or AI costs.
- Asked about instrumenting AI/LLM code for monitoring.

## CRITICAL: Detection-First Approach
ALWAYS detect installed AI SDKs before suggesting configuration. Do not assume which AI library is being used.

## Required Workflow

### Step 1: Detect Platform and AI SDKs
- **JavaScript/TypeScript**: Check for libraries like OpenAI, Anthropic, Vercel AI SDK, LangChain, Google GenAI.
- **Python**: Check for OpenAI, Anthropic, LangChain, Hugging Face Hub.

### Step 2: Verify Monitoring SDK Version
- Ensure the core monitoring SDK is updated to a version that supports AI features.

### Step 3: Verify Tracing is Enabled
- Tracing is required. Check initialization for sampling rates (e.g., `tracesSampleRate`).

### Step 4: Configure Based on Detected SDK
Provide specific integration configurations for the detected platform:
- **OpenAI/Anthropic Integrations**: Add specific integration modules to the initialization.
- **Vercel AI SDK**: Enable experimental telemetry.
- **LangChain/LangGraph**: Configure callbacks or specialized integrations.

## Manual Instrumentation (Last Resort)
If no official integration exists, use manual span creation. Use specific span types:
- `ai.chat_completions`
- `ai.embeddings`
- `ai.tools`
- `ai.agents`

## Span Attributes Reference
Include required attributes for optimal monitoring:
- `ai.model_id`
- `ai.total_tokens`
- `ai.prompt` / `ai.completion` (respecting privacy/PII).
- `ai.latency`

## Summary Checklist
- AI SDK(s) detected.
- SDK version verified.
- Tracing enabled.
- Integrations added to initialization.
- Input/output recording configured (optional).
- Privacy/PII settings reviewed.
