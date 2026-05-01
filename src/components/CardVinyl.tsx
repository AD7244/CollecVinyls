import React, { useEffect } from "react";
import { Animated, Modal, Pressable, View, Image, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { Vinyl } from "../type/Vinyl";
import { CardVinylStyles, getCardStyles } from "../style/styles";
import { deleteVinyl } from "../database/Database";

interface CardVinylProps {
  vinyl: Vinyl;
  onDeleteVinyl: (vinyl: Vinyl) => void;
}

const CardVinyl = (props: CardVinylProps) => {
  const [viewCover, setViewCover] = React.useState(false); // pour afficher la cover en grand
  const [showOptions, setShowOptions] = React.useState(false); // pour afficher le menu d'options
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const theme = useTheme();
  const styles = getCardStyles(theme);

  const openModal = () => {
    if (props.vinyl.coverPath) {
      setViewCover(true);
      setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 10); // petit delay pour laisser le Modal apparaître
    }
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
    navigation.navigate("AddOrModify", {
      vinyl: props.vinyl,
      modify: true,
    });
  };

  const handleDelete = () => {
    props.onDeleteVinyl(props.vinyl);
  };

  return (
    <>
      <Pressable
        style={styles.card}
        onPress={openModal}
        onLongPress={handleLongPress}
        delayLongPress={150}
      >
        <View>
          {props.vinyl.coverPath ? (
            <Image
              source={{ uri: props.vinyl.coverPath }}
              style={styles.image}
            />
          ) : (
            <View style={styles.placeholder}>
              <MaterialCommunityIcons name="album" size={40} color="#aaa" />
            </View>
          )}

          <Text style={styles.title}>{props.vinyl.title}</Text>
          <Text style={styles.artist}>
            {props.vinyl.artist +
              (props.vinyl.releaseYear && " - " + props.vinyl.releaseYear)}
          </Text>
        </View>
      </Pressable>

      {/* Modal pour afficher la cover en grand */}
      <Modal visible={viewCover} transparent animationType="none">
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <Animated.Image
            source={{ uri: props.vinyl.coverPath }}
            style={[
              styles.fullScreenImage,
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
          <View style={styles.modalContainer}>
            <Button mode="contained" onPress={handleEdit} style={styles.button}>
              Modifier
            </Button>
            <Button
              mode="contained"
              onPress={handleDelete}
              style={styles.button}
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
