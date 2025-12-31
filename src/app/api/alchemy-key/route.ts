import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In prod, use non-prefixed env vars (set in Vercel)
    // In dev, fall back to NEXT_PUBLIC_ prefixed vars
    const apiKey = process.env.ALCHEMY_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
    const policyId = process.env.ALCHEMY_POLICY_ID || process.env.NEXT_PUBLIC_ALCHEMY_POLICY_ID;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Alchemy API key not configured" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      apiKey,
      policyId: policyId || null
    });
  } catch (error) {
    console.error("Error fetching Alchemy config:", error);
    return NextResponse.json(
      { error: "Failed to fetch Alchemy config" },
      { status: 500 }
    );
  }
}

