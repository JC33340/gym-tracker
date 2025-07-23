import { View, Text } from 'react-native';
import Button from '@/components/general/Button';
import PageWrapper from '@/components/general/PageWrapper';
import { useContext } from 'react';
import { appContext } from '../_layout';
import type { setType } from './excercises';
import WorkoutTemplate from '@/components/workoutComponents/WorkoutTemplate';

type currentSessionType = {
    startTime: number;
    endTime: number | null;
    exercise: {
        id: string;
        name: string;
        sets: setType;
    }[];
};

const Homepage = () => {
    const context = useContext(appContext);

    const handleStartWorkout = () => {};

    return (
        <PageWrapper>
            <View>
                {!context?.isWorkout && (
                    <Button text="Start workout" handleClick={context?.startWorkout} />
                )}
                {context?.isWorkout && <WorkoutTemplate />}
            </View>
        </PageWrapper>
    );
};

export default Homepage;

export type { currentSessionType };
