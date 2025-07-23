import { Stack } from 'expo-router';
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { exerciseType } from './(tabs)/excercises';
import checkName from '@/utils/exercise/checkName';
import { Alert } from 'react-native';
import type { currentSessionType } from './(tabs)';

type appContextType = {
    exercises: exerciseType[];
    addExercise: (exercise: exerciseType) => Promise<boolean>;
    editExercise: (exercise: exerciseType) => Promise<boolean>;
    deleteExercise: (exercise: exerciseType) => Promise<boolean>;
    isWorkout: boolean;
    workoutInfo: currentSessionType | null;

    startWorkout: () => void;
    cancelWorkout: () => void;
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

        await AsyncStorage.setItem('exercises', JSON.stringify([...exercisesParsed, exercise]));

        setExercises((prev) => {
            if (prev) {
                return [...prev, exercise];
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
        });
    };

    //cancelling a workout
    const cancelWorkout = () => {
        setWorkoutInfo(null);
        setIsWorkout(false);
    };

    //add an exercise to the workout
    const addExerciseToWorkout = (excercises: exerciseType) => {};

    useEffect(() => {
        const getLocalStorage = async () => {
            const localExercise = await AsyncStorage.getItem('exercises');
            const localExercisesParsed = localExercise ? JSON.parse(localExercise) : [];
            setExercises(localExercisesParsed);
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
