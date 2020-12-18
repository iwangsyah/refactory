import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Images from '../../assets/images';
import { Theme } from '../../styles';
import StatusBarStyle from '../../styles/StatusBar';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
});

export default class AboutUs extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Theme.bgPrimaryColor }}>
          <NavBar title="About Us" bgText={Theme.primaryColor} onBack={() => this.props.navigation.pop()} />
          <View style={styles.container}>
            <Text>Refactory adalah perusahaan edukasi dan teknologi yang menyediakan layanan lengkap berupa course maupun custom training yang materinya dapat disesuaikan dengan kebutuhan teknologi dan bisnis perusahaan Anda.</Text>
          </View>
        </View>
      </View>
    );
  }
}
