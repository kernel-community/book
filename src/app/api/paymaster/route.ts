import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In prod, use non-prefixed env vars (set in Vercel)
    // In dev, fall back to NEXT_PUBLIC_ prefixed vars
    const policyId = process.env.ALCHEMY_PAYMASTER_POLICY_ID || process.env.NEXT_PUBLIC_ALCHEMY_PAYMASTER_POLICY_ID;
    
    if (!policyId) {
      return NextResponse.json(
        { error: "Alchemy paymaster policy ID not configured" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      paymasterService: {
        policyId: policyId
      }
    });
  } catch (error) {
    console.error("Error fetching paymaster capabilities:", error);
    return NextResponse.json(
      { error: "Failed to fetch paymaster capabilities" },
      { status: 500 }
    );
  }
}

