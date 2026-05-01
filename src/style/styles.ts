import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getHomeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: 10,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      margin: 10,
      textAlign: "center",
      color: theme.colors.onSurface,
    },
  });

export const AddVinylstyles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginVertical: 12,
    alignSelf: "center",
    borderRadius: 8,
  },
  container: {
    padding: 16,
    gap: 8,
  },
  input: {
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 20,
  },
});

export const getCardStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      padding: 16,
      margin: 10,
      borderRadius: 12,
      shadowColor: "rgba(0,0,0,0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      width: "40%",
      alignSelf: "center",
      alignItems: "center",
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 12,
      borderRadius: 8,
    },
    placeholder: {
      width: 150,
      height: 150,
      marginVertical: 12,
      alignSelf: "center",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    fullScreenImage: {
      width: "95%",
      height: "80%",
      borderRadius: 12,
      resizeMode: "contain",
    },
    artist: {
      fontSize: 16,
      marginBottom: 4,
      textAlign: "center",
      color: theme.colors.onSurface,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 6,
      textAlign: "center",
      color: theme.colors.onSurface,
    },
    year: {
      fontSize: 14,
      textAlign: "center",
    },
    button: {
      width: "100%",
    },
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      minHeight: 100,
      alignItems: "center", // Centre les boutons horizontalement
      justifyContent: "center", // Centre les boutons verticalement
      gap: 20, // Espace entre les éléments dans le container
      borderTopWidth: 1, // Ajoute une bordure en haut
    },
    selectedCard: {
      borderWidth: 2, // Largeur de la bordure
      borderColor: "#B0B0B0", // Couleur gris clair de la bordure
      shadowColor: "#B0B0B0", // Ombre discrète
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.3,
    },
  });
