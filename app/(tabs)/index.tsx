import { View, Text } from 'react-native';
import ButtonTemp from '@/components/general/Button';
import PageWrapper from '@/components/general/PageWrapper';

const Homepage = () => {
    return (
        <PageWrapper>
            <Text>Home page</Text>
            <ButtonTemp text="Trial Button" />
        </PageWrapper>
    );
};

export default Homepage;
