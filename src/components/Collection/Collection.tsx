import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CardVinyl from "../CardVinyl";
import { deleteVinyl, getCollectedVinyls } from "../../database/Database";
import { Vinyl } from "../../type/Vinyl";
import { useFocusEffect } from "@react-navigation/native";

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

const Collection = () => {
  const [allCollectedVinyls, setAllCollectedVinyls] = React.useState<Vinyl[]>();

  const handleGetCollectedVinyls = async () => {
    const collectedVinyls = await getCollectedVinyls();
    setAllCollectedVinyls(collectedVinyls);
  };

  const handleDeleteVinyl = (vinylToDelete: Vinyl) => {
    // Supprime le vinyle de l'état local
    setAllCollectedVinyls((prevVinyls) =>
      prevVinyls!.filter((vinyl) => vinyl.id !== vinylToDelete.id)
    );
    deleteVinyl(vinylToDelete); // On supprime le vinyle de la base de données aussi
  };

  useFocusEffect(
    useCallback(() => {
      handleGetCollectedVinyls();
    }, [])
  );
  useEffect(() => {
    handleGetCollectedVinyls();
  }, []);
  return (
    <ScrollView>
      <View style={styles.grid}>
        {allCollectedVinyls?.map((allCollectedVinyls) => (
          <CardVinyl
            key={allCollectedVinyls.id}
            vinyl={allCollectedVinyls}
            onDeleteVinyl={handleDeleteVinyl}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Collection;
