import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

type ButtonPropType = {
    text?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    backgroundColor?: string;
};

const Button = ({ text, handleClick, children, backgroundColor }: ButtonPropType) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: backgroundColor ?? styles.container.backgroundColor,
            }}
            onPress={handleClick}
        >
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
