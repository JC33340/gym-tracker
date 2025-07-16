import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '@/constants/Colors';
import { StyleSheet, View, Text } from 'react-native';

type CustomDropdownType = {
    data: { label: string; value: string | number }[];
    handleChange: (item: string | number) => void;
    placeholder?: string;
    value: string | number;
    label: string;
};

const CustomDropdown = ({ label, value, data, handleChange, placeholder }: CustomDropdownType) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                onChange={(item) => handleChange(item.value)}
                placeholder={placeholder}
                activeColor={Colors.light.main}
                containerStyle={styles.itemContainer}
                selectedTextStyle={styles.selectedText}
                value={value}
            ></Dropdown>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        rowGap: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 600,
    },
    dropdown: {
        borderColor: Colors.light.unFocused,
        borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    itemContainer: {
        borderRadius: 20,
    },
    selectedText: {
        fontWeight: 600,
        fontSize: 20,
    },
});

export default CustomDropdown;
