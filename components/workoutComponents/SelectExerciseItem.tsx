import type { exerciseType } from '@/app/(tabs)/excercises';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { exerciseModalContext } from './AddExerciseModal';
import { useContext } from 'react';

type SelectExerciseItemType = {
    exercise: exerciseType;
};

const SelectExerciseItem = ({ exercise }: SelectExerciseItemType) => {
    const context = useContext(exerciseModalContext);

    const isSelected = context?.selectedExercisesId.includes(exercise.id);

    return (
        <TouchableOpacity onPress={() => context?.selectExercise(exercise.id)}>
            <View
                style={{
                    ...style.container,
                    backgroundColor: isSelected ? Colors.light.main : 'white',
                    borderColor: isSelected ? Colors.light.main : Colors.light.lightGray,
                }}
            >
                <Text
                    style={{
                        ...style.textBox,
                        color: isSelected ? Colors.light.secondary : 'black',
                    }}
                >
                    {exercise.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textBox: {
        fontSize: 20,
    },
});

export default SelectExerciseItem;
