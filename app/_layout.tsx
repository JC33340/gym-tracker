import { Stack } from 'expo-router';
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { exerciseType } from './(tabs)/excercises';
import checkName from '@/utils/exercise/checkName';
import { Alert } from 'react-native';

type appContextType = {
    exercises: exerciseType[];
    addExercise: (exercise: exerciseType) => Promise<boolean>;
};

const appContext = createContext<appContextType | null>(null);

export default function RootLayout() {
    const [exercises, setExercises] = useState<exerciseType[]>([]);

    const addExercise = async (exercise: exerciseType):Promise<boolean> => {
        const exercises = await AsyncStorage.getItem('exercises');
        const exercisesParsed: exerciseType[] = exercises ? JSON.parse(exercises) : [];
        //checking if name exists
        const isNameExist = checkName(exercise.name, exercisesParsed);
        if (isNameExist) {
            Alert.alert('Name already in use')
            return false
        }

        await AsyncStorage.setItem('exercises', JSON.stringify([...exercisesParsed, exercise]));

        setExercises((prev) => {
            if (prev) {
                return [...prev, exercise];
            } else {
                return [exercise];
            }
        });
        return true
    };

    useEffect(() => {
        const getLocalStorage = async () => {
            const localExercise = await AsyncStorage.getItem('exercises');
            const localExercisesParsed = localExercise ? JSON.parse(localExercise) : [];
            setExercises(localExercisesParsed);
        };

        getLocalStorage();
    }, []);

    return (
        <appContext.Provider value={{ exercises: exercises, addExercise: addExercise }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </appContext.Provider>
    );
}

export { appContext };
export type { appContextType };
