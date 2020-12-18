import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Background, NavBar } from '../../components';
import { LoginStyle } from '../../styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Background transparent style={LoginStyle.container}>
        <NavBar title="Course" bgText={Theme.primaryColor} onBack={() => this.props.navigation.pop()} />
        <Text>SAADA</Text>
      </Background>
    )
  }
}

