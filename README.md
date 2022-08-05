# SearchingCustomListing

## Installation

### Install the library

using either Yarn:

```
yarn add react-native-searching-and-listing
```

or npm:

````
npm install --save react-native-searching-and-listing
## Usage

```js

import React from 'react'
import { View} from 'react-native'
import Searching from 'react-native-searching-listing'

const index=()=>{
  const searchable = ["name", "email", "phone", "address", "company"];
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
  const placeholder = "Search";
  const sort = {
    field: "name",
    order: "asc",
  };
  return (
    <>
      <Searching
        render={render} // items which are rendered on the card
        searchable={searchable} // Listing of fields to be searched from data source
        Data={Data} // Data is an array of objects
        onPress={(item) => {
          console.log(item?._id);
        }} // Here we can pass the function to onPressOnCard prop of Searching component
        searchPlaceholder={placeholder} // Search placeholder
         autoCapitalize={"characters"} //characters || sentences || words || none

        // sort={sort} // sort function ||  field to be sorted ||  mode of sorting asc || desc
      />
    </>
  );

}

export default index

````
