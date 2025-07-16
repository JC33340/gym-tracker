import { Stack } from 'expo-router';
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { exerciseType } from './(tabs)/excercises';

type appContextType = {
    exercises: exerciseType[];
    addExercise: (exercise: exerciseType) => void;
};

const appContext = createContext<appContextType | null>(null);

export default function RootLayout() {
    const [exercises, setExercises] = useState<exerciseType[]>([]);

    const addExercise = (exercise: exerciseType) => {
        setExercises((prev) => {
            if (prev) {
                return [...prev, exercise];
            } else {
                return [exercise];
            }
        });
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
