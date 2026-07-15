import { MealPlan } from '../types/meal-plan';

// Mock Data
let mockMealPlans: MealPlan[] = [
  {
    id: '1',
    childId: '1',
    date: '2023-10-15',
    totalCalories: 1200,
    meals: [
      {
        id: 'm1',
        name: 'Breakfast',
        time: '08:00 AM',
        description: 'Oatmeal with banana and milk',
        calories: 350
      },
      {
        id: 'm2',
        name: 'Lunch',
        time: '12:00 PM',
        description: 'Chicken soup with vegetables and rice',
        calories: 450
      }
    ],
    createdAt: new Date().toISOString(),
  }
];

export const mealPlanService = {
  getMealPlans: async (childId?: string): Promise<MealPlan[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (childId) {
          resolve(mockMealPlans.filter(mp => mp.childId === childId));
        } else {
          resolve([...mockMealPlans]);
        }
      }, 500);
    });
  },

  getMealPlanById: async (id: string): Promise<MealPlan | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMealPlans.find(mp => mp.id === id));
      }, 500);
    });
  },

  createMealPlan: async (mealPlanData: Omit<MealPlan, 'id' | 'createdAt'>): Promise<MealPlan> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMealPlan: MealPlan = {
          ...mealPlanData,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date().toISOString(),
        };
        mockMealPlans.push(newMealPlan);
        resolve(newMealPlan);
      }, 500);
    });
  },

  updateMealPlan: async (id: string, mealPlanData: Partial<MealPlan>): Promise<MealPlan> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockMealPlans.findIndex(mp => mp.id === id);
        if (index !== -1) {
          mockMealPlans[index] = {
            ...mockMealPlans[index],
            ...mealPlanData,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockMealPlans[index]);
        } else {
          reject(new Error('Meal Plan not found'));
        }
      }, 500);
    });
  },

  deleteMealPlan: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockMealPlans.length;
        mockMealPlans = mockMealPlans.filter(mp => mp.id !== id);
        resolve(mockMealPlans.length < initialLength);
      }, 500);
    });
  }
};
