import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonStyle, Theme } from '../styles';
import { Browser } from '../util';

const styles = StyleSheet.create({
  seeOn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sosmed: {
    width: 40,
    height: 40,
    backgroundColor: Theme.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 16
  }
})

export default (Connects = ({
  data
}) => (
  <View style={CommonStyle.content}>
    <Text style={CommonStyle.textTitle}>CONNECT</Text>
    <View style={styles.seeOn}>
      {data.map((item) => (
        <TouchableOpacity style={styles.sosmed}
          onPress={() => Browser.open(item.url)}>
          <Icon
            size={20}
            name={item.name}
            color={Theme.bgPrimaryColor}
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>
));