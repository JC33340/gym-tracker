import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

type ModalWrapperType = {
    visible: boolean;
    children: React.ReactNode;
    handleOutsideTouch?: () => void;
    hasCross?: boolean;
    handleCrossPress?: () => void;
};

const ModalWrapper = ({
    visible,
    children,
    handleOutsideTouch,
    hasCross = false,
    handleCrossPress,
}: ModalWrapperType) => {
    return (
        <>
            <Modal visible={visible} transparent={true} animationType="slide">
                <TouchableOpacity onPress={handleOutsideTouch} activeOpacity={1}>
                    <SafeAreaView style={style.wrapper}>
                        <TouchableWithoutFeedback>
                            <View style={style.container}>
                                {hasCross && (
                                    <TouchableOpacity
                                        onPress={handleCrossPress}
                                        style={style.crossContainer}
                                    >
                                        <FontAwesome6
                                            name="x"
                                            iconStyle="solid"
                                            size={20}
                                            color={Colors.light.unFocused}
                                            style={style.cross}
                                        />
                                    </TouchableOpacity>
                                )}
                                {children}
                            </View>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const style = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '20%',
        paddingVertical: '100%',
    },
    container: {
        borderWidth: 2,
        borderColor: Colors.light.main,
        width: '100%',
        padding: '5%',
        borderRadius: 10,
        rowGap: 10,
        backgroundColor: Colors.light.secondary,
    },
    crossContainer: {
        alignItems: 'flex-end',
    },
    cross: {
        backgroundColor: Colors.light.lightGray,
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        borderRadius: '20%',
    },
});

export default ModalWrapper;
