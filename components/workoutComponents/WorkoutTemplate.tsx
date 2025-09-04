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
        <ScrollView style={style.container}>
            <Header text="Current Workout" />
            <Timer startTime={context?.workoutInfo?.startTime ?? null} />

            <Button
                text="Finish Workout"
                handleClick={context?.finishActiveWorkout}
                backgroundColor={Colors.light.green}
            ></Button>
            <AddExerciseModal />
            <Button
                text="Cancel Workout"
                handleClick={context?.cancelWorkout}
                backgroundColor={Colors.light.crimson}
            />
            <Button
                text="check shit"
                handleClick={() => console.log(context?.workoutInfo, context?.exercises)}
            />
            <Button
                text="check exercises"
                handleClick={() =>
                    console.log(context?.exercises[0].history, context?.exercises[1].history)
                }
            />
            <ActiveWorkoutSelectedExerciseList />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        overflow: 'scroll',
    },
});

export default WorkoutTemplate;
