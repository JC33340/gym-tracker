import { View, StyleSheet } from 'react-native';
import TabHeaderItem from './TabHeaderItem';

type TabHeaderType = {
    headers: string[];
    active: string;
    changeTab: (name: string) => void;
};

const TabHeader = ({ headers, active, changeTab }: TabHeaderType) => {
    return (
        <View style={style.container}>
            {headers.map((item, i) => (
                <TabHeaderItem
                    header={item}
                    key={i}
                    active={item === active}
                    changeTab={changeTab}
                />
            ))}
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default TabHeader;
