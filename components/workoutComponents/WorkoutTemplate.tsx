import { View, Text, StyleSheet } from 'react-native';
import Button from '../general/Button';
import { Colors } from '@/constants/Colors';
import Header from '../general/Header';
import { useContext } from 'react';
import { appContext } from '@/app/_layout';
import Timer from './Timer';

const WorkoutTemplate = () => {
    const context = useContext(appContext);

    return (
        <View>
            <Header text="Current Workout" />
            <Timer startTime={context?.workoutInfo?.startTime ?? null} />

            <Button
                text="Finish Workout"
                handleClick={() => null}
                backgroundColor={Colors.light.green}
            ></Button>
            <Button
                text="Cancel Workout"
                handleClick={context?.cancelWorkout}
                backgroundColor={Colors.light.crimson}
            />
        </View>
    );
};

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default WorkoutTemplate;
