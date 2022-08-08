import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Searching from "../components/Searching";
import SearchingCard from "../components/SearchingCard";

const SearchingAndListing = (props) => {
  const {
    render,
    searchable,
    Data,
    searchPlaceholder,
    autoCapitalize,
    sort,
    onPress,
    mode,
  } = props;
  const { field, order } = sort || {};
  const [searching, setSearching] = useState("");

  const onMultipleSearching = (item, field, sort) => {
    return onSortingByField(field, sort).filter((data) => {
      return (
        item?.length === 0 ||
        searchable.some((list) => {
          return data?.[list]
            ?.toLowerCase()
            ?.includes(item.trim()?.toLowerCase());
        })
      );
    });
  };
  const onSortingByField = (field, order) => {
    if (order === "asc") {
      return Data.sort((a, b) => {
        return a[field] > b[field] ? 1 : -1;
      });
    } else if (order === "desc") {
      return Data.sort((a, b) => {
        return a[field] < b[field] ? 1 : -1;
      });
    }
    return Data;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={[
          styles.secondaryContainer,
          !Data || !render
            ? { justifyContent: "center", alignItems: "center" }
            : {},
        ]}
      >
        {Data && render ? (
          <>
            {searchable && (
              <View style={styles.searchingContainer}>
                <View style={styles.leftSearchingArea}>
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder={
                      searchPlaceholder ? searchPlaceholder : "Search"
                    }
                    autoCapitalize={autoCapitalize && autoCapitalize}
                    autoCorrect={false}
                    value={searching}
                    onChangeText={setSearching}
                  />
                </View>
                <Pressable style={styles.rightSearchingArea}>
                  <AntDesign name="search1" size={30} color={"white"} />
                </Pressable>
              </View>
            )}
            {mode ? (
              <FlatList
                data={onMultipleSearching(searching, field, order)}
                renderItem={({ item }) => (
                  <Searching
                    searching={item}
                    render={render}
                    onPress={onPress}
                  />
                )}
                keyExtractor={(item, index) => item + index}
              />
            ) : (
              <FlatList
                data={onMultipleSearching(searching, field, order)}
                numColumns={2}
                renderItem={({ item }) => (
                  <SearchingCard
                    searching={item}
                    render={render}
                    onPress={onPress}
                  />
                )}
                keyExtractor={(item, index) => item + index}
              />
            )}
          </>
        ) : (
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Nothing to Preview
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchingAndListing;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  secondaryContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchingContainer: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: "row",
    borderColor: "#C4C4C4",
  },
  leftSearchingArea: {
    flex: 3,
    paddingHorizontal: 10,
  },
  rightSearchingArea: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
  },
});
