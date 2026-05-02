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

export const makeAddVinylStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    searchSection: {
      marginBottom: 10,
      position: "relative",
      elevation: 5,
    },
    listContainer: {
      position: "absolute",
      top: 60,
      left: 0,
      right: 0,
      height: 300,
      backgroundColor: theme.colors.elevation.level2,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      zIndex: 5000,
      elevation: 5,
      overflow: "hidden",
    },
    flatList: {
      position: "absolute",
      top: 60,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.elevation.level2,
      height: 300,
      zIndex: 1000,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
    },
    albumItem: {
      flexDirection: "row",
      padding: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.outlineVariant,
      alignItems: "center",
    },
    cover: {
      width: 50,
      height: 50,
      borderRadius: 4,
    },
    info: {
      marginLeft: 12,
      flex: 1,
    },
    title: {
      fontWeight: "bold",
      fontSize: 14,
      color: theme.colors.onSurface,
    },
    artist: {
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
    },
    input: {
      marginBottom: 12,
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginVertical: 10,
      alignSelf: "center",
    },
    radioGroup: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 10,
    },
    button: {
      marginTop: 20,
      marginBottom: 40,
    },
  });
