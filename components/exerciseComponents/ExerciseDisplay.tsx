import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { useContext } from 'react';
import { appContext } from '@/app/_layout';
import ExerciseItem from './ExerciseItem';
import SmallHeader from '../general/SmallHeader';
import type { appContextType } from '@/app/_layout';
import splitCategories from '@/utils/exercise/splitCategories';

const ExerciseDisplay = () => {
    const { exercises } = useContext(appContext) as appContextType;
    const split = splitCategories(exercises);
    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            {split.map((cat, i) => (
                <View style={styles.categoryWrapper} key={i}>
                    <SmallHeader text={cat[0].category} />
                    <View style={styles.itemsWrapper}>
                        {cat.map((item, i) => (
                            <ExerciseItem exercise={item} key={i} />
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        rowGap: 10,
    },
    categoryWrapper: {
        rowGap: 10,
    },
    itemsWrapper: {
        rowGap: 10,
    },
});

export default ExerciseDisplay;
