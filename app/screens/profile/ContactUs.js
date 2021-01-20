import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Image,
  Text,
  View,
} from 'react-native';
import Images from '../../assets/images';
import { CommonStyle, Theme } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily: Theme.fontMedium
  },
  text: {
    lineHeight: 25,
    marginLeft: 16,
    marginBottom: 16,
    fontFamily: Theme.fontRegular,
  },
  whatsapp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});


function ContactUs(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1 }}>
      <View style={CommonStyle.container}>
        <NavBar
          title="Contact Us"
          bgText={Theme.primaryColor}
          onBack={() => navigation.pop()}
        />
        <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
          <Text style={styles.title}>
            Company Address
              </Text>
          <Text style={styles.text}>
            {
              'Jln. Palagan Tentara Pelajar Km. 9,8\nNgaglik, Kab. Sleman\nDI Yogyakarta 55581'
            }
          </Text>
          <Text style={styles.title}>
            Contact
              </Text>
          <Text style={styles.text}>
            {`marketing@refactory.id\n+62 8122 8203 381`}
          </Text>
          <Text style={styles.title}>
            Phone Number
              </Text>
          <Text style={styles.text}>
            {`Dewita: 0857 2582 7222\nSeptin: 0878 2080 0206`}
          </Text>
          <View style={styles.whatsapp}>
            <View>
              <Text style={styles.title}>Whatsapp Number</Text>
              <Text style={styles.text}>0877-7898-8998</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://wa.me/081228203381').catch((err) =>
                  console.error('An error occurred', err),
                )
              }
              style={{ alignItems: 'center' }}
            >
              <Image source={Images.icWhatsapp} style={{ width: 50, height: 50 }} />
              <Text style={{ fontFamily: Theme.fontMedium, color: Theme.primaryColor }}>
                Chat Now
                </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ContactUs;
