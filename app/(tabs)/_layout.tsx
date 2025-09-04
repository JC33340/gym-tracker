import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.light.main,
                    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0,0.2)',
                },
                headerTitle: 'Tracker',
                headerTitleStyle: {
                    color: Colors.light.secondary,
                    fontSize: 25,
                    fontWeight: '600',
                },
                tabBarStyle: {
                    backgroundColor: Colors.light.main,
                    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0,0.2)',
                },
                tabBarActiveTintColor: Colors.light.secondary,
                tabBarInactiveTintColor: Colors.light.unFocused,
                tabBarLabelStyle: { fontSize: 15 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome6
                            name="house"
                            size={20}
                            color={focused ? Colors.light.secondary : Colors.light.unFocused}
                            iconStyle="solid"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="excercises/index"
                options={{
                    title: 'Exercises',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome6
                            name="dumbbell"
                            size={20}
                            color={focused ? Colors.light.secondary : Colors.light.unFocused}
                            iconStyle="solid"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history/index"
                options={{
                    title: 'History',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome6
                            name="gear"
                            size={20}
                            color={focused ? Colors.light.secondary : Colors.light.unFocused}
                            iconStyle="solid"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
