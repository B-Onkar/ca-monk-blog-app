import type { Blog, CreateBlogInput } from "@/types/blog";

const API_URL = "http://localhost:3001";

export async function getAllBlogs(): Promise<Blog[]> {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) {
        throw new Error("Failed to fetch blogs");
    }
    return response.json();
}

export async function getBlogById(id: string): Promise<Blog> {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch blog");
    }
    return response.json();
}

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
    const response = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...input,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to create blog");
    }
    return response.json();
}
