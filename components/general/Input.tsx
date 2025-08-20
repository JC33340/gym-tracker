import { Colors } from '@/constants/Colors';
import { Text, View, TextInput, StyleSheet } from 'react-native';

type InputType = {
    placeholder: string;
    handleChange: (text: string) => void;
    label?: string;
    value: string;
    numberPad?: boolean;
};

const Input = ({ placeholder, handleChange, label, value, numberPad = false }: InputType) => {
    return (
        <View style={style.container}>
            {label && <Text style={style.label}>{label}</Text>}
            <TextInput
                style={style.input}
                placeholder={placeholder}
                onChangeText={(text) => handleChange(text)}
                value={value}
                keyboardType={numberPad ? 'decimal-pad' : 'default'}
            ></TextInput>
        </View>
    );
};

const style = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.light.unFocused,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 600,
    },
    container: {
        rowGap: 10,
    },
});

export default Input;
