import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { recipeService } from '../../services/recipe.service';

const AddRecipeScreen = ({ navigation }: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [calories, setCalories] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [instructions, setInstructions] = useState<string[]>(['']);
    const [submitting, setSubmitting] = useState(false);

    const updateListItem = (list: string[], setList: (v: string[]) => void, index: number, value: string) => {
        const copy = [...list];
        copy[index] = value;
        setList(copy);
    };
    const addListItem = (list: string[], setList: (v: string[]) => void) => setList([...list, '']);
    const removeListItem = (list: string[], setList: (v: string[]) => void, index: number) =>
        setList(list.filter((_, i) => i !== index));

    const handleSubmit = async () => {
        if (!title.trim() || !calories.trim() || !ageGroup.trim()) {
            Alert.alert('Thiếu thông tin', 'Vui lòng nhập tên, calories và độ tuổi phù hợp');
            return;
        }
        setSubmitting(true);
        try {
            await recipeService.create({
                title,
                description,
                imageUrl,
                calories: Number(calories),
                ageGroup,
                ingredients: ingredients.filter((i) => i.trim()),
                instructions: instructions.filter((i) => i.trim()),
            });
            Alert.alert('Thành công', 'Đã thêm công thức mới', [{ text: 'OK', onPress: () => navigation.goBack() }]);
        } catch (e) {
            console.error('Create recipe error:', e);
            Alert.alert('Lỗi', 'Không thể tạo công thức, thử lại sau');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.label}>Tên món</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="VD: Cháo bí đỏ" />

            <Text style={styles.label}>Mô tả</Text>
            <TextInput style={[styles.input, styles.multiline]} value={description} onChangeText={setDescription} multiline placeholder="Mô tả ngắn về món ăn" />

            <Text style={styles.label}>Ảnh (URL)</Text>
            <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." />

            <View style={styles.rowInputs}>
                <View style={styles.half}>
                    <Text style={styles.label}>Calories</Text>
                    <TextInput style={styles.input} value={calories} onChangeText={setCalories} keyboardType="numeric" placeholder="120" />
                </View>
                <View style={styles.half}>
                    <Text style={styles.label}>Độ tuổi</Text>
                    <TextInput style={styles.input} value={ageGroup} onChangeText={setAgeGroup} placeholder="6-8 tháng" />
                </View>
            </View>

            <Text style={styles.section}>Thành phần</Text>
            {ingredients.map((ing, i) => (
                <View key={i} style={styles.dynamicRow}>
                    <TextInput
                        style={[styles.input, styles.flex1]}
                        value={ing}
                        onChangeText={(v) => updateListItem(ingredients, setIngredients, i, v)}
                        placeholder={`Nguyên liệu ${i + 1}`}
                    />
                    <TouchableOpacity onPress={() => removeListItem(ingredients, setIngredients, i)}>
                        <Text style={styles.removeBtn}>✕</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity onPress={() => addListItem(ingredients, setIngredients)}>
                <Text style={styles.addBtn}>+ Thêm nguyên liệu</Text>
            </TouchableOpacity>

            <Text style={styles.section}>Các bước nấu</Text>
            {instructions.map((step, i) => (
                <View key={i} style={styles.dynamicRow}>
                    <TextInput
                        style={[styles.input, styles.flex1]}
                        value={step}
                        onChangeText={(v) => updateListItem(instructions, setInstructions, i, v)}
                        placeholder={`Bước ${i + 1}`}
                    />
                    <TouchableOpacity onPress={() => removeListItem(instructions, setInstructions, i)}>
                        <Text style={styles.removeBtn}>✕</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity onPress={() => addListItem(instructions, setInstructions)}>
                <Text style={styles.addBtn}>+ Thêm bước</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={submitting}>
                <Text style={styles.submitText}>{submitting ? 'Đang lưu...' : 'Lưu công thức'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFBF5' },
    content: { padding: 18, paddingBottom: 40 },
    label: { fontSize: 13, fontWeight: '600', color: '#6B6B6B', marginBottom: 6, marginTop: 12 },
    input: { backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, borderWidth: 1, borderColor: '#EEE' },
    multiline: { height: 80, textAlignVertical: 'top' },
    rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
    half: { width: '48%' },
    section: { fontSize: 16, fontWeight: '700', color: '#2E2E2E', marginTop: 20, marginBottom: 8 },
    dynamicRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    flex1: { flex: 1 },
    removeBtn: { color: '#FF3B30', fontSize: 16, marginLeft: 10 },
    addBtn: { color: '#FF7A59', fontWeight: '600', marginTop: 4 },
    submitBtn: { backgroundColor: '#FF7A59', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 28 },
    submitText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

export default AddRecipeScreen;