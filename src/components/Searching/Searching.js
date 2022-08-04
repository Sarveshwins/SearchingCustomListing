import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const Searching = (props) => {
  const { searching, render, onPress } = props;
  const Item = ({ search }) => {
    return (
      <>
        {render.map((item, index) => {
          return (
            <>
              <NameStripe
                tittle={item?.title}
                value={search[item.value]}
                key={item.title}
              />
            </>
          );
        })}
      </>
    );
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => (onPress ? onPress(searching) : console.log(searching))}
    >
      <Item search={searching} />
    </Pressable>
  );
};

const NameStripe = (props) => {
  const { tittle, value, index } = props;
  return (
    <View style={styles.nameStripe} key={`${index}--${value}`}>
      <View style={{ flex: 1 }}>
        <Text>{tittle}</Text>
      </View>
      <View style={{ flex: 3 }}>
        <Text>{value}</Text>
      </View>
    </View>
  );
};
export default Searching;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 135,
    borderWidth: 0.5,
    marginVertical: 10,
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
  },
  nameStripe: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
  },
});
