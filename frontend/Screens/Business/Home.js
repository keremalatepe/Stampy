import React from "react";
import { Text, ListItem, Icon, Button } from "@ui-kitten/components";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

export default ({ history }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.header}> stampy!</Text>
      </View>
      <View style={{ flex: 5, alignItems: "center", justifyContent: "center" }}>
        <Button
          style={styles.buttons}
          textStyle={{
            textAlign: "center",
            width: "100%",
            fontSize: 24,
            lineHeight: 24
          }}
          onPress={() => history.push("/business/qrscan")}
        >
          Read QR
        </Button>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between"
  },
  buttons: {
    backgroundColor: "#3a3535",
    borderWidth: 0,
    height: "10%",
    width: "50%",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.8
  },
  signOutButton: {
    marginTop: "10%",
    color: "#232020"
  },
  container2: {
    width: "100%",
    height: 100,
    flex: 0.1,
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
  }
});
