import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { exerciseType } from '@/app/(tabs)/excercises';
import splitCategories from '@/utils/exercise/splitCategories';
import CategoryDisplaySection from './CategoryDisplaySection';

type ExerciseListType = {
    exercises: exerciseType[];
};

const ExerciseList = ({ exercises }: ExerciseListType) => {
    const split = splitCategories(exercises);
    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                {split.map((item, i) => (
                    <CategoryDisplaySection key={i} exercises={item} />
                ))}

                {!split.length && <Text style={styles.emptyText}>Create some exercises</Text>}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyText: {
        opacity: 0.3,
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 500,
    },
    container: {
        rowGap: 10,
    },
});

export default ExerciseList;
