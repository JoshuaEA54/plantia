import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '@/src/types-dtos/user.types';
import { useCategoryListTheme } from './CategoryList.styles';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const { theme, styles } = useCategoryListTheme();

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
            <Ionicons name={cat.iconName as IoniconsName} size={theme.fontSize.overline} color={theme.colors.primaryDark} style={styles.categoryIcon} />
            <Text style={styles.categoryName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
