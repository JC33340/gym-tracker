import { Stack } from 'expo-router';
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { exerciseType } from './(tabs)/excercises';
import checkName from '@/utils/exercise/checkName';
import { Alert } from 'react-native';
import type { currentSessionType } from './(tabs)';
import sortExercises from '@/utils/exercise/sortExercises';
import uuid from 'react-native-uuid';

type appContextType = {
    exercises: exerciseType[];
    addExercise: (exercise: exerciseType) => Promise<boolean>;
    editExercise: (exercise: exerciseType) => Promise<boolean>;
    deleteExercise: (exercise: exerciseType) => Promise<boolean>;
    isWorkout: boolean;
    workoutInfo: currentSessionType | null;
    startWorkout: () => void;
    cancelWorkout: () => void;
    addExerciseToWorkout: (excercise: exerciseType) => void;
    addSetToActiveWorkoutExercise: (id: string) => void;
    handleUserInputActiveWorkout: (
        id: string,
        setNum: number,
        text: string,
        item: 'weight' | 'reps'
    ) => void;
};

const appContext = createContext<appContextType | null>(null);

export default function RootLayout() {
    const [exercises, setExercises] = useState<exerciseType[]>([]);
    const [isWorkout, setIsWorkout] = useState<boolean>(false);
    const [workoutInfo, setWorkoutInfo] = useState<currentSessionType | null>(null);

    //function for adding an exercise
    const addExercise = async (exercise: exerciseType): Promise<boolean> => {
        const exercises = await AsyncStorage.getItem('exercises');
        const exercisesParsed: exerciseType[] = exercises ? JSON.parse(exercises) : [];
        //checking if name exists
        const isNameExist = checkName(exercise.name, exercisesParsed);
        if (isNameExist) {
            Alert.alert('Name already in use');
            return false;
        }

        const sortedArr = sortExercises([...exercisesParsed, exercise]);

        await AsyncStorage.setItem('exercises', JSON.stringify(sortedArr));

        setExercises((prev) => {
            if (prev) {
                return sortedArr;
            } else {
                return [exercise];
            }
        });
        return true;
    };

    //function for editing an exercise
    const editExercise = async (exercise: exerciseType): Promise<boolean> => {
        try {
            const storedData = await AsyncStorage.getItem('exercises');
            const storedDataP: exerciseType[] = storedData ? JSON.parse(storedData) : [];
            const index = storedDataP.findIndex((item) => item.id === exercise.id);
            storedDataP[index] = exercise;
            await AsyncStorage.setItem('exercises', JSON.stringify(storedDataP));
            setExercises(storedDataP);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    //function for deleting an Exercise
    const deleteExercise = async (exercise: exerciseType): Promise<boolean> => {
        try {
            const storedData = await AsyncStorage.getItem('exercises');
            const storedDataP: exerciseType[] = storedData ? JSON.parse(storedData) : [];
            const index = storedDataP.findIndex((item) => item.id === exercise.id);
            storedDataP.splice(index, 1);
            await AsyncStorage.setItem('exercises', JSON.stringify(storedDataP));
            setExercises(storedDataP);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    //starting the workout
    const startWorkout = () => {
        setIsWorkout(true);
        setWorkoutInfo({
            startTime: Date.now(),
            endTime: null,
            exercise: [],
            id: uuid.v4(),
        });
    };

    //cancelling a workout
    const cancelWorkout = () => {
        setWorkoutInfo(null);
        setIsWorkout(false);
    };

    //add an exercise to the workout
    const addExerciseToWorkout = (excercise: exerciseType) => {
        setWorkoutInfo((prev) => {
            if (prev) {
                //check if workout already includes exercise
                const check = prev.exercise.filter((existing) => existing.id === excercise.id);
                if (check.length) {
                    return { ...prev };
                }
                return {
                    ...prev,
                    exercise: [
                        ...prev.exercise,
                        {
                            id: excercise.id,
                            name: excercise.name,
                            sets: { sets: [{ weight: 0, reps: 0 }], date: Date.now() },
                        },
                    ],
                };
            } else {
                return prev;
            }
        });
    };

    //add a set to the exercise
    const addSetToActiveWorkoutExercise = (id: string) => {
        setWorkoutInfo((prev) => {
            if (prev) {
                const newA = { ...prev };
                const index = prev?.exercise.findIndex((item) => item.id === id);
                newA.exercise[index].sets.sets.push({ weight: 0, reps: 0 });
                return newA;
            } else {
                return prev;
            }
        });
    };

    //handling user input into the sets
    const handleUserInputActiveWorkout = (
        id: string,
        setNum: number,
        text: string,
        item: 'weight' | 'reps'
    ) => {
        setWorkoutInfo((prev) => {
            if (prev) {
                const index = prev.exercise.findIndex((item) => item.id === id);

                const newA = { ...prev };
                const num = Number(text);
                if (!num) return prev;
                if (item === 'reps') {
                    newA.exercise[index].sets.sets[setNum].reps = num;
                } else {
                    newA.exercise[index].sets.sets[setNum].weight = num;
                }
                return newA;
            } else {
                return null;
            }
        });
    };

    useEffect(() => {
        const getLocalStorage = async () => {
            const localExercise = await AsyncStorage.getItem('exercises');
            const localExercisesParsed: exerciseType[] = localExercise
                ? JSON.parse(localExercise)
                : [];
            const sortedArr = sortExercises(localExercisesParsed);
            setExercises(sortedArr);
        };

        getLocalStorage();
    }, []);

    return (
        <appContext.Provider
            value={{
                exercises,
                addExercise,
                editExercise,
                deleteExercise,
                isWorkout,
                startWorkout,
                workoutInfo,
                cancelWorkout,
                addExerciseToWorkout,
                addSetToActiveWorkoutExercise,
                handleUserInputActiveWorkout,
            }}
        >
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </appContext.Provider>
    );
}

export { appContext };
export type { appContextType };
