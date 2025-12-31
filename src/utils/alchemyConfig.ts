export async function getAlchemyConfig(): Promise<{ apiKey: string | null; policyId: string | null }> {
  try {
    const response = await fetch('/api/alchemy-key');
    if (!response.ok) {
      return { apiKey: null, policyId: null };
    }
    const data = await response.json();
    return {
      apiKey: data.apiKey || null,
      policyId: data.policyId || null
    };
  } catch (error) {
    console.error('Error fetching Alchemy config:', error);
    return { apiKey: null, policyId: null };
  }
}

// Legacy function for backwards compatibility
export async function getAlchemyApiKey(): Promise<string | null> {
  const config = await getAlchemyConfig();
  return config.apiKey;
}

export async function getPaymasterCapabilities(): Promise<{ paymasterService: { policyId: string } } | null> {
  try {
    const response = await fetch('/api/paymaster');
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching paymaster capabilities:', error);
    return null;
  }
}

