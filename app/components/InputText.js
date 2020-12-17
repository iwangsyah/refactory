import React from 'react';
import { Platform, View, StyleSheet, TextInput, Text, Image } from 'react-native';
import Theme from '../styles/Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  textinput: {
    flex: 5,
    color: Theme.txtPrimaryColor,
    fontFamily: Theme.fontMedium,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    minHeight: 40,
    maxHeight: 80,
  },
  text: {
    flex: 2,
    marginRight: 5,
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: Theme.fontMedium,
    color: Theme.txtSecondaryColor
  },
});

export default class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  render() {
    const {
      style,
      value,
      title,
      onChange,
      keyboardType,
      secureTextEntry,
    } = this.props;
    let { editable } = this.props;

    const border = {
      borderWidth: this.state.isFocused ? 1 : 0,
      backgroundColor:
        editable === false ? Theme.lineColor : 'rgba(255,255,255,1)'
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <TextInput
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          style={[styles.textinput, border, style]}
          onChangeText={(text) => onChange(text)}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType="done"
          editable={editable}
          value={value}
        />
        {/* </View> */}
      </View>
    );
  }
}
