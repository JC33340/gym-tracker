import { Colors } from '@/constants/Colors';
import { setType } from '@/types';
import { View, Text, StyleSheet } from 'react-native';

type HistoryItem = {
    item: setType;
};

const HistoryItem = ({ item }: HistoryItem) => {
    const date = new Date(item.date);

    return (
        <View style={style.container}>
            <Text style={style.date}>
                {date.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: '2-digit',
                    year: '2-digit',
                    month: 'short',
                })}
            </Text>
            <View style={style.rowContainer}>
                <View
                    style={{
                        ...style.setRow,
                        borderBottomWidth: 2,
                        borderBottomColor: Colors.light.lightGray,
                        paddingBottom: 3,
                    }}
                >
                    <Text style={style.setItem}>Weight (KG)</Text>
                    <Text style={style.setItem}>Reps</Text>
                </View>
                {item.sets.map((item, i) => (
                    <View style={style.setRow} key={i}>
                        <Text style={style.setItem}>{item.weight}</Text>
                        <Text style={style.setItem}>{item.reps}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor: Colors.light.lightGray,
        rowGap: 5,
        flex: 1,
    },
    date: {
        fontWeight: 600,
        fontSize: 18,
    },
    setRow: {
        flexDirection: 'row',
    },
    setItem: {
        flex: 1,
        textAlign: 'right',
    },
    rowContainer: {
        rowGap: 5,
    },
});

export default HistoryItem;
