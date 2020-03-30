import React, { Component } from "react";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { View } from "react-native";
import { withRouter } from "react-router-native";
class LineGraph extends React.Component {
  render() {
    const data = this.props.data || [];
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const axesSvg = { fontSize: 10, fill: "grey" };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;
    return (
      <View style={{ height: 400, padding: 20, flexDirection: "row" }}>
        <YAxis
          data={data}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            contentInset={verticalContentInset}
            svg={{ stroke: "rgb(134, 65, 244)" }}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={data}
            formatLabel={(value, index) => month[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}

export default withRouter(LineGraph);
