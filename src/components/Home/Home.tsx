import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CardVinyl from "../CardVinyl";
import { getVinyls } from "../../database/Database";
import { Vinyl } from "../../type/Vinyl";
import { HomeStyles } from "../../style/styles";

const Home = () => {
  const [allVinyls, setAllVinyls] = React.useState<Vinyl[]>();
  const handleGetVinyls = async () => {
    const allVinyls = await getVinyls();
    setAllVinyls(allVinyls);
  };

  useEffect(() => {
    handleGetVinyls();
  }, []);
  return (
    <>
      <View>
        <Text style={HomeStyles.title}>Derniers ajouts dans la collec</Text>
      </View>

      <ScrollView contentContainerStyle={HomeStyles.grid}>
        {allVinyls
          ?.slice(-4)
          .reverse()
          .map((vinyl) => (
            <CardVinyl key={vinyl.id} {...vinyl} />
          ))}
      </ScrollView>
    </>
  );
};

export default Home;
