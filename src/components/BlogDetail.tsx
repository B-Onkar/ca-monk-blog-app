import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/api/blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Tag, ThumbsUp, ThumbsDown, Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogDetailProps {
    blogId: string | null;
    onBack: () => void;
}

export function BlogDetail({ blogId, onBack }: BlogDetailProps) {
    const [likes, setLikes] = useState<number | null>(null);
    const [dislikes, setDislikes] = useState<number | null>(null);
    const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
    const [copied, setCopied] = useState(false);

    const { data: blog, isLoading, isError, error } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => getBlogById(blogId!),
        enabled: !!blogId,
    });

    // Initialize likes/dislikes when blog loads
    if (blog && likes === null) {
        setLikes(blog.likes ?? 0);
        setDislikes(blog.dislikes ?? 0);
    }

    const handleLike = () => {
        if (userReaction === 'like') {
            setLikes((prev) => (prev ?? 0) - 1);
            setUserReaction(null);
        } else {
            if (userReaction === 'dislike') {
                setDislikes((prev) => (prev ?? 0) - 1);
            }
            setLikes((prev) => (prev ?? 0) + 1);
            setUserReaction('like');
        }
    };

    const handleDislike = () => {
        if (userReaction === 'dislike') {
            setDislikes((prev) => (prev ?? 0) - 1);
            setUserReaction(null);
        } else {
            if (userReaction === 'like') {
                setLikes((prev) => (prev ?? 0) - 1);
            }
            setDislikes((prev) => (prev ?? 0) + 1);
            setUserReaction('dislike');
        }
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;
        const shareText = blog ? `Check out this blog: ${blog.title}` : 'Check out this blog!';

        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog?.title,
                    text: shareText,
                    url: shareUrl,
                });
            } catch {
                // User cancelled or share failed
                copyToClipboard();
            }
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!blogId) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8">
                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="text-lg font-medium text-slate-500">Select a blog to read</p>
                <p className="text-sm text-slate-400 mt-1">Choose from the list on the left</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-6 p-6">
                <Skeleton className="w-full h-64 rounded-2xl" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
                    <div className="text-red-600 font-medium mb-2">Failed to load blog</div>
                    <div className="text-red-500 text-sm">{error.message}</div>
                    <Button variant="outline" onClick={onBack} className="mt-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto p-6">
                {/* Back button for mobile */}
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-4 lg:hidden"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to blogs
                </Button>

                {/* Cover image */}
                <div className="relative rounded-2xl overflow-hidden mb-6 shadow-2xl">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.category.map((cat) => (
                        <span
                            key={cat}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/25"
                        >
                            <Tag className="w-3.5 h-3.5" />
                            {cat}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                    {blog.title}
                </h1>

                {/* Date */}
                <div className="flex items-center text-slate-500 mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(blog.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>

                {/* Action buttons - Likes, Dislikes, Share */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
                    <Button
                        variant={userReaction === 'like' ? 'default' : 'outline'}
                        size="sm"
                        onClick={handleLike}
                        className={userReaction === 'like' ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-0' : ''}
                    >
                        <ThumbsUp className={`w-4 h-4 mr-1.5 ${userReaction === 'like' ? 'fill-white' : ''}`} />
                        {likes ?? 0}
                    </Button>
                    <Button
                        variant={userReaction === 'dislike' ? 'default' : 'outline'}
                        size="sm"
                        onClick={handleDislike}
                        className={userReaction === 'dislike' ? 'bg-gradient-to-r from-red-500 to-rose-500 border-0' : ''}
                    >
                        <ThumbsDown className={`w-4 h-4 mr-1.5 ${userReaction === 'dislike' ? 'fill-white' : ''}`} />
                        {dislikes ?? 0}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="ml-auto"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 mr-1.5 text-green-500" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Share2 className="w-4 h-4 mr-1.5" />
                                Share
                            </>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                    >
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>

                {/* Description */}
                <p className="text-lg text-slate-600 mb-6 font-medium leading-relaxed">
                    {blog.description}
                </p>

                {/* Content */}
                <div className="prose prose-slate prose-lg max-w-none">
                    {blog.content.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="text-slate-700 leading-relaxed mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
