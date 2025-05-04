import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CardVinyl from "../CardVinyl";
import { getVinyls, getWishedVinyls } from "../../database/Database";
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

  useEffect(() => {
    handleGetWishedVinyls();
  }, []);
  return (
    <ScrollView>
      <View style={styles.grid}>
        {allVinyls?.map((vinyl) => (
          <CardVinyl key={vinyl.id} {...vinyl} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Wishlist;
