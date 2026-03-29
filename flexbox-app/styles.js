import {StyleSheet, StatusBar} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
        backgroundColor: "#fff",
    },

    row: {
        flexDirection: "row",
        flex: 1,
    },

    column: {
        flex: 1,
    },

    box: {
        flex: 1, //Boxes stretch evenly using flex: 1
        backgroundColor: "#e6e6e6",
        borderWidth: 1,
        borderColor: "#999",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },

    boxText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});