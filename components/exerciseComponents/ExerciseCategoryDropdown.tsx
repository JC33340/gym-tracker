import CustomDropdown from '../general/CustomDropdown';
import type { exerciseCategories } from '@/app/(tabs)/excercises';

type ExerciseCategoryDropdownType = {
    handleDropdown: (item: string | number) => void;
    selectedCategory: exerciseCategories;
};

const ExerciseCategoryDropdown = ({
    handleDropdown,
    selectedCategory,
}: ExerciseCategoryDropdownType) => {
    const dropdownOptions: exerciseCategories[] = [
        'any',
        'arms',
        'back',
        'chest',
        'core',
        'legs',
        'shoulders',
    ];
    return (
        <CustomDropdown
            label="Select category"
            handleChange={handleDropdown}
            placeholder="Select Category"
            data={dropdownOptions.map((category) => {
                return {
                    label: category.slice(0, 1).toUpperCase().concat(category.slice(1)),
                    value: category,
                };
            })}
            value={selectedCategory}
        />
    );
};

export default ExerciseCategoryDropdown;
