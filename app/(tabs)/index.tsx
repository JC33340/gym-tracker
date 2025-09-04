import { View, Text } from 'react-native';
import Button from '@/components/general/Button';
import PageWrapper from '@/components/general/PageWrapper';
import { useContext } from 'react';
import { appContext } from '../_layout';
import type { setType } from '@/types';
import WorkoutTemplate from '@/components/workoutComponents/WorkoutTemplate';
import type { currentSessionType, currentSessionExerciseItemType } from '@/types';

const Homepage = () => {
    const context = useContext(appContext);

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
