import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import LineGraph from "../Components/LineGraph";
import PieGraph2 from "../Components/PieGraph2";
import PieGraph from "../Components/PieGraph";
import { Text, Button } from "@ui-kitten/components";
import { StatusBar } from "react-native";
import useCustomAxios from "../Hooks/useCustomAxios";

const InsightPage = ({ history }) => {
  const [{ data, loading, error }, execute] = useCustomAxios({
    url: "/insights",
    method: "GET"
  });
  console.warn(data);
  return (
    <View style={styles.background}>
      <ScrollView style={styles.map_container}>
        <View style={styles.container}>
          <Text style={styles.header}> stampy!</Text>
        </View>
        <View style={styles.alternativeContainer}>
          <Text category="h6" style={styles.text}>
            Total Coffee Sold
          </Text>
        </View>
        <Text style={styles.text} status="success" category="h1">
          {" "}
          {((data || {}).data || {}).total_coffee}{" "}
        </Text>
        <View style={styles.alternativeContainer}>
          <Text category="h6" style={styles.text}>
            Customer Profile by Age
          </Text>
        </View>
        <PieGraph2
          style={styles.graph}
          data={((data || {}).data || {}).age_distribution || {}}
        ></PieGraph2>
        <View style={styles.alternativeContainer}>
          <Text category="h6" style={styles.text}>
            Distribution of Sales by Month
          </Text>
        </View>
        <LineGraph data={((data || {}).data || {}).monthly_sell}></LineGraph>
        <View style={styles.alternativeContainer}>
          <Text category="h6" style={styles.text}>
            Customer Profile by Gender{" "}
          </Text>
        </View>
        <PieGraph
          data={((data || {}).data || {}).gender_distribution || {}}
        ></PieGraph>
        <Button
          textStyle={styles.signOutButton}
          appearance="ghost"
          size="large"
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            history.push("/login");
          }}
        >
          Sign Out
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  map_container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f3f3f3",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "grey",
    shadowOpacity: 0.8
  },
  text: {
    margin: 8,
    textAlign: "center",
    fontWeight: "300"
  },
  alternativeContainer: {
    backgroundColor: "#f3f3f3",
    alignSelf: "stretch",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "grey",
    shadowOpacity: 0.8
  },
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f3f3f3"
  },
  graph: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "grey",
    shadowOpacity: 0.8
  },
  container: {
    width: "100%",
    height: 100,
    flex: 1,
    backgroundColor: "#00e197",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "grey",
    shadowOpacity: 0.6
  },
  header: {
    fontFamily: "bhavuka",
    marginTop: 9,
    flex: 1,
    lineHeight: 100,
    fontWeight: "100",
    fontSize: 50,
    color: "white"
  },
  signOutButton: {
    color: "#232020"
  }
});

export default InsightPage;
