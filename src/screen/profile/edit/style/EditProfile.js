import { Colors } from "../../../../constant/Colors";
import { Constants } from "../../../../constant/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingTop: Constants.headerHeight,
  },
  image: {
    borderRadius: 60,
    height: 120,
    width: 120,
  },
  edit: {
    bottom: 45,
    left: 52,
  },
  inputContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.yellow,
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
