import { StyleSheet, View } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import type { setType } from '@/types';
import { Colors } from '@/constants/Colors';

type InsightChartsType = {
    labels: string[];
    values: number[];
    title: string;
};

const InsightCharts = ({ labels, values, title }: InsightChartsType) => {
    const option = {
        title: {
            text: title,
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: labels,
            axisLabel: {
                show: true,
                margin: 8,
            },
        },
        color: Colors.light.main,
        grid: { left: '12%', bottom: 40 },
        yAxis: { name: 'Weight (KG)' },
        datazoom: {
            disabled: false,
        },
        series: [
            {
                data: values,
                type: 'line',
            },
        ],
    };
    return (
        <View style={style.container}>
            <RNEChartsPro height={250} option={option} />
        </View>
    );
};

const style = StyleSheet.create({
    container: {},
});

export default InsightCharts;
