import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

type ButtonPropType = {
    text: string;
    handleClick?: () => void;
};

const ButtonTemp = ({ text, handleClick }: ButtonPropType) => {
    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <Text>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.light.main,
        borderWidth: 2,
        width: '50%',
    },
});

export default ButtonTemp;
