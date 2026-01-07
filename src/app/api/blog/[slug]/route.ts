import { NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/utils/blog";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = getBlogPostBySlug(params.slug);
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}



