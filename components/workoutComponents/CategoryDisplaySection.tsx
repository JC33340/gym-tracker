import { exerciseType } from '@/types';
import { StyleSheet, Text, View } from 'react-native';
import SmallHeader from '../general/SmallHeader';
import SelectExerciseItem from './SelectExerciseItem';

type CategoryDisplaySectionType = {
    exercises: exerciseType[];
};

const CategoryDisplaySection = ({ exercises }: CategoryDisplaySectionType) => {
    return (
        <View style={styles.container}>
            <SmallHeader text={exercises[0].category} />
            <View style={styles.exerciseItemsContainer}>
                {exercises.map((item, i) => (
                    <SelectExerciseItem key={i} exercise={item} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        rowGap: 10,
    },
    exerciseItemsContainer: {
        rowGap: 5,
    },
});

export default CategoryDisplaySection;
