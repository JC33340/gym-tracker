import { View, Text, StyleSheet } from 'react-native';
import { useContext, useEffect, useState, createContext } from 'react';
import { appContext } from '@/app/_layout';
import ModalWrapper from '../general/ModalWrapper';
import Button from '../general/Button';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@/constants/Colors';
import Header from '../general/Header';
import ExerciseList from './ExerciseList';

type exerciseModalContextType = {
    selectedExercisesId: string[];
    selectExercise: (id: string) => void;
} | null;

const exerciseModalContext = createContext<exerciseModalContextType>(null);

const AddExerciseModal = () => {
    const context = useContext(appContext);

    const [isVisible, setIsVisible] = useState(false);

    const [selectedExercisesId, setSelectedExercisesId] = useState<string[]>([]);

    const [disableAddButton, setDisableAddButton] = useState<boolean>(true);

    const handlePress = (id: string) => {
        setSelectedExercisesId((prev) => {
            if (prev.includes(id)) {
                const newA = [...prev];
                newA.splice(prev.indexOf(id), 1);
                if (newA.length < 1) {
                    setDisableAddButton(true);
                }
                return newA;
            } else {
                setDisableAddButton(false);
                return [...prev, id];
            }
        });
    };

    const handleAddExercises = () => {
        const exerciseList = selectedExercisesId.map((item) => {
            return context?.exercises.filter((exercise) => exercise.id === item)[0];
        });
        for (let exercise of exerciseList) {
            if (exercise) {
                context?.addExerciseToWorkout(exercise);
            }
        }
        setIsVisible(false);
        setSelectedExercisesId([]);
        setDisableAddButton(true);
    };

    return (
        <>
            <Button
                text="Add Exercise"
                handleClick={() => setIsVisible(true)}
                backgroundColor={Colors.light.main}
            >
                <FontAwesome6
                    name="plus"
                    iconStyle="solid"
                    size={20}
                    color={Colors.light.secondary}
                />
            </Button>
            <ModalWrapper
                visible={isVisible}
                hasCross={true}
                handleCrossPress={() => setIsVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Header text="Add Exercise"></Header>
                    <Button
                        text="Add"
                        disabled={disableAddButton}
                        handleClick={handleAddExercises}
                    />
                    <exerciseModalContext.Provider
                        value={{ selectedExercisesId, selectExercise: handlePress }}
                    >
                        <View style={styles.exerciseListContainer}>
                            <ExerciseList exercises={context?.exercises ?? []} />
                        </View>
                    </exerciseModalContext.Provider>
                </View>
            </ModalWrapper>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        rowGap: 10,
    },
    exerciseListContainer: {
        borderWidth: 1,
        borderColor: Colors.light.lightGray,
        padding: '4%',
        borderRadius: 10,
        height: '80%',
    },
});

export default AddExerciseModal;
export { exerciseModalContext };
