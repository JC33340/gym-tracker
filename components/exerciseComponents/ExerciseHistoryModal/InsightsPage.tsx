import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { setType } from '@/types';
import InsightCharts from './InsightCharts';
import NoDataFallback from './NoDataFallback';

type InsightsPageType = {
    history: setType[] | undefined;
};

const InsightsPage = ({ history }: InsightsPageType) => {
    const dates = [];
    const totalVolumeData = [];
    const bestSetData = [];
    const ORMData = [];

    if (history) {
        for (let set of history) {
            //date
            const date = new Date(set.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
            });
            dates.push(date);
            let sum = 0;
            let bestSet = 0;
            let ORM = 0;
            for (let item of set.sets) {
                const setTotal = item.weight * item.reps;
                sum += setTotal;
                bestSet = setTotal > bestSet ? setTotal : bestSet;
                ORM = Math.floor(item.weight * (1 + 0.0333 * item.reps));
            }
            ORMData.push(ORM);
            bestSetData.push(bestSet);
            totalVolumeData.push(sum);
        }
    }
    return (
        <View>
            <ScrollView>
                <TouchableWithoutFeedback>
                    {dates.length > 1 ? (
                        <View>
                            <InsightCharts
                                title="Total Volume"
                                labels={dates}
                                values={totalVolumeData}
                            />
                            <InsightCharts title="Best Set" labels={dates} values={bestSetData} />
                            <InsightCharts title="Max Rep" labels={dates} values={ORMData} />
                        </View>
                    ) : (
                        <View>
                            <NoDataFallback title="Total Volume" />
                            <NoDataFallback title="Best Set" />
                            <NoDataFallback title="Max Rep" />
                        </View>
                    )}
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    );
};

export default InsightsPage;
