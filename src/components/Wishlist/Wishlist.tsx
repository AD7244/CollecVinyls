import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CardVinyl from "../CardVinyl";
import {
  deleteVinyl,
  getVinyls,
  getWishedVinyls,
} from "../../database/Database";
import { Vinyl } from "../../type/Vinyl";

const styles = StyleSheet.create({
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
  },
});

const Wishlist = () => {
  const [allVinyls, setAllVinyls] = React.useState<Vinyl[]>();

  const handleGetWishedVinyls = async () => {
    const wishedVinyls = await getWishedVinyls();
    setAllVinyls(wishedVinyls);
  };

  const handleDeleteVinyl = (vinylToDelete: Vinyl) => {
    // Supprime le vinyle de l'état local
    setAllVinyls((prevVinyls) =>
      prevVinyls!.filter((vinyl) => vinyl.id !== vinylToDelete.id)
    );
    deleteVinyl(vinylToDelete); // On supprime le vinyle de la base de données aussi
  };

  useEffect(() => {
    handleGetWishedVinyls();
  }, []);
  return (
    <ScrollView>
      <View style={styles.grid}>
        {allVinyls?.map((vinyl) => (
          <CardVinyl
            key={vinyl.id}
            vinyl={vinyl}
            onDeleteVinyl={handleDeleteVinyl}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Wishlist;
