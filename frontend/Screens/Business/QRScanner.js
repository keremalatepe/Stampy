import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import useCustomAxios from "../../Hooks/useCustomAxios";

export default function QRScan({ history }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [{ data: res, loading, error }, execute] = useCustomAxios(
    {
      url: "/validate-qr",
      method: "POST"
    },
    { manual: true }
  );
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      setScanned(true);
      const { data: res } = await execute({ data: { qr_code: data } });
      console.warn(res);
      alert(res.message);
    } catch (err) {
      alert("Error");
      console.warn(err);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button
          title={"Tap to go Homepage"}
          onPress={() => history.push("/business/home")}
        />
      )}
    </>
  );
}
