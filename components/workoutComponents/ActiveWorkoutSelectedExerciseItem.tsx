import { View, Text, StyleSheet } from 'react-native';
import type { currentSessionExerciseItemType } from '@/app/(tabs)';
import { Colors } from '@/constants/Colors';
import SmallHeader from '../general/SmallHeader';
import Button from '../general/Button';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Input from '../general/Input';
import { useContext } from 'react';
import { appContext } from '@/app/_layout';
import type { appContextType } from '@/app/_layout';

type ActiveWorkoutSelectedExerciseItemType = {
    exercise: currentSessionExerciseItemType;
};

const ActiveWorkoutSelectedExerciseItem = ({ exercise }: ActiveWorkoutSelectedExerciseItemType) => {
    const context = useContext(appContext) as appContextType;

    return (
        <View style={styles.container}>
            <SmallHeader text={exercise.name} />
            <View style={styles.setList}>
                <View style={styles.columnTitlesContainer}>
                    <View style={styles.columnTitlesContainerItem}>
                        <Text style={styles.columnTitles}>Weight</Text>
                    </View>
                    <View style={styles.columnTitlesContainerItem}>
                        <Text style={styles.columnTitles}>Reps</Text>
                    </View>
                </View>
                {exercise.sets.sets.map((item, i) => {
                    return (
                        <View key={i} style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Input
                                    placeholder="Weight"
                                    value={!item.weight ? '' : String(item.weight)}
                                    handleChange={(text) =>
                                        context.handleUserInputActiveWorkout(
                                            exercise.id,
                                            i,
                                            text,
                                            'weight'
                                        )
                                    }
                                    numberPad={true}
                                />
                            </View>
                            <View style={styles.infoItem}>
                                <Input
                                    placeholder="Reps"
                                    value={!item.reps ? '' : String(item.reps)}
                                    handleChange={(text) =>
                                        context.handleUserInputActiveWorkout(
                                            exercise.id,
                                            i,
                                            text,
                                            'reps'
                                        )
                                    }
                                    numberPad={true}
                                />
                            </View>
                        </View>
                    );
                })}
            </View>
            <Button handleClick={() => context.addSetToActiveWorkoutExercise(exercise.id)}>
                <FontAwesome6 name="plus" iconStyle="solid" color={Colors.light.secondary} />
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.light.lightGray,
        padding: 15,
        borderRadius: 5,
        rowGap: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        columnGap: 10,
    },
    setList: {
        rowGap: 5,
    },
    infoItem: {
        flex: 1,
    },
    columnTitlesContainer: {
        flexDirection: 'row',
        columnGap: 10,
    },
    columnTitlesContainerItem: {
        flex: 1,
    },
    columnTitles: {
        fontWeight: 500,
    },
});

export default ActiveWorkoutSelectedExerciseItem;
