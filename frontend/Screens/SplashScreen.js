import React, { useEffect } from "react";
import { StyleSheet, View, AsyncStorage, Image } from "react-native";
import {
  Menu,
  Icon,
  Text,
  ListItem,
  List,
  Button
} from "@ui-kitten/components";
import useCustomAxios from "../Hooks/useCustomAxios";

const SplashScreen = ({ history }) => {
  const [{ loading, error }, execute] = useCustomAxios(
    {
      url: "/get-user",
      method: "GET"
    },
    { manual: true }
  );
  useEffect(() => {
    const func = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const { data } = await execute();
          console.warn(data);
          if (data.data["user-type"] === "customer") {
            history.push("/home");
          } else if (data.data["user-type"] === "business_cashier") {
            history.push("/business/home");
          } else {
            history.push("/insight");
          }
        } else {
          history.push("/login");
        }
      } catch (e) {
        console.warn(e);
        history.push("/login");
      }
    };
    func();
  }, []);
  return (
    <Text
      style={{
        fontFamily: "bhavuka",
        lineHeight: 200,
        fontWeight: "100",
        fontSize: 100,
        color: "orange",
        textAlign: "center"
      }}
    >
      stampy!
    </Text>
  );
};

export default SplashScreen;
