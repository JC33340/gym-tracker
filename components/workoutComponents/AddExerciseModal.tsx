import { View, StyleSheet } from 'react-native';
import { useContext, useEffect, useState, createContext } from 'react';
import { appContext } from '@/app/_layout';
import ModalWrapper from '../general/ModalWrapper';
import Button from '../general/Button';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@/constants/Colors';
import Header from '../general/Header';
import ExerciseList from './ExerciseList';
import ExerciseCategoryDropdown from '../exerciseComponents/ExerciseCategoryDropdown';
import type { exerciseType, exerciseCategories } from '@/types';
import Input from '../general/Input';

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

    const [searchCategories, setSearchCategories] = useState<exerciseCategories>('any');

    const [displayExercises, setDisplayExercises] = useState<exerciseType[] | undefined>(
        context?.exercises
    );

    const [searchInputValue, setSearchInputValue] = useState<string>('');

    //change the exercises if search categories are changed
    useEffect(() => {
        let filter = context?.exercises.filter((item) =>
            item.name.toLowerCase().includes(searchInputValue.toLowerCase())
        );
        if (searchCategories === 'any') {
            setDisplayExercises(context?.exercises);
        } else {
            filter = filter?.filter((item) => item.category === searchCategories);
        }

        setDisplayExercises(filter);
    }, [searchCategories, searchInputValue, context?.exercises]);

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

    const handleSearchDropDown = (item: string | number) => {
        setSearchCategories(item as exerciseCategories);
    };

    const handleTextChange = (text: string) => {
        setSearchInputValue(text);
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
                    <ExerciseCategoryDropdown
                        handleDropdown={handleSearchDropDown}
                        selectedCategory={searchCategories}
                    />
                    <Input
                        placeholder="Search"
                        label="Search"
                        handleChange={handleTextChange}
                        value={searchInputValue}
                    />

                    <exerciseModalContext.Provider
                        value={{ selectedExercisesId, selectExercise: handlePress }}
                    >
                        <View style={styles.exerciseListContainer}>
                            <ExerciseList exercises={displayExercises ?? []} />
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
        height: 400,
    },
});

export default AddExerciseModal;
export { exerciseModalContext };
