import React, { useState, useCallback } from "react";
import {
  Menu,
  Icon,
  Text,
  ListItem,
  List,
  Button
} from "@ui-kitten/components";
import { withRouter } from "react-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const CompassIcon = style => <Icon {...style} name="compass-outline" />;

const RewardIcon = style => <Icon {...style} name="gift-outline" />;

const data = [
  {
    title: "Offers & rewards",
    icon: RewardIcon,
    route: "/offers"
  },
  {
    title: "Discover",
    icon: CompassIcon,
    route: "/discover"
  }
];

const MainMenu = ({ history }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {data.map((button, index) => {
        const CustomIcon = button.icon;
        return (
          <Button
            key={index}
            icon={CustomIcon}
            onPress={() => {
              history.push(button.route);
            }}
            style={styles.buttons}
          >
            {button.title}
          </Button>
        );
      })}
    </View>
  );
};
export default withRouter(MainMenu);

const styles = StyleSheet.create({
  contentContainer: { flex: 1, flexDirection: "row" },
  buttons: {
    backgroundColor: "#3a3535",
    margin: 5,
    borderWidth: 0,
    width: "100%",
    justifyContent: "flex-start",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.8
  }
});
