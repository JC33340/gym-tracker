import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

type TimerType = {
    startTime: number | null;
};

const Timer = ({ startTime }: TimerType) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const getTime = () => {
        const date = Date.now();
        if (startTime) {
            const difference = date - startTime;
            setSeconds(Math.floor(difference / 1000) % 60);
            setMinutes(Math.floor(difference / 1000 / 60) % 60);
            setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    });

    return (
        <View style={style.container}>
            {hours > 0 && <Text style={style.text}>{hours / 10 < 1 ? '0' + hours : hours}:</Text>}
            <Text style={style.text}>
                {minutes / 10 < 1 ? '0' + minutes : minutes}:
                {seconds / 10 < 1 ? '0' + seconds : seconds}
            </Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        opacity: 0.3,
    },
    text: {
        fontSize: 30,
    },
});

export default Timer;
