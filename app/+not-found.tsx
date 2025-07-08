import { View, Text } from "react-native";
import { Stack } from "expo-router";

const NotFound = () => {
  return (
    <>
        <Stack.Screen options={{title:'Not fgound'}}/>
      <View>
        <Text>Not found</Text>
      </View>
    </>
  );
};

export default NotFound;
