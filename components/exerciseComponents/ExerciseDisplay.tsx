import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { useContext } from 'react';
import { appContext } from '@/app/_layout';
import ExerciseItem from './ExerciseItem';
import type { appContextType } from '@/app/_layout';

const ExerciseDisplay = () => {
    const { exercises } = useContext(appContext) as appContextType;
    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            {exercises?.map((exercise, i) => {
                return <ExerciseItem key={i} exercise={exercise} />;
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexGrow: 1,
        rowGap: 10,
    },
});

export default ExerciseDisplay;
