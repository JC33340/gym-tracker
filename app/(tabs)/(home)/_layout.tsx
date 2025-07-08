import { Stack } from "expo-router";

const HomeLayout = ()=>{
    return(
        <Stack>
            <Stack.Screen name="index"/>
            <Stack.Screen name="test"/>
        </Stack>
    )
}

export default HomeLayout