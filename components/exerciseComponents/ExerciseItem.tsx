import type { exerciseType } from '@/types';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import EditExerciseModal from './EditExerciseModal';
import SmallHeader from '../general/SmallHeader';

type exerciseItemType = {
    exercise: exerciseType;
};

const ExerciseItem = ({ exercise }: exerciseItemType) => {
    return (
        <View style={style.container}>
            <View style={style.leftSide}>
                <SmallHeader text={exercise.name} />
                <Text style={style.category}>{exercise.category}</Text>
            </View>
            <View style={style.buttonWrapper}>
                <EditExerciseModal exercise={exercise} />
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.light.unFocused,
        borderRadius: 5,
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    leftSide: {
        rowGap: 5,
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
    buttonWrapper: {
        width: '20%',
    },
});

export default ExerciseItem;
