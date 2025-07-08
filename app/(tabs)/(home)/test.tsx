import { Stack } from "expo-router";
import { View, Text } from "react-native";

const Test = () => {
  return (
    <>
        <Stack.Screen options={{title:'Stinky'}}/>
      <View>
        <Text>Test</Text>
      </View>
    </>
  );
};

export default Test;
