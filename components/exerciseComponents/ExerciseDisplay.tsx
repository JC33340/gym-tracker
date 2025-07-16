import { StyleSheet, View, Text } from 'react-native';
import { useContext } from 'react';
import { appContext } from '@/app/_layout';
import ExerciseItem from './ExerciseItem';
import type { appContextType } from '@/app/_layout';

const ExerciseDisplay = () => {
    const { exercises } = useContext(appContext) as appContextType;
    return (
        <View style={styles.container}>
            {exercises?.map((exercise, i) => {
                return <ExerciseItem key={i} exercise={exercise} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        rowGap: 10,
    },
});

export default ExerciseDisplay;
