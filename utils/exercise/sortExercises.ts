import type { exerciseType } from '@/app/(tabs)/excercises';

const sortExercises = (exercises: exerciseType[]) => {
    return exercises.sort((a, b) => {
        if (a.category < b.category) {
            return -1;
        } else if (b.category < a.category) {
            return 1;
        } else if (a.name < b.name) {
            return -1;
        } else {
            return 1;
        }
    });
};

export default sortExercises;
