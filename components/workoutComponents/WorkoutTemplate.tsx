import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../general/Button';
import { Colors } from '@/constants/Colors';
import Header from '../general/Header';
import { useContext } from 'react';
import { appContext } from '@/app/_layout';
import Timer from './Timer';
import AddExerciseModal from './AddExerciseModal';
import ActiveWorkoutSelectedExerciseList from './ActiveWorkoutSelectedExercisesList';

const WorkoutTemplate = () => {
    const context = useContext(appContext);

    return (
        <ScrollView style={style.scrollViewContainer}>
            <View style={style.container}>
                <Header text="Current Workout" />
                <Timer startTime={context?.workoutInfo?.startTime ?? null} />

                <Button
                    text="Cancel Workout"
                    handleClick={context?.cancelWorkout}
                    backgroundColor={Colors.light.crimson}
                />
                <ActiveWorkoutSelectedExerciseList />
                <AddExerciseModal />
                <Button
                    text="Finish Workout"
                    handleClick={context?.finishActiveWorkout}
                    backgroundColor={Colors.light.green}
                ></Button>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    scrollViewContainer: {
        overflow: 'scroll',
        height: '100%',
    },
    container: {
        rowGap: 10,
    },
});

export default WorkoutTemplate;
