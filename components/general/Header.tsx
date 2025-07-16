import { Text, StyleSheet } from 'react-native';

type HeaderType = {
    text: string;
};

const Header = ({ text }: HeaderType) => {
    return <Text style={style.header}>{text}</Text>;
};

const style = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 700,
    },
});

export default Header;
