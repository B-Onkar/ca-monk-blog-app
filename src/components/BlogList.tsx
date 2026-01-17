import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "@/api/blogs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Blog } from "@/types/blog";
import { Calendar, Tag } from "lucide-react";

interface BlogListProps {
    onSelectBlog: (blogId: string) => void;
    selectedBlogId: string | null;
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
    const { data: blogs, isLoading, isError, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: getAllBlogs,
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="cursor-pointer">
                        <CardHeader>
                            <div className="flex gap-2 mb-2">
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-5 w-12 rounded-full" />
                            </div>
                            <Skeleton className="h-6 w-3/4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3 mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <div className="text-red-600 font-medium mb-2">Failed to load blogs</div>
                <div className="text-red-500 text-sm">{error.message}</div>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                <div className="text-slate-500 font-medium">No blogs found</div>
                <div className="text-slate-400 text-sm mt-1">Create your first blog to get started!</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {blogs.map((blog: Blog) => (
                <Card
                    key={blog.id}
                    onClick={() => onSelectBlog(blog.id)}
                    className={`cursor-pointer hover:-translate-y-1 ${selectedBlogId === blog.id
                            ? "ring-2 ring-violet-500 border-violet-300"
                            : ""
                        }`}
                >
                    <CardHeader className="pb-3">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {blog.category.map((cat) => (
                                <span
                                    key={cat}
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700"
                                >
                                    <Tag className="w-3 h-3" />
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="line-clamp-2 mb-3">
                            {blog.description}
                        </CardDescription>
                        <div className="flex items-center text-xs text-slate-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(blog.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
