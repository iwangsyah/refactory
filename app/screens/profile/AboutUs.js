import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CommonStyle, Theme } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
});

function AboutUs(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1 }}>
      <View style={CommonStyle.container}>
        <NavBar
          title="About Us"
          bgText={Theme.primaryColor}
          onBack={() => navigation.pop()}
        />
        <View style={styles.container}>
          <Text style={[CommonStyle.textDescription, { textAlign: 'justify' }]}>
            Refactory adalah perusahaan edukasi dan teknologi yang menyediakan layanan lengkap berupa course maupun custom training yang materinya dapat disesuaikan dengan kebutuhan teknologi dan bisnis perusahaan Anda.
            </Text>
        </View>
      </View>
    </View>
  );
}

export default AboutUs;
