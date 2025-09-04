import type { exerciseType } from '@/types';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { exerciseModalContext } from './AddExerciseModal';
import { useContext } from 'react';
import { appContext } from '@/app/_layout';

type SelectExerciseItemType = {
    exercise: exerciseType;
};

const SelectExerciseItem = ({ exercise }: SelectExerciseItemType) => {
    const context = useContext(exerciseModalContext);

    const entireAppContext = useContext(appContext);

    const isSelected = context?.selectedExercisesId.includes(exercise.id);

    const isDisabled = entireAppContext?.workoutInfo?.exercise.filter(
        (item) => item.id === exercise.id
    )[0]
        ? true
        : false;

    return (
        <TouchableOpacity
            disabled={isDisabled}
            onPress={() => context?.selectExercise(exercise.id)}
        >
            <View
                style={{
                    ...style.container,
                    backgroundColor: isDisabled
                        ? Colors.light.lightGray
                        : isSelected
                          ? Colors.light.main
                          : 'white',
                    borderColor: isSelected ? Colors.light.main : Colors.light.lightGray,
                }}
            >
                <Text
                    style={{
                        ...style.textBox,
                        color: isSelected || isDisabled ? Colors.light.secondary : 'black',
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
