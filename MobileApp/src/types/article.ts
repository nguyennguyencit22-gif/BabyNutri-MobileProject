export interface Article {
    id: number;
    title: string;
    summary: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedAt: string;
}

export interface ArticleListItem {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
    publishedAt: string;
}