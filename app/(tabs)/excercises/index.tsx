import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Button from '@/components/general/Button';
import PageWrapper from '@/components/general/PageWrapper';
import Header from '@/components/general/Header';
import CreateExerciseModal from '@/components/exerciseComponents/CreateExerciseModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseDisplay from '@/components/exerciseComponents/ExerciseDisplay';
import type { exerciseCategories, exerciseType, setType } from '@/types';

const ExercisePage = () => {
    return (
        <PageWrapper>
            <View style={style.container}>
                <View style={style.createExerciseContainer}>
                    <Header text="Create a new exercise"></Header>
                    <CreateExerciseModal />
                    <Button
                        text="Clear"
                        handleClick={async () => {
                            await AsyncStorage.clear();
                        }}
                    ></Button>
                </View>
                <View style={style.exerciseDisplayWrapper}>
                    <Header text="All exercises" />
                    <ExerciseDisplay />
                </View>
            </View>
        </PageWrapper>
    );
};

const style = StyleSheet.create({
    container: {
        rowGap: 40,
        flex: 1,
    },
    createExerciseContainer: {
        rowGap: 20,
    },
    modalWrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    exerciseDisplayWrapper: {
        rowGap: 10,
        flex: 1,
    },
});

export default ExercisePage;
