import React from "react";
import { StyleSheet } from "react-native";
import {
  Icon,
  Layout,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
import { withRouter, matchPath } from "react-router";

const BackIcon = style => <Icon {...style} fill={"white"} name="arrow-back" />;

const MenuIcon = style => <Icon {...style} name="more-vertical" />;

const InfoIcon = style => <Icon {...style} name="info" />;

const LogoutIcon = style => <Icon {...style} name="log-out" />;

class TopNavigationWithMenuShowcase extends React.Component {
  state = {
    menuVisible: false
  };

  menuData = [
    { title: "About", icon: InfoIcon },
    { title: "Logout", icon: LogoutIcon }
  ];

  onMenuActionPress = () => {
    const menuVisible = !this.state.menuVisible;
    this.setState({ menuVisible });
  };

  onMenuItemSelect = index => {
    // Handle Item Select

    this.setState({ menuVisible: false });
  };

  renderBackAction = () =>
    this.props.history.location.pathname !== "/home" && (
      <TopNavigationAction
        icon={BackIcon}
        onPress={() => this.props.history.push("/home")}
      />
    );

  render() {
    const path = Object.keys(this.props.titles)
      .map(item =>
        matchPath(this.props.history.location.pathname, {
          path: item,
          exact: true,
          strict: true
        })
      )
      .filter(item => item !== null)[0];
    if (this.props.noheader.includes((path || {}).path)) {
      return null;
    }
    return path ? (
      <Layout style={{ ...styles.container, ...(this.props.style || {}) }}>
        <TopNavigation
          style={styles.navigation}
          title={this.props.titles[(path || {}).path]}
          titleStyle={styles.header}
          leftControl={this.renderBackAction()}
        />
      </Layout>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff7315",
    alignItems: "center",
    justifyContent: "center"
  },
  navigation: {
    backgroundColor: "#ff7315"
  },
  header: {
    color: "white"
  }
});

export default withRouter(TopNavigationWithMenuShowcase);
