import ModalWrapper from '@/components/general/ModalWrapper';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState, useContext } from 'react';
import { appContext } from '@/app/_layout';
import type { exerciseType, setType } from '@/types';
import TabDisplay from '@/components/general/TabDisplay/TabDisplay';
import HistoryPage from './HistoryPage';
import InsightsPage from './InsightsPage';

type ExerciseHistoryModalType = {
    children: React.ReactNode;
    exercise: exerciseType;
};

const ExerciseHistoryModal = ({ children, exercise }: ExerciseHistoryModalType) => {
    const context = useContext(appContext);

    const history: setType[] | undefined = context?.exercises.filter(
        (item) => item.id === exercise.id
    )[0].history;

    const [isVisible, setIsVisible] = useState(false);

    const handleModalVisbility = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <>
            <TouchableOpacity onPress={handleModalVisbility}>{children}</TouchableOpacity>
            <ModalWrapper
                handleOutsideTouch={handleModalVisbility}
                hasCross
                handleCrossPress={handleModalVisbility}
                visible={isVisible}
            >
                <View>
                    <TabDisplay
                        pages={[
                            {
                                tabName: 'Insights',
                                component: <InsightsPage history={history} />,
                            },
                            { tabName: 'History', component: <HistoryPage history={history} /> },
                        ]}
                    />
                </View>
            </ModalWrapper>
        </>
    );
};

export default ExerciseHistoryModal;
