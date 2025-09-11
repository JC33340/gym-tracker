import { View, Text, StyleSheet } from 'react-native';
import TabHeader from './TabHeader';
import { act, useState } from 'react';

type TabDisplayType = {
    pages: { tabName: string; component: React.ReactNode }[];
};

const TabDisplay = ({ pages }: TabDisplayType) => {
    const [activeHeader, setActiveHeader] = useState(pages[0].tabName);

    const headers = pages.map((item) => item.tabName);

    const changeTab = (name: string) => {
        setActiveHeader(name);
    };

    const indexOfActiveItem = pages.findIndex((item) => item.tabName === activeHeader);

    return (
        <View>
            <TabHeader active={activeHeader} headers={headers} changeTab={changeTab} />
            <View style={style.container}>{pages[indexOfActiveItem].component}</View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        height: 500,
        paddingVertical: 10,
    },
});

export default TabDisplay;
