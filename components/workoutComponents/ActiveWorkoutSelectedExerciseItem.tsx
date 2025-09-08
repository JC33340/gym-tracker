import { View, Text, StyleSheet } from 'react-native';
import type { currentSessionExerciseItemType } from '@/types';
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

    //find history of the current exercise
    const history = context.exercises
        .filter((item) => item.id === exercise.id)[0]
        .history.toReversed()[0];

    return (
        <View style={styles.container}>
            <SmallHeader text={exercise.name} />
            <View style={styles.setList}>
                <View style={styles.columnTitlesContainer}>
                    <View style={styles.columnTitlesContainerItem}>
                        <Text style={styles.columnTitles}>Previous</Text>
                    </View>
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
                            <View style={styles.prevInfo}>
                                <Text style={styles.prevInfoText}>
                                    {history
                                        ? history.sets[i]
                                            ? `${history.sets[i].weight} KG x ${history.sets[i].reps}`
                                            : '-'
                                        : '-'}
                                </Text>
                            </View>
                            <View style={{ flex: 3 }}>
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
                            <View style={{ flex: 3 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        columnGap: 5,
                                        alignItems: 'center',
                                    }}
                                >
                                    <View style={{ flex: 2 }}>
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
                                    <View style={{ flex: 1 }}>
                                        <Button
                                            backgroundColor={Colors.light.crimson}
                                            handleClick={() =>
                                                context.changeSetsToActiveWorkoutExercise(
                                                    exercise.id,
                                                    i
                                                )
                                            }
                                        >
                                            <FontAwesome6
                                                name="trash-can"
                                                iconStyle="solid"
                                                color={Colors.light.secondary}
                                            />
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
            <Button
                handleClick={() => context.changeSetsToActiveWorkoutExercise(exercise.id)}
                text="Add set"
            >
                <FontAwesome6 name="plus" iconStyle="solid" color={Colors.light.secondary} />
            </Button>
            <Button
                handleClick={() => context.removeExerciseFromActiveWorkout(exercise.id)}
                text="Remove exercise"
                backgroundColor={Colors.light.crimson}
            ></Button>
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
    prevInfo: {
        flex: 2,
        backgroundColor: Colors.light.lightGray,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    prevInfoText: {
        color: Colors.light.unFocused,
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
