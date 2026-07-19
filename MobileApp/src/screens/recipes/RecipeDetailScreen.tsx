import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { recipeService } from '../../services/recipe.service';
import { Recipe } from '../../types/recipe';
import IngredientItem from '../../components/recipes/IngredientItem';

const RecipeDetailScreen = ({ route }: any) => {
    const { id } = route.params;
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        recipeService
            .getById(id)
            .then(setRecipe)
            .catch((e) => console.error('Load detail error:', e))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF7A59" /></View>;
    if (!recipe) return <View style={styles.center}><Text>Không tìm thấy công thức</Text></View>;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{recipe.title}</Text>
                <Text style={styles.desc}>{recipe.description}</Text>

                <View style={styles.nutritionRow}>
                    <NutritionBox label="Calories" value={`${recipe.calories}`} />
                    <NutritionBox label="Protein" value={`${recipe.protein}g`} />
                    <NutritionBox label="Fat" value={`${recipe.fat}g`} />
                    <NutritionBox label="Carb" value={`${recipe.carbohydrate}g`} />
                </View>

                <Text style={styles.meta}>Độ tuổi phù hợp: {recipe.ageGroup}</Text>

                <Text style={styles.section}>Nguyên liệu</Text>
                {recipe.ingredients.map((ing, i) => <IngredientItem key={i} name={ing} />)}

                <Text style={styles.section}>Hướng dẫn nấu</Text>
                {recipe.instructions.map((step, i) => (
                    <View key={i} style={styles.stepRow}>
                        <Text style={styles.stepNumber}>{i + 1}</Text>
                        <Text style={styles.stepText}>{step}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const NutritionBox = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.nutBox}>
        <Text style={styles.nutValue}>{value}</Text>
        <Text style={styles.nutLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFBF5' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: 260 },
    content: { padding: 18 },
    title: { fontSize: 22, fontWeight: '800', color: '#2E2E2E', marginBottom: 6 },
    desc: { fontSize: 14, color: '#6B6B6B', marginBottom: 16, lineHeight: 20 },
    nutritionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
    nutBox: { backgroundColor: '#FFF1E6', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, alignItems: 'center', flex: 1, marginRight: 8 },
    nutValue: { fontSize: 16, fontWeight: '700', color: '#FF7A59' },
    nutLabel: { fontSize: 11, color: '#8A5A44', marginTop: 2 },
    meta: { fontSize: 13, color: '#6B6B6B', marginBottom: 18 },
    section: { fontSize: 17, fontWeight: '700', color: '#2E2E2E', marginTop: 8, marginBottom: 10 },
    stepRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
    stepNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF7A59', color: '#fff', textAlign: 'center', lineHeight: 24, fontSize: 12, fontWeight: '700', marginRight: 10 },
    stepText: { flex: 1, fontSize: 14, color: '#3A3A3A', lineHeight: 20 },
});

export default RecipeDetailScreen;