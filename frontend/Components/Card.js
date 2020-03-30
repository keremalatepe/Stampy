import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { withRouter } from "react-router";
import { Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
import { Svg, G, Path, Text } from "react-native-svg";

const Card = props => {
  return props.mode == "main" || !props.mode ? (
    <MainCard {...props}></MainCard>
  ) : (
    <DetailCard {...props}></DetailCard>
  );
};

const MainCard = ({ image, cardId, stamp, business, mode, history }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        cardId == "999"
          ? {}
          : history.push(`/card/${cardId}/${stamp}/${business}`);
      }}
    >
      <SVGCard
        style={{
          shadowOffset: { width: 0.8, height: 0.8 },
          shadowColor: "grey",
          shadowOpacity: 0.5,
          flex: 1
        }}
        stamp={stamp}
        title={business}
      ></SVGCard>
    </TouchableOpacity>
  );
};

const DetailCard = ({ image, cardId, mode, history, stamp, business }) => (
  <View style={styles.card}>
    <SVGCard stamp={stamp} title={business}></SVGCard>
  </View>
);

const SVGCard = ({ style, stamp, title }) => {
  const circles = [
    { x: 144, y: 96 },
    { x: 280, y: 96 },
    { x: 416, y: 96 },
    { x: 416, y: 232 },
    { x: 280, y: 232 },
    { x: 144, y: 232 },
    { x: 144, y: 368 },
    { x: 280, y: 368 },
    { x: 416, y: 368 }
  ];
  return (
    <View style={style}>
      <Svg
        height="100%"
        viewBox="0 0 464 464"
        width="100%"
        xmlns="http://www.w3.org/2000/S"
      >
        <Path
          d="m464 0v432c0 17.679688-14.320312 32-32 32h-432v-464zm0 0"
          fill="#e9e9f1"
        />
        <G fill="#425e82">
          <Path d="m136 88h56v16h-56zm0 0" />
          <Path d="m273.039062 88h51.351563v16h-51.351563zm0 0" />
          <Path d="m360 136h16v56h-16zm0 0" />
          <Path d="m273.039062 224h51.351563v16h-51.351563zm0 0" />
          <Path d="m136 224h56v16h-56zm0 0" />
          <Path d="m88 272h16v56h-16zm0 0" />
          <Path d="m136 360h56v16h-56zm0 0" />
          <Path d="m273.039062 360h62.960938v16h-62.960938zm0 0" />
        </G>

        {circles.map((circle, index) => (
          <Circle key={index} x={circle.x} y={circle.y} fill={index < stamp} />
        ))}

        <Text
          x="10%"
          y="75%"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="gray"
          fontSize="36"
        >
          {title}
        </Text>
      </Svg>
    </View>
  );
};

const Star = ({ x, y, fill }) => {
  const filled = "#ef6461";
  const empty = "#afc2db";
  return (
    <Path
      d={`m${x} ${y}-28 26.636719 6.640625 37.601562-34.640625-17.761719-34.640625 17.761719 6.640625-37.601562-10.960938-10.398438-17.039062-16.238281 38.71875-5.523438 17.28125-34.238281 17.28125 34.238281zm0 0`}
      fill={fill ? filled : empty}
    />
  );
};

const Circle = ({ x, y, fill }) => {
  const filled = "#627da2";
  const empty = "#afc2db";
  const check = "#ffba4f";

  return (
    <>
      <Path
        d={`m${x} ${y}c0 26.507812-21.492188 48-48 48s-48-21.492188-48-48 21.492188-48 48-48 48 21.492188 48 48zm0 0`}
        fill={fill ? filled : empty}
      />
      {fill && (
        <Path
          d={`m${x - 56} ${y +
            27}-21.65625-21.65625 11.3125-11.3125 10.34375 10.34375 26.34375-26.34375 11.3125 11.3125zm0 0`}
          fill={check}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowColor: "grey",
    shadowOpacity: 0.6,

    height: screenWidth * 0.5 * 1.5,
    width: screenWidth * 0.5,
    margin: screenWidth * 0.035
  },
  detail: {
    height: "90%",
    flex: 1,
    marginHorizontal: "20%"
  }
});

export default withRouter(Card);
