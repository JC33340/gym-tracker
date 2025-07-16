import { View, StyleSheet, Alert } from 'react-native';
import ModalWrapper from '../general/ModalWrapper';
import Button from '../general/Button';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useState, useContext } from 'react';
import { Colors } from '@/constants/Colors';
import Input from '../general/Input';
import type { exerciseType, exerciseCategories } from '@/app/(tabs)/excercises';
import CustomDropdown from '../general/CustomDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkInputs from '@/utils/checkInputs';
import checkName from '@/utils/exercise/checkName';
import type { appContextType } from '@/app/_layout';
import { appContext } from '@/app/_layout';

const CreateExerciseModal = () => {
    const { addExercise } = useContext(appContext) as appContextType;

    const [isVisible, setIsVisible] = useState(false);
    const [newExercise, setNewExercise] = useState<exerciseType>({
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
            //check inputs
            const emptyInputs = checkInputs(newExercise);
            if (emptyInputs) {
                return Alert.alert('Field is missing', `${emptyInputs[0]}`);
            }
            const exercises = await AsyncStorage.getItem('exercises');
            const exercisesParsed: exerciseType[] = exercises ? JSON.parse(exercises) : [];
            //checking if name exists
            const isNameExist = checkName(newExercise.name, exercisesParsed);
            if (isNameExist) {
                return Alert.alert(
                    'Exercise name already exists',
                    'Pleas choose something different'
                );
            }

            await AsyncStorage.setItem(
                'exercises',
                JSON.stringify([...exercisesParsed, newExercise])
            );
            changeVisibility();
            addExercise(newExercise);
            setNewExercise({ name: '', category: 'any', history: [] });
        } catch (e) {
            console.log(e);
            Alert.alert('Sorry something went wrong', 'Unable to create exercise', [
                { text: 'Cancel' },
            ]);
        }
    };

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
                        value={newExercise.category}
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
