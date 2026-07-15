import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MealPlan } from '../../types/meal-plan';

interface MealPlanCardProps {
  mealPlan: MealPlan;
  onPress?: () => void;
}

export const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.date}>Date: {mealPlan.date}</Text>
        <Text style={styles.calories}>{mealPlan.totalCalories} kcal</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>Meals: {mealPlan.meals.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  calories: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
  },
  details: {
    marginTop: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});
