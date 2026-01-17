export interface Blog {
    id: string;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
    likes?: number;
    dislikes?: number;
}

export interface CreateBlogInput {
    title: string;
    category: string[];
    description: string;
    coverImage: string;
    content: string;
}
