import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { recipeService } from '../../services/recipe.service';

const EditRecipeScreen = ({ route, navigation }: any) => {
    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [calories, setCalories] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);

    useEffect(() => {
        recipeService
            .getById(id)
            .then((r) => {
                setTitle(r.title);
                setDescription(r.description);
                setImageUrl(r.imageUrl);
                setCalories(String(r.calories));
                setIngredients(r.ingredients);
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    }, [id]);

    const updateIngredient = (index: number, value: string) => {
        const copy = [...ingredients];
        copy[index] = value;
        setIngredients(copy);
    };

    const handleSave = async () => {
        setSubmitting(true);
        try {
            await recipeService.update(id, {
                title,
                description,
                imageUrl,
                calories: Number(calories),
                ingredients: ingredients.filter((i) => i.trim()),
            });
            Alert.alert('Thành công', 'Đã cập nhật công thức', [{ text: 'OK', onPress: () => navigation.goBack() }]);
        } catch (e) {
            console.error('Update recipe error:', e);
            Alert.alert('Lỗi', 'Không thể cập nhật, thử lại sau');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF7A59" /></View>;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.label}>Tên món</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />

            <Text style={styles.label}>Mô tả</Text>
            <TextInput style={[styles.input, styles.multiline]} value={description} onChangeText={setDescription} multiline />

            <Text style={styles.label}>Ảnh (URL)</Text>
            <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />

            <Text style={styles.label}>Calories</Text>
            <TextInput style={styles.input} value={calories} onChangeText={setCalories} keyboardType="numeric" />

            <Text style={styles.section}>Thành phần</Text>
            {ingredients.map((ing, i) => (
                <TextInput key={i} style={[styles.input, { marginBottom: 8 }]} value={ing} onChangeText={(v) => updateIngredient(i, v)} />
            ))}

            <TouchableOpacity style={styles.submitBtn} onPress={handleSave} disabled={submitting}>
                <Text style={styles.submitText}>{submitting ? 'Đang lưu...' : 'Lưu thay đổi'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFBF5' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    content: { padding: 18, paddingBottom: 40 },
    label: { fontSize: 13, fontWeight: '600', color: '#6B6B6B', marginBottom: 6, marginTop: 12 },
    input: { backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, borderWidth: 1, borderColor: '#EEE' },
    multiline: { height: 80, textAlignVertical: 'top' },
    section: { fontSize: 16, fontWeight: '700', color: '#2E2E2E', marginTop: 20, marginBottom: 8 },
    submitBtn: { backgroundColor: '#FF7A59', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 28 },
    submitText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

export default EditRecipeScreen;