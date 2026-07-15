import { Question } from '../types/question';

// Mock Data
let mockQuestions: Question[] = [
  {
    id: '1',
    title: 'What should my 1-year-old eat?',
    content: 'A 1-year-old should have a balanced diet including fruits, vegetables, grains, protein foods, and dairy. Breastmilk or whole milk is also important.',
    category: 'Nutrition',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'How to handle a picky eater?',
    content: 'Offer a variety of healthy foods, let them choose what to eat from the options provided, and avoid pressuring them. Keep offering new foods multiple times.',
    category: 'Behavior',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'How much water should a toddler drink?',
    content: 'Toddlers (1-3 years) need about 4 cups of beverages per day, including water and milk.',
    category: 'Hydration',
    createdAt: new Date().toISOString(),
  }
];

export const questionService = {
  getQuestions: async (): Promise<Question[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockQuestions]);
      }, 500);
    });
  }
};
