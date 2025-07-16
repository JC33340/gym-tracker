import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

type ButtonPropType = {
    text?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
};

const Button = ({ text, handleClick, children }: ButtonPropType) => {
    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            {children}
            {text && <Text style={styles.text}>{text}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.light.main,
        backgroundColor: Colors.light.main,
        borderRadius: 5,
        borderWidth: 2,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.light.secondary,
        fontSize: 20,
        fontWeight: 500,
    },
});

export default Button;
