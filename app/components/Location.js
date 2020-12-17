import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Theme from '../styles/Theme';

const styles = StyleSheet.create({
  location: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: Theme.txtSecondaryColor,
  },
  text: {
    color: Theme.txtSecondaryColor,
    marginBottom: 5
  }
})

export default (Location = ({
  data
}) => (
  <View style={{ marginTop: 50 }}>
    <Text style={styles.location}>Posisi saat ini:</Text>
    <View style={{ marginLeft: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.text, { flex: 2 }]}>Latitude:</Text>
        <Text style={[styles.text, { flex: 6 }]}>{data.latitude}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.text, { flex: 2 }]}>Longitude:</Text>
        <Text style={[styles.text, { flex: 6 }]}>{data.longitude}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.text, { flex: 2 }]}>Address:</Text>
        <Text style={[styles.text, { flex: 6 }]}>{data.address}</Text>
      </View>
    </View>
  </View>
));