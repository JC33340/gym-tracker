import { setType } from '@/types';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import HistoryItem from './HistoryItem';
import SmallHeader from '@/components/general/SmallHeader';

type HistoryPageType = {
    history: setType[] | undefined;
};

const HistoryPage = ({ history }: HistoryPageType) => {
    return (
        <>
            {history && history.length > 0 ? (
                <ScrollView>
                    <TouchableWithoutFeedback>
                        <View style={style.container}>
                            {history.map((item, i) => (
                                <HistoryItem item={item} key={i} />
                            ))}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            ) : (
                <View style={style.emptyContainer}>
                    <SmallHeader text="No Previous Workouts" />
                </View>
            )}
        </>
    );
};

const style = StyleSheet.create({
    container: {
        rowGap: 10,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});

export default HistoryPage;
