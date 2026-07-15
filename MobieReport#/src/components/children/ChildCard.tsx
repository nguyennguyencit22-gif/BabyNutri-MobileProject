import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Child } from '../../types/child';

interface ChildCardProps {
  child: Child;
  onPress?: () => void;
}

export const ChildCard: React.FC<ChildCardProps> = ({ child, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.name}>{child.name}</Text>
        <Text style={styles.age}>{child.age} yrs</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>Gender: {child.gender}</Text>
        <Text style={styles.detailText}>Height: {child.height} cm</Text>
        <Text style={styles.detailText}>Weight: {child.weight} kg</Text>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  age: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  details: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
