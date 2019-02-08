import {StyleSheet} from "react-native";
import * as theme from "src/theme/";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        width: 235,
        height: 50,
        color: "red",
    },
    buttonText: {
        color: theme.white,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16,
    },
    text: {
        fontSize: 15,
        paddingBottom: 40,
        paddingTop: 40,
    },
});
