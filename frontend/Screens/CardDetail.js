import React, { useCallback } from "react";
import { StyleSheet, Image, View } from "react-native";
import { List, ListItem, Icon, Button } from "@ui-kitten/components";
import Card from "../Components/Card";
import { useParams } from "react-router-native";
import { withRouter } from "react-router";
import useCustomAxios from "../Hooks/useCustomAxios";

const CardDetail = ({ history }) => {
  const { id, stamp, business } = useParams();
  const [{ deleteCardLoading, deleteCardError }, deleteCard] = useCustomAxios(
    {
      url: "/card-delete",
      method: "POST"
    },
    { manual: true }
  );
  const onPressDeleteCard = useCallback(
    async id => {
      const response = await deleteCard({
        data: { business_id: id }
      });
      history.push(`/`);
    },
    [deleteCard]
  );
  console.warn(id);
  return (
    <View style={styles.container}>
      <Card
        image={require("../assets/card.jpg")}
        business={business}
        stamp={stamp}
        mode="detail"
      ></Card>
      <Button
        style={styles.button}
        appearance="ghost"
        status="basic"
        size="giant"
        onPress={() => {
          history.push(`/stamp/${id}`);
        }}
      >
        Stamp Card
      </Button>
      <Button
        style={styles.button1}
        textStyle={{ color: "white" }}
        appearance="ghost"
        status="basic"
        size="giant"
        onPress={() => {
          selectedCard = onPressDeleteCard(id);
        }}
      >
        Delete Card
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button: {
    alignSelf: "center",
    margin: 1
  },
  button1: {
    alignSelf: "center",
    margin: 1,
    backgroundColor: "red"
  }
});

export default withRouter(CardDetail);
