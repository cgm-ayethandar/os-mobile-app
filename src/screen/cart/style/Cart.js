import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 45,
    alignItems: "center",
    flex: 5,
  },
  header: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    ...fonts.style.regularBold,
    color: Colors.yellow,
  },
  footer: {
    flex: 1,
    width: "95%",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  itemCount: {
    ...fonts.style.bigNormal,
    color: Colors.avocado,
  },
  total: {
    ...fonts.style.bigNormal,
    color: Colors.brown,
  },
});

export default styles;
