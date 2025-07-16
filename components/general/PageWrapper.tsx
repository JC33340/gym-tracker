import { View, StyleSheet } from 'react-native';

type PageWrapperType = {
    children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperType) => {
    return <View style={style.container}>{children}</View>;
};

const style = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        position: 'relative',
    },
});

export default PageWrapper;
