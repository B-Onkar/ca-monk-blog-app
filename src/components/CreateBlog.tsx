import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, X, Loader2 } from "lucide-react";
import type { CreateBlogInput } from "@/types/blog";

interface CreateBlogProps {
    onClose: () => void;
}

export function CreateBlog({ onClose }: CreateBlogProps) {
    const [formData, setFormData] = useState<CreateBlogInput>({
        title: "",
        category: [],
        description: "",
        coverImage: "",
        content: "",
    });
    const [categoryInput, setCategoryInput] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            onClose();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.content) {
            return;
        }
        mutation.mutate(formData);
    };

    const addCategory = () => {
        const cat = categoryInput.trim().toUpperCase();
        if (cat && !formData.category.includes(cat)) {
            setFormData((prev) => ({
                ...prev,
                category: [...prev.category, cat],
            }));
            setCategoryInput("");
        }
    };

    const removeCategory = (cat: string) => {
        setFormData((prev) => ({
            ...prev,
            category: prev.category.filter((c) => c !== cat),
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
                    <CardTitle className="text-2xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        Create New Blog
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <Input
                                placeholder="Enter blog title..."
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                                }
                                required
                            />
                        </div>

                        {/* Categories */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                                Categories
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add category..."
                                    value={categoryInput}
                                    onChange={(e) => setCategoryInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addCategory();
                                        }
                                    }}
                                />
                                <Button type="button" variant="secondary" onClick={addCategory}>
                                    Add
                                </Button>
                            </div>
                            {formData.category.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.category.map((cat) => (
                                        <span
                                            key={cat}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-700"
                                        >
                                            {cat}
                                            <button
                                                type="button"
                                                onClick={() => removeCategory(cat)}
                                                className="hover:text-violet-900"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                placeholder="Write a short description..."
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                                }
                                className="min-h-[80px]"
                                required
                            />
                        </div>

                        {/* Cover Image URL */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                                Cover Image URL
                            </label>
                            <Input
                                placeholder="https://example.com/image.jpg"
                                value={formData.coverImage}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, coverImage: e.target.value }))
                                }
                            />
                            {formData.coverImage && (
                                <div className="mt-2 rounded-lg overflow-hidden border border-slate-200">
                                    <img
                                        src={formData.coverImage}
                                        alt="Preview"
                                        className="w-full h-32 object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                                Content <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                placeholder="Write your blog content..."
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                                }
                                className="min-h-[200px]"
                                required
                            />
                        </div>

                        {/* Error message */}
                        {mutation.isError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                Failed to create blog. Please try again.
                            </div>
                        )}

                        {/* Submit button */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="flex-1"
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle className="w-4 h-4 mr-2" />
                                        Create Blog
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
