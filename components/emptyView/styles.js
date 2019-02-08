import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 15,
        paddingTop: 40,
    },
    emptySet: {
        flex: 1,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
});
