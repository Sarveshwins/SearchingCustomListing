import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Searching from "./src/Searching";
import Data from "./src/data/generated.json";

const App = () => {
  const listing = ["name"];
  const render = [
    {
      title: "Name",
      value: "name",
    },
    {
      title: "Email",
      value: "email",
    },
    {
      title: "Phone",
      value: "phone",
    },
    {
      title: "Company",
      value: "company",
    },
    // {
    //   title: "Gender",
    //   value: "gender",
    // },
    {
      title: "Eye Color",
      value: "eyeColor",
    },
  ];
  const onPressOnCard = () => {};
  const placeholder = "Search.................";
  return (
    <>
      <Searching
        render={render} // items which are rendered on the card
        listing={listing} // Listing of fields to be displayed on the card
        Data={Data} // Data is an array of objects
        onPressOnCard={(item) => {
          console.log(item);
        }} // Here we can pass the function to onPressOnCard prop of Searching component
        searchPlaceholder={placeholder} // Search placeholder
        autoCapitalize={"characters"} //characters || sentences || words || none
        field="name" // field to be sorted
        order="asc" // mode of sorting asc || desc
      />
    </>
  );
};

export default App;
