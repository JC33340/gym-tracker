import { View, Text } from "react-native";
import { Link } from "expo-router";

const Index = ()=>{
    return(
        <View>
            <Text>Index</Text>
            <Link href='/(tabs)/tabstest'>To testy</Link>
        </View>
    )
}

export default Index