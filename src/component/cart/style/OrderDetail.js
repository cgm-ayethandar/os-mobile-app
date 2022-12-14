import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    width: 300,
    elevation: 5,
    margin: 20,
    paddingHorizontal: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 10,
  },
  modalText: {
    ...fonts.style.regularBold,
    color: Colors.avocado,
  },
  detail: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  quantity: {
    flexDirection: "row",
    width: "35%",
    justifyContent: "space-between",
  },
  product: {
    width: "65%",
    paddingRight: 10,
  },
  boldText: {
    ...fonts.style.regularNormal,
  },
  grayText: {
    ...fonts.style.mediumBold,
    color: Colors.gray,
  },
  separator: {
    width: "100%",
  },
  total: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  button: {
    width: "100%",
    paddingVertical: 10,
  },
});

export default styles;
