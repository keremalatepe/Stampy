import React from "react";
import { View, Dimensions } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { withRouter } from "react-router-native";
import { Text } from "@ui-kitten/components";
class PieGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: "",
        value: 0
      },
      labelWidth: 0
    };
  }
  render() {
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = ["13-18", "18-24", "24-35", "35-45", "45+"];
    const values = this.props.data || [];
    const colors = ["#ff0000", "#0000ff", "#ffa500", "#aa0555", "#aaa500"];
    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: { fill: colors[index] },
        arc: {
          outerRadius: 70 + values[index] + "%",
          padAngle: label === key ? 0.1 : 0
        },
        onPress: () =>
          this.setState({ selectedSlice: { label: key, value: values[index] } })
      };
    });
    const deviceWidth = Dimensions.get("window").width;

    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <PieChart
          style={{ height: 400 }}
          outerRadius={"80%"}
          innerRadius={"45%"}
          data={data}
        />
        <Text
          onLayout={({
            nativeEvent: {
              layout: { width }
            }
          }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            position: "absolute",
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: "center"
          }}
        >
          {`${label} \n `}
          {`${value}`}
        </Text>
      </View>
    );
  }
}

export default withRouter(PieGraph);
