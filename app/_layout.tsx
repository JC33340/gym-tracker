import { Stack } from 'expo-router';
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { exerciseType, currentSessionType, workoutHistoryType } from '@/types';
import checkName from '@/utils/exercise/checkName';
import { Alert } from 'react-native';
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
    changeSetsToActiveWorkoutExercise: (id: string, remove?: number) => void;
    handleUserInputActiveWorkout: (
        id: string,
        setNum: number,
        text: string,
        item: 'weight' | 'reps'
    ) => void;
    finishActiveWorkout: () => void;
    workoutHistory: workoutHistoryType | null;
};

const appContext = createContext<appContextType | null>(null);

export default function RootLayout() {
    const [exercises, setExercises] = useState<exerciseType[]>([]);
    const [isWorkout, setIsWorkout] = useState<boolean>(false);
    const [workoutInfo, setWorkoutInfo] = useState<currentSessionType | null>(null);
    const [workoutHistory, setWorkoutHistory] = useState<workoutHistoryType | null>(null);

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
        try {
            await AsyncStorage.setItem('exercises', JSON.stringify(sortedArr));
        } catch (e) {
            return false;
        }

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

    //adding or removing sets to the exercise
    const changeSetsToActiveWorkoutExercise = (id: string, remove?: number) => {
        setWorkoutInfo((prev) => {
            if (prev) {
                const newA = { ...prev };
                const index = prev?.exercise.findIndex((item) => item.id === id);
                if (remove != null) {
                    newA.exercise[index].sets.sets.splice(remove, 1);
                } else {
                    newA.exercise[index].sets.sets.push({ weight: 0, reps: 0 });
                }
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

                //if it is not a number then do not update the text
                const num = text ? Number(text) : 0;
                if (!num && text) return prev;
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

    //finishing the workout and storing the data
    const finishActiveWorkout = () => {
        //ensure workout exists
        if (!workoutInfo) {
            return Alert.alert('Workout does no exist');
        }

        //if there are no exercises added
        if (workoutInfo.exercise.length === 0) {
            return Alert.alert('No exercises', 'Use cancel workout instead');
        }

        //checking if there are any unfilled sets returns alert
        for (let exercise of workoutInfo.exercise) {
            for (let set of exercise.sets.sets) {
                if (set.reps < 1 || set.weight < 1) {
                    return Alert.alert(
                        `Problem with ${exercise.name}`,
                        `Reps or Weight is invalid`
                    );
                }
            }
        }

        //adding sets from active to the history of current exercises
        setExercises((prev) => {
            if (workoutInfo?.exercise) {
                for (let exercise of workoutInfo?.exercise) {
                    const index = prev.findIndex((item) => exercise.id === item.id);
                    prev[index].history.push(exercise.sets);
                }
            }

            const setLocalStorage = async () => {
                await AsyncStorage.setItem('exercises', JSON.stringify(exercises));
            };
            setLocalStorage();

            return prev;
        });

        //getting workout history
        setWorkoutHistory((prev) => {
            const newPrev = prev ? [...prev] : [];
            newPrev.push(workoutInfo);
            const setLocalStorage = async () => {
                await AsyncStorage.setItem('workoutHistory', JSON.stringify(newPrev));
            };
            setLocalStorage();
            return newPrev;
        });

        cancelWorkout();
    };

    //getting exercise information and workout history
    useEffect(() => {
        const getLocalStorage = async () => {
            try {
                //getting exercise information
                const localExercise = await AsyncStorage.getItem('exercises');
                const localExercisesParsed: exerciseType[] = localExercise
                    ? JSON.parse(localExercise)
                    : [];
                const sortedArr = sortExercises(localExercisesParsed);
                setExercises(sortedArr);

                //getting workout history
                const localWorkoutHistory = await AsyncStorage.getItem('workoutHistory');
                const localWorkoutHistoryParsed: workoutHistoryType = localWorkoutHistory
                    ? JSON.parse(localWorkoutHistory)
                    : [];
                console.log(localWorkoutHistoryParsed);
                setWorkoutHistory(localWorkoutHistoryParsed);
            } catch (e) {
                if (e instanceof Error) {
                    Alert.alert('Sorry something went wrong', e.message);
                } else {
                    Alert.alert('Sorry something went wrong', 'Unknown error');
                }
            }
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
                changeSetsToActiveWorkoutExercise,
                handleUserInputActiveWorkout,
                finishActiveWorkout,
                workoutHistory,
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
