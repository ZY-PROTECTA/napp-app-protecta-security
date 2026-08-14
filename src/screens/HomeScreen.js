import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  NativeModules, // usar NativeModules
  ScrollView,
} from 'react-native';

const { ZyprotectabioModule } = NativeModules;

export default function HomeScreen() {
  /* =========================
   * STATE
   * ========================= */
  const [codError, setCodError] = useState('');
  const [deError, setDeError] = useState('');
  const [codBioError, setCodBioError] = useState('');
  const [deBioError, setDeBioError] = useState('');
  const [coErrorButton, setCoErrorButton] = useState('');
  const [deErrorButton, setDeErrorButton] = useState('');
  const [idSolicitud, setIdSolicitud] = useState('');

  const [tiDocumento, setTiDocumento] = useState('');
  const [nuDocumento, setNuDocumento] = useState('');
  const [idFlujo, setIdFlujo] = useState(0);
  const [ambiente, setAmbiente] = useState('DEVX');
  const [token, setToken] = useState('');
  const [manualToken, setManualToken] = useState('');

  /* =========================
   * componentDidMount
   * ========================= */
  useEffect(() => {
    setTiDocumento('1');

    const timer = setTimeout(() => {
      setToken('TOKEN_INICIAL_SIMULADO');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
   * ACTION
   * ========================= */
  const onTestPress = async () => {
    if (!ZyprotectabioModule) {
      Alert.alert(
        'Error',
        '❌ ZyprotectabioModule no está registrado\n(Dev Build incorrecto)'
      );
      return;
    }

    try {
      /* =========================
       * RESOLVER TOKEN POR AMBIENTE
       * ========================= */
      let resolvedToken = token;

      switch (ambiente) {
        case 'DEV1':
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJKU0FFTloyQFpZVFJVU1QuQ09NIiwidXN1U3VjSWQiOjQ1NTEsInVzdUVtcHNJZCI6OTc4LCJ1c3VBcGxJZCI6MCwidXNlcl9uYW1lIjoiREVTQS1QVEEtU1EzLUFQSS1MTSIsInR1c3VJZCI6MSwidmVyc2lvbiI6IjIuMCIsInVzdUNvSW50ZXJubyI6IkRFU0EtUFRBLVNRMy1BUEktTE0iLCJhdXRob3JpdGllcyI6WyJ4MEY0TTI0eG9ZcXVYTkhlSFhMLzBCMDBDbnc9IiwiSmhQRXZuTmpGOGIwWDdtdjBNdjRVWWpVWGd3PSIsIlNLbWJCT2QvZWNoS3NZOGt4cGN4eXZJZG9YRT0iLCJlc2JYZVFPalJKOFlmZjVpMy9vclhKQkNMTUU9IiwicjZJRjV3UXNlZkFSRVVyajZEY0FYMCtUSWc4PSIsIjZJb0ZHQU9SSDNHcGUxYmlqdlB4MDY1bVlZUT0iLCJRNCtKUExnblJTRkVSZjJaN0cvdUdmYVlIcHc9Iiwick5ia3FvTDBSMlc4MysveDRaUUV4eUd1cXVBPSIsImFyclJjanorY3M1N3hNV1VLVndNN2lPayt5dz0iLCJ5NXQ5V0ZUaTcvUmFvK1lPTmI0YnJ4d0NhRWs9IiwiYlpoNUlGNXdHK0EzQ3Zxc1ZnT2VRN0FZd3U4PSJdLCJjbGllbnRfaWQiOiIyMDUxNzIwNzMzMSIsInVzdUlkIjo2MTc4LCJ1c3VQZXJJZCI6MCwic2NvcGUiOlsidHJ1c3QiLCJyZWFkIiwid3JpdGUiXSwidGlEb2NVc3VhcmlvIjo2LCJudURvY1VzdWFyaW8iOiIwMDAwMDAwMDAwIiwic3VjdURlc2NyaXBjaW9uIjoiUFJJTkNJUEFMIiwiZXhwIjoxOTI2NTE1NTYzLCJzdWN1Q29kaWdvIjoiMSIsImp0aSI6Ik1SZEVYcHdfMGVybWNjYlQ5SzE5MjBrOENwWSJ9.MPysi1AoZvGafN4cPTPiLIaCRFLKWJAFUrgYL7OQ5Pzv-_kUhxnqIsDlgnbgOPdTmrAko1YWLHpceqVDuwWOIFGWDN-Fkowo0NPupOXDbbQslppoY0Svgnflzx_02pfRV9Zbtfwx_D6cdTSWeeEjIMO4IoTvjsXobsD2OLwla3tw6d7pxUIRvvJdu07das2GO95cnQVrR5TAA_YW_mPgGWmSrqGB8schJp2kjgOocTb7dZh7oguNDGl3J4u9TsdYcjb9iZWlrmolV2lWqmoisWInVP24P27A1Sc0o431FFJbxH3zltxG1aT3Ftu58LxEUwC7ruA7cqgKUs8ZYsEo7w';
          break;
        case 'DEVX':
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJQUlVFQkEwMDJAWllUUlVTVC5DT00iLCJ1c3VTdWNJZCI6NDc1LCJ1c3VFbXBzSWQiOjY2LCJ1c3VBcGxJZCI6MSwidXNlcl9uYW1lIjoiREVWWC1QVEEtQ0wtQVBJLUxNIiwidHVzdUlkIjoxLCJ2ZXJzaW9uIjoiMi4wIiwidXN1Q29JbnRlcm5vIjoiREVWWC1QVEEtQ0wtQVBJLUxNIiwiYXV0aG9yaXRpZXMiOlsia2g4OU9kdW9PZHBINWNqVG9rb2JoQXQxVkVBPSIsIngwRjRNMjR4b1lxdVhOSGVIWEwvMEIwMENudz0iLCJRNCtKUExnblJTRkVSZjJaN0cvdUdmYVlIcHc9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsInJOYmtxb0wwUjJXODMrL3g0WlFFeHlHdXF1QT0iLCJhcnJSY2p6K2NzNTd4TVdVS1Z3TTdpT2sreXc9IiwiU0ttYkJPZC9lY2hLc1k4a3hwY3h5dklkb1hFPSIsIkpoUEV2bk5qRjhiMFg3bXYwTXY0VVlqVVhndz0iLCJlc2JYZVFPalJKOFlmZjVpMy9vclhKQkNMTUU9IiwicjZJRjV3UXNlZkFSRVVyajZEY0FYMCtUSWc4PSIsInk1dDlXRlRpNy9SYW8rWU9OYjRicnh3Q2FFaz0iLCJiWmg1SUY1d0crQTNDdnFzVmdPZVE3QVl3dTg9IiwiMm9TZ3JmdU9wbTB3QXpqNzhXbHA5eWoyQUJvPSJdLCJjbGllbnRfaWQiOiIyMDUxNzIwNzMzMSIsInVzdUlkIjo1OTg0LCJ1c3VQZXJJZCI6MTcxMzksInNjb3BlIjpbInJlYWQiLCJ3cml0ZSIsInRydXN0Il0sInRpRG9jVXN1YXJpbyI6MSwibnVEb2NVc3VhcmlvIjoiODQ1NjExNTYiLCJzdWN1RGVzY3JpcGNpb24iOiJBUExJQ0FUSVZPIiwiZXhwIjoxOTM0NTcwNDA2LCJzdWN1Q29kaWdvIjoiMSIsImp0aSI6Ijl4d3llWkJQWVFPVkt5QlNsMjFMRFRqbDBIOCJ9.p-gVgknA9MMYeYAvsL4qoSzebdlfSZOmubnKBkrTYMtGxqRrmBzcfeIWAJJBPus0AxEgL4BWpJJjGNtCA1u8XFHOvIsw3qH2-AnIKIStIEM1hF75NewErRWnhd9dK8o1Qo10XKs-7MseA4isUfYvBz4oywHt0T15S_EJy3vS4c0HQVf2dtvpfp1LthR-UBs1ykw5iNWdhSsSsqf3g9L8gJNwcaIax64wsdToJzBk0W-AjIY-NueJo_lSNvXMMLzxigoUfnkM6cZieFiCISpIjuJfqzU6GLz4ITQG2B9y8Ut8vBXsFifQT9XKYvioup2bmjSNDSgidA4bxClc64AVEQ';
          break;
        case 'SIGN':
          resolvedToken = '';
          break;
        case 'POC':
        default:
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJTQURTQURTQURAWllUUlVTVC5DT00iLCJ1c3VTdWNJZCI6MjAyLCJ1c3VFbXBzSWQiOjc4LCJ1c3VBcGxJZCI6MSwidXNlcl9uYW1lIjoiUE9DLVBUQS1TUTMtQVBJLUxNIiwidHVzdUlkIjoxLCJ2ZXJzaW9uIjoiMi4wIiwidXN1Q29JbnRlcm5vIjoiUE9DLVBUQS1TUTMtQVBJLUxNIiwiYXV0aG9yaXRpZXMiOlsia2g4OU9kdW9PZHBINWNqVG9rb2JoQXQxVkVBPSIsIngwRjRNMjR4b1lxdVhOSGVIWEwvMEIwMENudz0iLCJRNCtKUExnblJTRkVSZjJaN0cvdUdmYVlIcHc9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsInJOYmtxb0wwUjJXODMrL3g0WlFFeHlHdXF1QT0iLCJhcnJSY2p6K2NzNTd4TVdVS1Z3TTdpT2sreXc9IiwiSmhQRXZuTmpGOGIwWDdtdjBNdjRVWWpVWGd3PSIsIlNLbWJCT2QvZWNoS3NZOGt4cGN4eXZJZG9YRT0iLCJlc2JYZVFPalJKOFlmZjVpMy9vclhKQkNMTUU9IiwicjZJRjV3UXNlZkFSRVVyajZEY0FYMCtUSWc4PSIsInk1dDlXRlRpNy9SYW8rWU9OYjRicnh3Q2FFaz0iLCJiWmg1SUY1d0crQTNDdnFzVmdPZVE3QVl3dTg9IiwiMm9TZ3JmdU9wbTB3QXpqNzhXbHA5eWoyQUJvPSJdLCJjbGllbnRfaWQiOiIyMDUxNzIwNzMzMSIsInVzdUlkIjoyMDQyLCJ1c3VQZXJJZCI6NzYzMSwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwidGlEb2NVc3VhcmlvIjoxLCJudURvY1VzdWFyaW8iOiI2NjE1NjE1MSIsInN1Y3VEZXNjcmlwY2lvbiI6IkFQTElDQVRJVk8iLCJleHAiOjE5MzUxODcyNTIsInN1Y3VDb2RpZ28iOiIxIiwianRpIjoiVEZ1VzBfUmQ5SldaQnFRbU1LeEw2YThmZFNjIn0.jJ7jXZrXf4motptGNMEde5UN16L8ffZeeSeRhziDQWOFmQrV_s8RKYh0r1p3oXjud4O3RZtbA7cE6snhQcSve3_1mQPyhwhWqNnz9YISNiLbcgXBjA-vUhGGvBHj6uZU8HsNol1bTGvBI4h6SZTKdxvriogi5HdmA3o5D_O-n_IauKQ48VLDppQl9DKEqrPO09C_ynN7Rm8kTfv7Y7SyFRFYQ-U28a6CF10v8Xz6HiXCZ3O8q7zEqPW38iiI3fZHfQjOMCiiQpZjnfTe7cXBptR9daTQKpLgweq_lSVOAqQFPr4GpYPw16V4FgkxQwcCN5JpMk8xmQDp-lO-svYBGA';
          break;
      }

      if (manualToken) {
        resolvedToken = manualToken;
      }

      setToken(resolvedToken);

      /* =========================
       * OPCIONES
       * ========================= */
      const opciones = {
        tiDocumento,// tipo Documento : DNI
        nuDocumento,// Número de documento
        accessToken: resolvedToken, // Access token generado por ambiente
        bioPais: 'PE', //Pais de verificacion (siempre PE)
        idFlujo: idFlujo, //Operacion
        urlSource: ambiente // Ambiente a la conexion DEV1 , POC , DEVX , SIGN (PRODUCCION)
      };

      const result =
        await ZyprotectabioModule.onZyBioCapture(opciones);

      /* =========================
       * RESULTADOS
       * ========================= */
      setCodError(result?.codError ?? ''); //Codigo de resultado de WS de zytrust
      setDeError(result?.deError ?? ''); //Descripcion de resultado de WS de zytrust
      setCodBioError(result?.codBioError ?? ''); //Codigo de resultado Biometrico de WS de zytrust
      setDeBioError(result?.deBioError ?? ''); //Descripcion de resultado Biometrico de WS de zytrust
      setCoErrorButton(result?.coErrorButton ?? ''); //Codigo de Salida especial con selección de boton, ejemplo 9104
      setDeErrorButton(result?.deErrorButton ?? ''); //Descripcion de codigo de Salida especial con selección de boton, ejemplo 9104: El usuario canceló la operación
      setIdSolicitud(result?.idSolicitud ?? ''); //Id de la Solicitud

    } catch (e) {
      Alert.alert(
        'Error',
        `❌ Error validacionFacialOcr:\n${e?.message ?? String(e)}`
      );
    }
  };

  /* =========================
   * UI
   * ========================= */
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://devx.zytrust.com/BancaElectronicaPU/assets/img/icons/ZT_COLOR.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>{'SDK 1.1.16'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese número de documento"
        value={nuDocumento}
        onChangeText={setNuDocumento}
        keyboardType="numeric"
        maxLength={8}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese ID del flujo"
        value={idFlujo}
        onChangeText={setIdFlujo}
        keyboardType="numeric"
        maxLength={8}
      />

      <TextInput
        style={styles.input}
        placeholder="Ambiente (DEFAULT POC) (DEV1, POC, DEVX, SIGN)"
        value={ambiente}
        onChangeText={(text) => setAmbiente(text.toUpperCase())}
        autoCapitalize="characters"
        maxLength={4}
      />

      <TextInput
        style={styles.input}
        placeholder="Token manual (opcional)"
        value={manualToken}
        onChangeText={setManualToken}
      />

      <TouchableOpacity style={styles.button} onPress={onTestPress}>
        <Text style={styles.buttonText}>Autenticar</Text>
      </TouchableOpacity>

      {/* RESULTADOS */}
      <Text>{'codError: ' + codError}</Text>
      <Text>{'deError: ' + deError}</Text>
      <Text>{'codBioError: ' + codBioError}</Text>
      <Text>{'deBioError: ' + deBioError}</Text>
      <Text>{'coErrorButton: ' + coErrorButton}</Text>
      <Text>{'deErrorButton: ' + deErrorButton}</Text>
      <Text>{'idSolicitud: ' + idSolicitud}</Text>

      <Text style={styles.footer}>
        ZyTrust SA - Copyright 2026
      </Text>
    </ScrollView>
  );
}

/* =========================
 * STYLES
 * ========================= */
const styles = StyleSheet.create({
  title: {
    marginBottom: 24
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 30,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
});
