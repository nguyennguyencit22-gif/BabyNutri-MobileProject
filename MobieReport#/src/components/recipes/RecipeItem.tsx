import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RecipeListItem } from '../../types/recipe';

interface Props {
    recipe: RecipeListItem;
    onPress: () => void;
}

const RecipeItem: React.FC<Props> = ({ recipe, onPress }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: recipe.imageUrl }} style={styles.thumb} />
        <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
            <Text style={styles.meta}>{recipe.ageGroup} • {recipe.calories} kcal • {recipe.cookTime} phút</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    row: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 8, marginBottom: 10, alignItems: 'center' },
    thumb: { width: 64, height: 64, borderRadius: 10, marginRight: 12 },
    content: { flex: 1 },
    title: { fontSize: 15, fontWeight: '600', color: '#2E2E2E', marginBottom: 4 },
    meta: { fontSize: 12, color: '#8A8A8A' },
});

export default RecipeItem;