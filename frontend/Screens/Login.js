import React, { useState, useCallback } from "react";
import { StyleSheet, View, ScrollView, AsyncStorage } from "react-native";
import { Text, Button, Input, Popover, Layout } from "@ui-kitten/components";
import useAxios from "axios-hooks";

const LoginPage = ({ history }) => {
  const togglePopover = () => {
    setVisible(!visible);
  };

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [chosenPage, setPage] = useState(true);
  const [password, setPassword] = useState("");
  const onPressSwitch = useCallback(() => {
    setPage(!chosenPage);
  }, [chosenPage]);
  const onPressLogin = useCallback(async () => {
    try {
      const { data } = await execute({ data: { username: value, password } });
      await AsyncStorage.setItem("token", data.token);
      history.push("/");
    } catch (e) {
      console.warn(e);

      setVisible(true);
    }
  }, [value, password, chosenPage, execute]);
  const [{ loading, error }, execute] = useAxios(
    {
      url: chosenPage
        ? "http://167.71.11.118:8000/api/login"
        : "http://167.71.11.118:8000/api/login-business",
      method: "POST"
    },
    { manual: true }
  );

  const onPressSignup = useCallback(() => {
    history.push("/signup");
  }, []);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "bhavuka",
          lineHeight: 300,
          fontWeight: "100",
          fontSize: 100,
          color: chosenPage ? "orange" : "#02D17B"
        }}
      >
        stampy!
      </Text>

      {visible && <Text style={{ fontSize: 15 }}>Error!</Text>}

      <Input
        style={styles.input}
        size={"medium"}
        value={value}
        onChangeText={setValue}
        placeholder="Email"
      />
      <Input
        style={styles.input}
        size={"medium"}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button
        style={styles.buttons}
        status={chosenPage ? "warning" : "success"}
        size="medium"
        onPress={onPressLogin}
      >
        {" "}
        Login{" "}
      </Button>
      <Text status="basic" style={styles.button}>
        Don't have an account?
      </Text>
      <Button
        appearance="ghost"
        status={chosenPage ? "warning" : "success"}
        size="medium"
        onPress={onPressSignup}
      >
        {" "}
        Sign Up{" "}
      </Button>
      <View
        style={{
          height: 150,
          flexDirection: "column-reverse"
        }}
      >
        <Button
          style={styles.buttons2}
          status="success"
          size="medium"
          onPress={onPressSwitch}
        >
          {" "}
          {chosenPage ? "Customer Login" : "Business Login"}{" "}
        </Button>
      </View>
      <Text status={chosenPage ? "warning" : "success"} category="p2">
        {chosenPage ? "Click to change business" : "Click to change customer"}
      </Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3"
  },
  input: {
    flexDirection: "row",
    marginHorizontal: "10%",
    marginVertical: "2%"
  },
  buttons: {
    textAlign: "center",
    margin: 5,
    borderWidth: 0,
    width: "100%",
    justifyContent: "flex-start",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.8
  },
  buttons2: {
    textAlign: "center",
    margin: 5,
    borderWidth: 0,
    backgroundColor: "#3a3535",
    width: "100%",
    justifyContent: "flex-start",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.8
  },
  popoverContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  }
};

export default LoginPage;
