'use client';

import { useApiKeys } from '@/contexts/ApiKeysContext';

/**
 * Hook for making API requests with automatic API key injection
 */
export function useApiRequest() {
  const { apiKeys } = useApiKeys();

  const makeRequest = async (url: string, options: RequestInit = {}) => {
    // Prepare headers with API keys
    const headers = new Headers(options.headers);

    // Add API keys to headers
    // Only forward keys needed (OpenRouter + E2B)
    if (apiKeys.e2b) {
      headers.set('x-e2b-api-key', apiKeys.e2b);
    }
    if (apiKeys.openrouter) {
      headers.set('x-openrouter-api-key', apiKeys.openrouter);
    }

    // Make the request with updated headers
    return fetch(url, {
      ...options,
      headers
    });
  };

  const makeRequestWithBody = async (url: string, body: any, options: RequestInit = {}) => {
    // Add API keys to the request body as well for compatibility
    const bodyWithKeys = {
      ...body,
      groqApiKey: undefined,
      e2bApiKey: apiKeys.e2b,
      anthropicApiKey: undefined,
      openaiApiKey: undefined,
      openrouterApiKey: apiKeys.openrouter,
      geminiApiKey: undefined,
      // Pass custom OpenRouter model if present in settings
      openrouterModel: apiKeys.openrouterModel,
    };

    return makeRequest(url, {
      ...options,
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(bodyWithKeys)
    });
  };

  return {
    makeRequest,
    makeRequestWithBody,
    hasRequiredKeys: !!(apiKeys.e2b)
  };
}
