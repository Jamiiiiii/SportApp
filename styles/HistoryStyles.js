import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  filterButton: {
    padding: 8,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 150,
    alignItems: 'center',
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: "black",
  },
  weekContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 16,
  },
  Ionithreedots: {
    padding: 5,
  },
  editModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  editTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
  },
  modalButtonMinus: {
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
    padding: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalButtonPlus: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
    padding: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  editDropdown: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 10,
    width: 75,
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 45,
    elevation: 5,
  },
  editDropdownText: {

  }
});

export default styles;
