import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '@/src/types-dtos/user.types';
import { useCategoryListTheme } from './CategoryList.styles';

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const { styles } = useCategoryListTheme();

  return (
    <>
      <View style={styles.sectionLabel}>
        <Text style={styles.sectionTitle}>Mis categorías</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity key={cat.name} style={styles.categoryChip}>
            <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
            <Text style={styles.categoryName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
