import type { exerciseType } from '@/types';
import sortExercises from './sortExercises';

const splitCategories = (exercises: exerciseType[]) => {
    const sorted = sortExercises(exercises);
    const returnArr = [];
    let current = '';
    let temp: exerciseType[] = [];
    for (let exercise of sorted) {
        if (current != exercise.category) {
            current = exercise.category;
            if (temp.length) {
                returnArr.push(temp);
            }
            temp = [exercise];
        } else {
            temp.push(exercise);
        }
    }
    if (temp.length) {
        returnArr.push(temp);
    }
    return returnArr;
};

export default splitCategories;
