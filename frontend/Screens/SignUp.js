import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  Image
} from "react-native";
import {
  Text,
  Button,
  Icon,
  Datepicker,
  Radio,
  RadioGroup,
  Select,
  Input,
  Layout
} from "@ui-kitten/components";
import Constants from "expo-constants";
import useAxios from "axios-hooks";

const CalendarIcon = style => <Icon {...style} name="calendar" />;

const data = [
  { text: "Female", value: "F" },
  { text: "Male", value: "M" },
  { text: "Non-binary", value: "N" }
];

const SignUpPage = ({ history }) => {
  const [{ loading, error }, execute] = useAxios(
    {
      url: "http://167.71.11.118:8000/api/register",
      method: "POST"
    },
    { manual: true }
  );

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const onPressLogin = useCallback(() => {
    history.push("/login");
  }, []);

  const onPressMain = useCallback(async () => {
    try {
      const { data } = await execute({
        data: {
          email,
          phone,
          name: firstname,
          surname: lastname,
          date,
          gender: selectedOption.value,
          password,
          password2
        }
      });

      await AsyncStorage.setItem("token", data.data.token);

      history.push("/home");
    } catch (error) {
      console.warn(error);
    }
  }, [
    email,
    phone,
    firstname,
    lastname,
    date,
    selectedOption,
    password,
    password2
  ]);

  return (
    <Layout style={styles.container}>
      <View>
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
        <Input
          style={styles.input}
          size={"medium"}
          value={firstname}
          onChangeText={setFirstname}
          placeholder="Name"
        />
        <Input
          style={styles.input}
          size={"medium"}
          value={lastname}
          onChangeText={setLastname}
          placeholder="Surname"
        />
        <Input
          style={styles.input}
          size={"medium"}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail Address"
        />
        <Input
          style={styles.input}
          size={"medium"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        <Input
          style={styles.input}
          size={"medium"}
          secureTextEntry={true}
          value={password2}
          onChangeText={setPassword2}
          placeholder="Repeat Password"
        />
        <Input
          style={styles.input}
          size={"medium"}
          value={date}
          onChangeText={setDate}
          placeholder="Birth Date"
        />
        <Select
          style={styles.input1}
          data={data}
          placeholder="Gender"
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />
        <Input
          style={styles.input}
          size={"large"}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
        />
        <Button
          style={styles.buttons}
          status="success"
          size="medium"
          onPress={onPressMain}
        >
          {" "}
          Sign Up{" "}
        </Button>
        <Text style={{ alignSelf: "center" }}>Already have an account?</Text>
        <Button
          appearance="ghost"
          status="success"
          size="medium"
          onPress={onPressLogin}
        >
          {" "}
          Login{" "}
        </Button>
      </View>
    </Layout>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3"
  },
  input: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginHorizontal: "10%",
    marginVertical: "1%"
  },
  input1: { marginHorizontal: "10%", marginVertical: "1%" },
  input2: { marginHorizontal: "10%" },
  buttons: {
    alignSelf: "center",
    marginHorizontal: "10%",
    marginTop: "5%",
    textAlign: "center",
    backgroundColor: "#3a3535",
    margin: 5,
    borderWidth: 0,
    width: "100%",
    justifyContent: "flex-start",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.8
  }
};

export default SignUpPage;
