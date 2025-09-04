import { View, Text } from 'react-native';
import { appContext, type appContextType } from '@/app/_layout';
import { useContext } from 'react';

const workoutHistoryPage = () => {
    const context = useContext(appContext) as appContextType;

    return (
        <View>
            {context?.workoutHistory?.map((item) => {
                return (
                    <View>
                        <Text>{item.id}</Text>
                        {item.exercise.map((exercise) => {
                            return (
                                <View>
                                    <Text>{exercise.name}</Text>
                                    {exercise.sets.sets.map((set) => {
                                        return (
                                            <View>
                                                <Text>{set.reps}</Text>
                                                <Text>{set.weight}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
};

export default workoutHistoryPage;
