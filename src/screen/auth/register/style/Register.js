import { Colors } from "../../../../constant/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.platinum,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
  },
  inputContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.platinum,
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  bottonContainer: {
    marginTop: 15,
  },
});

export default styles;
