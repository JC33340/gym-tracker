import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

type ButtonPropType = {
    text?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    backgroundColor?: string;
    disabled?: boolean;
    size?: 'sm' | 'md';
};

const Button = ({
    text,
    handleClick,
    children,
    backgroundColor,
    disabled = false,
    size = 'md',
}: ButtonPropType) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: backgroundColor ?? styles.container.backgroundColor,
                opacity: disabled ? 0.5 : 1,
            }}
            onPress={handleClick}
            disabled={disabled}
        >
            {children}
            {text && (
                <Text style={{ ...styles.text, fontSize: size === 'md' ? 20 : 12 }}>{text}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.light.main,
        backgroundColor: Colors.light.main,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10,
        width: '100%',
    },
    text: {
        color: Colors.light.secondary,
        fontSize: 20,
        fontWeight: 500,
    },
});

export default Button;
