type exerciseCategories = 'any' | 'arms' | 'chest' | 'back' | 'legs' | 'core' | 'shoulders';

type exerciseType = {
    id: string;
    name: string;
    category: exerciseCategories;
    history: setType[];
};

type setType = { sets: { weight: number; reps: number }[]; date: number };

type currentSessionType = {
    id: string;
    startTime: number;
    endTime: number | null;
    exercise: currentSessionExerciseItemType[];
};

type currentSessionExerciseItemType = {
    id: string;
    name: string;
    sets: setType;
};

type workoutHistoryType = currentSessionType[];

export type {
    exerciseCategories,
    setType,
    currentSessionType,
    currentSessionExerciseItemType,
    exerciseType,
    workoutHistoryType,
};
