import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    column: {
        flexDirection: "column",
        justifyContent: "space-between",
    },

    box: {
        width: 120,
        height: 120,
        borderWidth: 2,
        borderColor: "#999",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    boxText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});