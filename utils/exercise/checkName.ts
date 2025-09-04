import type { exerciseType } from '@/types';

const checkName = (name: string, existing: exerciseType[]) => {
    for (let exercise of existing) {
        if (name === exercise.name) {
            return true;
        }
    }
    return false;
};

export default checkName;
