import React from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Vinyl } from "../type/Vinyl";
import { CardVinylStyles } from "../style/styles";

const CardVinyl = (vinyl: Vinyl) => {
  const [viewCover, setViewCover] = React.useState(false); // pour afficher la cover en grand
  const [showOptions, setShowOptions] = React.useState(false); // pour afficher le menu d'options
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setViewCover(true);
    setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 10); // petit delay pour laisser le Modal apparaître
  };

  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setViewCover(false);
    });
  };

  const handleLongPress = () => {
    setShowOptions(true);
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <>
      <Pressable
        style={CardVinylStyles.card}
        onPress={openModal}
        onLongPress={handleLongPress}
        delayLongPress={150}
      >
        <View>
          {vinyl.coverPath ? (
            <Image
              source={{ uri: vinyl.coverPath }}
              style={CardVinylStyles.image}
            />
          ) : (
            <View style={CardVinylStyles.placeholder}>
              <MaterialCommunityIcons name="album" size={40} color="#aaa" />
            </View>
          )}

          <Text style={CardVinylStyles.title}>{vinyl.title}</Text>
          <Text style={CardVinylStyles.artist}>
            {vinyl.artist + (vinyl.releaseYear && " - " + vinyl.releaseYear)}
          </Text>
        </View>
      </Pressable>

      {/* Modal pour afficher la cover en grand */}
      <Modal visible={viewCover} transparent animationType="none">
        <Pressable style={CardVinylStyles.modalBackground} onPress={closeModal}>
          <Animated.Image
            source={{ uri: vinyl.coverPath }}
            style={[
              CardVinylStyles.fullScreenImage,
              { transform: [{ scale: scaleAnim }] },
            ]}
          />
        </Pressable>
      </Modal>

      {/* Modal pour afficher le menu d'options */}
      <Modal
        visible={showOptions}
        transparent
        animationType="slide"
        onRequestClose={closeOptions}
      >
        <Pressable
          style={{ flex: 1, justifyContent: "flex-end" }}
          onPress={closeOptions}
        >
          <View style={CardVinylStyles.modalContainer}>
            <Button
              mode="contained"
              onPress={handleEdit}
              style={CardVinylStyles.button}
            >
              Modifier
            </Button>
            <Button
              mode="contained"
              onPress={handleEdit}
              style={CardVinylStyles.button}
            >
              Supprimer
            </Button>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default CardVinyl;
