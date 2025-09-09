import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

type TabHeaderItemType = {
    header: string;
    active: boolean;
    changeTab: (name: string) => void;
};

const TabHeaderItem = ({ header, active, changeTab }: TabHeaderItemType) => {
    return (
        <TouchableOpacity
            onPress={() => changeTab(header)}
            style={{
                ...style.container,
                borderBottomColor: active ? Colors.light.main : Colors.light.secondary,
                borderBottomWidth: 3,
                paddingBottom: 10,
            }}
        >
            <Text style={style.text}>{header}</Text>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 22,
    },
});

export default TabHeaderItem;
