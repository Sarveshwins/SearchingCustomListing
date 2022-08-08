import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const SearchingCard = (props) => {
  const { searching, render, onPress } = props;
  const Item = ({ search }) => {
    return (
      <>
        {render.map((item, index) => {
          return (
            <View style={styles.nameStripe} key={`${index}`}>
              <NameStripe
                tittle={item?.title}
                value={search[item.value]}
                key={item.title}
              />
            </View>
          );
        })}
      </>
    );
  };
  return (
    <Pressable
      style={[styles.cardContainer, { width: windowWidth / 2 - 20 }]}
      onPress={() => (onPress ? onPress(searching) : console.log(searching))}
    >
      <Item search={searching} />
    </Pressable>
  );
};
const NameStripe = (props) => {
  const { tittle, value, index } = props;
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1.2 }}>
        <Text>{tittle}</Text>
      </View>
      <View style={{ flex: 3, marginStart: 2 }}>
        <Text>{value}</Text>
      </View>
    </View>
  );
};
export default SearchingCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: "auto",
    padding: 5,
    minHeight: 132,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    borderColor: "#C4C4C4",
    justifyContent: "center",
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    margin: 5,
  },
});
