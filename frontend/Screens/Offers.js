import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { List, ListItem } from "@ui-kitten/components";
import useCustomAxios from "../Hooks/useCustomAxios";

const Item = ({ item, index }) => {
  return (
    console.log("item.offer_image: ", item.offer_image),
    (
      <View>
        <View>
          {item.offer_image ? (
            <Image
              style={styles.image}
              source={{ uri: item.offer_image }}
            ></Image>
          ) : (
            <Image
              style={styles.image}
              source={
                index % 2 == 1
                  ? require("../assets/molecule_logo.png")
                  : require("../assets/starbucks_logo.png")
              }
            />
          )}
        </View>
        <ListItem
          key={index}
          title={item.offer_body}
          description={item.offer_expire_date}
          style={styles.item}
          titleStyle={{ fontSize: 18 }}
        />
      </View>
    )
  );
};

const OffersPage = () => {
  const [{ data, loading, error }, execute] = useCustomAxios({
    url: "/offer-list",
    method: "GET"
  });
  console.warn(data);

  return (
    !loading && (
      <List
        contentContainerStyle={styles.contentContainer}
        data={data.data.offers}
        renderItem={Item}
        style={{ width: "100%" }}
      />
    )
  );
};

export default OffersPage;

const styles = StyleSheet.create({
  contentContainer: {},
  image: {
    width: "100%",
    height: 200,
    resizeMode: "stretch"
  }
});
