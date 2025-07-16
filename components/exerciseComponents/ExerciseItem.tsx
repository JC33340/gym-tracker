import type { exerciseType } from '@/app/(tabs)/excercises';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type exerciseItemType = {
    exercise: exerciseType;
};

const ExerciseItem = ({ exercise }: exerciseItemType) => {
    return (
        <View style={style.container}>
            <Text style={style.name}>{exercise.name}</Text>
            <Text style={style.category}>{exercise.category}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        rowGap: 5,
        borderWidth: 2,
        borderColor: Colors.light.unFocused,
        borderRadius: 5,
        paddingHorizontal: '5%',
        paddingVertical: '3%',
    },
    name: {
        fontSize: 25,
        fontWeight: 600,
    },
    category: {
        fontSize: 20,
        opacity: 0.5,
        textTransform: 'capitalize',
    },
});

export default ExerciseItem;
