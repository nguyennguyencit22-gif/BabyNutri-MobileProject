import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { recipeService } from '../../services/recipe.service';
import { RecipeListItem } from '../../types/recipe';
import RecipeItem from '../../components/recipes/RecipeItem';
import CategoryChip from '../../components/recipes/CategoryChip';

const AGE_GROUPS = ['Tất cả', '6-8 tháng', '9-11 tháng', '12-24 tháng'];
const CATEGORIES = ['Tất cả', 'Cháo/Súp', 'Ăn dặm thô', 'Tráng miệng', 'Đồ ăn nhẹ'];

const SearchRecipeScreen = ({ navigation }: any) => {
    const [query, setQuery] = useState('');
    const [ageGroup, setAgeGroup] = useState('Tất cả');
    const [category, setCategory] = useState('Tất cả');
    const [results, setResults] = useState<RecipeListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setSearched(true);
        try {
            const data = await recipeService.search({
                query: query.trim() || undefined,
                ageGroup: ageGroup === 'Tất cả' ? undefined : ageGroup,
                category: category === 'Tất cả' ? undefined : category,
            });
            setResults(data);
        } catch (e) {
            console.error('Search error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm theo tên món..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
            />

            <Text style={styles.filterLabel}>Độ tuổi</Text>
            <FlatList
                horizontal
                data={AGE_GROUPS}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <CategoryChip label={item} active={ageGroup === item} onPress={() => setAgeGroup(item)} />}
                style={styles.chipList}
            />

            <Text style={styles.filterLabel}>Loại món</Text>
            <FlatList
                horizontal
                data={CATEGORIES}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <CategoryChip label={item} active={category === item} onPress={() => setCategory(item)} />}
                style={styles.chipList}
            />

            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                <Text style={styles.searchBtnText}>Tìm kiếm</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#FF7A59" style={{ marginTop: 20 }} />}

            {!loading && searched && (
                <FlatList
                    data={results}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
                    renderItem={({ item }) => (
                        <RecipeItem recipe={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} />
                    )}
                    ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy công thức phù hợp</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFBF5', padding: 16 },
    searchInput: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, borderWidth: 1, borderColor: '#EEE', marginBottom: 16 },
    filterLabel: { fontSize: 13, fontWeight: '600', color: '#6B6B6B', marginBottom: 8 },
    chipList: { marginBottom: 12 },
    searchBtn: { backgroundColor: '#FF7A59', borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginTop: 8 },
    searchBtnText: { color: '#fff', fontWeight: '700' },
    empty: { textAlign: 'center', marginTop: 30, color: '#999' },
});

export default SearchRecipeScreen;