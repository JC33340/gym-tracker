import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { appContext } from '@/app/_layout';
import type { appContextType } from '@/app/_layout';
import ActiveWorkoutSelectedExerciseItem from './ActiveWorkoutSelectedExerciseItem';

const ActiveWorkoutSelectedExercisesList = () => {
    const context = useContext(appContext) as appContextType;
    return (
        <View style={style.container}>
            {context.workoutInfo?.exercise.map((item, i) => {
                return <ActiveWorkoutSelectedExerciseItem key={i} exercise={item} />;
            })}
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        rowGap: 10,
    },
});

export default ActiveWorkoutSelectedExercisesList;
