import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  filterButton: {
    padding: 8,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: 'black',
  },
  weekContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
  },
});

export default styles;
