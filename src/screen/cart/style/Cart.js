import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // marginHorizontal: 10,
    marginBottom: 45,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
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
    marginTop: 8,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: Colors.platinum,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
});

export default styles;
