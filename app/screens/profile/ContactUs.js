import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
  Text,
  View,
} from 'react-native';
import Images from '../../assets/images';
import { Theme } from '../../styles';

const { width, height } = Dimensions.get('window');

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
    marginLeft: 16,
    marginBottom: 16,
    fontFamily: Theme.fontRegular
  }
});

export default class ContactUs extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Theme.bgPrimaryColor }}>
          <NavBar title="Contact Us" bgText={Theme.primaryColor} onBack={() => this.props.navigation.pop()} />
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
              <Text size="xmini" family="regular">
                Whatsapp Number
                </Text>
              <Text
                style={styles.text}
                onPress={() =>
                  Linking.openURL('https://wa.me/087778988998').catch((err) =>
                    console.error('An error occurred', err),
                  )
                }>
                Chat Now
                </Text>
            </View>
            <Text style={styles.text}>
              0877-7898-8998
              </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}
