import { StyleSheet, Text } from 'react-native';

type SmallHeaderType = {
    text: string;
};

const SmallHeader = ({ text }: SmallHeaderType) => {
    return <Text style={style.name}>{text}</Text>;
};

const style = StyleSheet.create({
    name: {
        fontSize: 25,
        fontWeight: 600,
        textTransform: 'capitalize',
    },
});

export default SmallHeader;
