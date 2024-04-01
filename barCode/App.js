import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View, Button, Linking, Alert } from 'react-native';

export default function App() {

  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  if (hasPermission === null) {
    return <Text>Solicitamnos a permissão para usar a câmera</Text>
  }

  if (hasPermission === false) {
    return <Text>Sem acesso a câmera! O app não irá funcionar!</Text>
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setData(data)
    Alert.alert('Código escaneado', `O código de barras é do tipo ${type} e ${data} é o dado que foi escaneado!`, [
      {
        text: 'Ok',
        onPress: () => console.log("Button pressed")
      }
    ])
  }

  const handleOpenLink = () => {
    Linking.openURL(data);
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name='qrcode-scan'
        size={100}
        color="orange"
      />
      <Text style={styles.title}>Leitor de QR Code</Text>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && <Button title={'Toque para digitar novamente.'} onPress={() => setScanned(false)} />}
      {scanned && <Button title={'Abrir link' + data} onPress={() => handleOpenLink()} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    width: '90%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'darkorange',
  },
  button: {
    marginTop: 15,
  },
});
