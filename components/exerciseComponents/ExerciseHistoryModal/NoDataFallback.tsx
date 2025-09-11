import { View, StyleSheet, Text } from 'react-native';
import SmallHeader from '@/components/general/SmallHeader';

type NoDataFallbackType = {
    title: string;
};

const NoDataFallback = ({ title }: NoDataFallbackType) => {
    return (
        <View style={style.container}>
            <SmallHeader text={title} />
            <View style={style.textContainer}>
                <Text>Not enough data</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        height: 250,
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
});

export default NoDataFallback;
