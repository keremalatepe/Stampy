import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Text, Menu, Button, Icon, Modal, Layout } from "@ui-kitten/components";
import MainMenu from "../Components/MainMenu";
import AddCardList from "../Components/AddCardList";
import Card from "../Components/Card";
import useCustomAxios from "../Hooks/useCustomAxios";
import { StatusBar } from "react-native";
const AddCardIcon = style => <Icon {...style} name="plus-circle-outline" />;

const AddCardModal = ({ hide }) => {
  const [cards, setCards] = useState([]);
  const [{ loading, error }, execute] = useCustomAxios(
    {
      url: "/business-list",
      method: "GET"
    },
    { manual: true }
  );
  const [{ addCardLoading, addCardError }, addCard] = useCustomAxios(
    {
      url: "/card-add",
      method: "POST"
    },
    { manual: true }
  );
  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await execute();
        setCards(data.data.businesses.filter(business => !business.is_owned));
      } catch (e) {
        console.warn(e);
      }
    };
    func();
  }, [setCards, execute]);

  const onPressAddCard = useCallback(
    async selectedCards => {
      for (let i = 0; i < selectedCards.length; i++) {
        const response = await addCard({
          data: { business_id: selectedCards[i].business_id }
        });
      }
      hide();
    },
    [hide, addCard]
  );

  const toggleItemStatus = useCallback(
    index => {
      new_cards = [...cards];
      new_cards[index] = { ...cards[index], status: !cards[index].status };
      setCards(new_cards);
    },
    [cards, setCards]
  );

  return (
    <>
      <Layout level="3" style={styles.modalContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <AddCardList data={cards} onPress={toggleItemStatus} />
        )}
      </Layout>
      <Button
        style={{
          backgroundColor: "#ff896b",
          borderWidth: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }}
        status="info"
        size="large"
        onPress={() => {
          const selectedCards = cards.filter(card => card.status);
          onPressAddCard(selectedCards);
        }}
      >
        Add
      </Button>
    </>
  );
};

const HomePage = ({ history }) => {
  const addCard = useCallback(() => {
    setVisible(true);
  });
  const [visible, setVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [{ loading, error }, execute] = useCustomAxios(
    {
      url: "/card-list",
      method: "GET"
    },
    { manual: true }
  );
  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await execute();
        setCards(data.data.cards);
      } catch (e) {
        console.warn(e);
      }
    };
    func();
  }, [setCards, execute]);
  return (
    <>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.header}> stampy!</Text>
        </View>
        <View style={styles.cardContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.innerContainer}>
                {cards.map(card => (
                  <Card
                    key={card.card_id}
                    image={require("../assets/card.jpg")}
                    cardId={card.business_id}
                    stamp={card.stamp_number}
                    business={card.business_name}
                  ></Card>
                ))}
              </View>

              <Button
                appearance="ghost"
                status="basic"
                size="giant"
                icon={AddCardIcon}
                onPress={addCard}
              />
            </ScrollView>
          )}
        </View>
        <View style={styles.menu}>
          <MainMenu />
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

      <Modal
        allowBackdrop={true}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
        visible={visible}
        style={{ width: "90%" }}
      >
        <AddCardModal
          hide={async () => {
            setVisible(false);
            const { data } = await execute();
            setCards(data.data.cards);
          }}
        />
      </Modal>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f3f3f3"
  },

  container: {
    width: "100%",
    flex: 1.2,
    backgroundColor: "#ff7315",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowColor: "grey",
    shadowOpacity: 0.6
  },
  header: {
    fontFamily: "bhavuka",
    marginTop: 15,
    lineHeight: 70,
    fontWeight: "100",
    fontSize: 70,
    color: "#f3f3f3"
  },
  cardContainer: {
    backgroundColor: "#f3f3f3",
    margin: 30,
    flex: 4
  },
  innerContainer: {
    backgroundColor: "#f3f3f3",
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "black",
    fontSize: 24
  },
  menu: {
    backgroundColor: "#f3f3f3",

    flex: 2
  },
  modalContainer: {
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    padding: 16
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  signOutButton: {
    color: "#232020",
    marginBottom: 10
  }
});
