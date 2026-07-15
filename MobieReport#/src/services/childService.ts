import { Child } from '../types/child';

// Mock Data
let mockChildren: Child[] = [
  {
    id: '1',
    name: 'Emily Tran',
    age: 3,
    gender: 'Female',
    height: 95,
    weight: 14.5,
    allergies: ['Peanuts'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Kevin Nguyen',
    age: 5,
    gender: 'Male',
    height: 110,
    weight: 18.2,
    allergies: [],
    createdAt: new Date().toISOString(),
  }
];

export const childService = {
  getChildren: async (): Promise<Child[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockChildren]), 500));
  },

  getChildById: async (id: string): Promise<Child | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const child = mockChildren.find(c => c.id === id);
        resolve(child);
      }, 500);
    });
  },

  createChild: async (childData: Omit<Child, 'id' | 'createdAt'>): Promise<Child> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newChild: Child = {
          ...childData,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date().toISOString(),
        };
        mockChildren.push(newChild);
        resolve(newChild);
      }, 500);
    });
  },

  updateChild: async (id: string, childData: Partial<Child>): Promise<Child> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockChildren.findIndex(c => c.id === id);
        if (index !== -1) {
          mockChildren[index] = {
            ...mockChildren[index],
            ...childData,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockChildren[index]);
        } else {
          reject(new Error('Child not found'));
        }
      }, 500);
    });
  },

  deleteChild: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockChildren.length;
        mockChildren = mockChildren.filter(c => c.id !== id);
        resolve(mockChildren.length < initialLength);
      }, 500);
    });
  }
};
