import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: 10,
    marginBottom: 45,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    width: "98%",
    alignItems: "center",
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
    width: "100%",
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  footerText: {
    flexDirection: "row",
  },
  itemCount: {
    ...fonts.style.regularNormal,
    color: Colors.avocado,
    marginRight: 5,
  },
  total: {
    ...fonts.style.regularBold,
    color: Colors.brown,
  },
  button: {
    alignSelf: "flex-end",
  },
});

export default styles;
