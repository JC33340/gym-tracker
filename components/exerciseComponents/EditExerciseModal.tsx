import { View, Alert } from 'react-native';
import Button from '../general/Button';
import ModalWrapper from '../general/ModalWrapper';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@/constants/Colors';
import { useState, useContext } from 'react';
import Input from '../general/Input';
import SmallHeader from '../general/SmallHeader';
import type { exerciseType } from '@/app/(tabs)/excercises';
import type { exerciseCategories } from '@/app/(tabs)/excercises';
import ExerciseCategoryDropdown from './ExerciseCategoryDropdown';
import { appContext } from '@/app/_layout';

type EditExerciseModal = {
    exercise: exerciseType;
};

const EditExerciseModal = ({ exercise }: EditExerciseModal) => {
    const context = useContext(appContext);

    const [isVisible, setIsVisible] = useState(false);

    const [editedExercise, setEditedExercise] = useState(exercise);

    const changeVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    const handleDropdown = (item: string | number) => {
        setEditedExercise((prev) => {
            return { ...prev, category: item as exerciseCategories };
        });
    };

    const handleChange = (text: string) => {
        setEditedExercise((prev) => {
            return { ...prev, name: text };
        });
    };

    const handleEdit = async () => {
        const isSuccess = await context?.editExercise(editedExercise);
        if (!isSuccess) {
            return Alert.alert('Sorry something went wrong');
        }
        changeVisibility();
    };

    const handleDelete = async () => {
        const isSuccess = await context?.deleteExercise(editedExercise);
        if (!isSuccess) {
            return Alert.alert('Sorry something went wrong');
        }
        changeVisibility();
    };

    return (
        <View>
            <Button handleClick={changeVisibility}>
                <FontAwesome6
                    name="ellipsis"
                    iconStyle="solid"
                    color={Colors.light.secondary}
                    size={20}
                />
            </Button>
            <ModalWrapper visible={isVisible} hasCross={true} handleCrossPress={changeVisibility}>
                <SmallHeader text="Edit" />
                <Input
                    label="Exercise name"
                    placeholder="Exercise name"
                    value={editedExercise.name}
                    handleChange={handleChange}
                />
                <ExerciseCategoryDropdown
                    handleDropdown={handleDropdown}
                    selectedCategory={editedExercise.category}
                />
                <Button text="Edit exercise" handleClick={handleEdit} />
                <Button
                    text="Delete exercise"
                    backgroundColor={Colors.light.crimson}
                    handleClick={handleDelete}
                />
            </ModalWrapper>
        </View>
    );
};

export default EditExerciseModal;
