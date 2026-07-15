export type AgeGroup = string;

export interface Recipe {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    instructions: string[];
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    ageGroup: AgeGroup;
    category: string;
    cookTime: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface RecipeListItem {
    id: number;
    title: string;
    imageUrl: string;
    ageGroup: AgeGroup;
    calories: number;
    cookTime: number;
}

export interface CreateRecipeDTO {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    calories: number;
    imageUrl: string;
    ageGroup: AgeGroup;
    category?: string;
    cookTime?: number;
}

export type UpdateRecipeDTO = Partial<CreateRecipeDTO>;

export interface RecipeSearchParams {
    query?: string;
    ageGroup?: AgeGroup;
    category?: string;
}