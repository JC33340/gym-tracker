import { View, StyleSheet, Alert } from 'react-native';
import ModalWrapper from '../general/ModalWrapper';
import Button from '../general/Button';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useState, useContext } from 'react';
import { Colors } from '@/constants/Colors';
import Input from '../general/Input';
import type { exerciseType, exerciseCategories } from '@/app/(tabs)/excercises';
import checkInputs from '@/utils/checkInputs';
import type { appContextType } from '@/app/_layout';
import { appContext } from '@/app/_layout';
import ExerciseCategoryDropdown from './ExerciseCategoryDropdown';
import uuid from 'react-native-uuid';

const CreateExerciseModal = () => {
    const { addExercise } = useContext(appContext) as appContextType;

    const [isVisible, setIsVisible] = useState(false);
    const [newExercise, setNewExercise] = useState<exerciseType>({
        id: uuid.v4(),
        name: '',
        category: 'any',
        history: [],
    });

    const changeVisibility = () => setIsVisible((prev) => !prev);

    const handleChange = (text: string) => {
        setNewExercise((prev) => {
            return { ...prev, name: text };
        });
    };

    const handleDropdown = (item: string | number) => {
        setNewExercise((prev) => {
            return { ...prev, category: item as exerciseCategories };
        });
    };

    const createNewExercise = async () => {
        try {
            const formated = { ...newExercise, name: newExercise.name.trim() };
            //check inputs
            const emptyInputs = checkInputs(formated);
            if (emptyInputs) {
                return Alert.alert('Field is missing', `${emptyInputs[0]}`);
            }
            const isSuccess = await addExercise(formated);
            if (!isSuccess) return;
            changeVisibility();
            setNewExercise({ id: uuid.v4(), name: '', category: 'any', history: [] });
        } catch (e) {
            console.log(e);
            Alert.alert('Sorry something went wrong', 'Unable to create exercise', [
                { text: 'Cancel' },
            ]);
        }
    };

    return (
        <>
            <Button handleClick={changeVisibility}>
                <FontAwesome6
                    name="plus"
                    size={30}
                    iconStyle="solid"
                    color={Colors.light.secondary}
                />
            </Button>
            <ModalWrapper visible={isVisible} hasCross={true} handleCrossPress={changeVisibility}>
                <View style={styles.wrapper}>
                    <Input
                        placeholder="Exercise Name"
                        value={newExercise.name}
                        handleChange={handleChange}
                        label="Exercise Name"
                    ></Input>
                    <ExerciseCategoryDropdown
                        handleDropdown={handleDropdown}
                        selectedCategory={newExercise.category}
                    />
                    <Button text="Create Exercise" handleClick={createNewExercise}></Button>
                </View>
            </ModalWrapper>
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        rowGap: 10,
    },
    dropdown: {
        borderColor: Colors.light.unFocused,
        borderWidth: 2,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 5,
    },
});

export default CreateExerciseModal;
