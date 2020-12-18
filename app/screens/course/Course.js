import React from 'react';
import { StyleSheet, Dimensions, FlatList, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Background, NavBar } from '../../components';
import { Navigation } from '../../configs';
import { ApiService } from '../../services';
import { LoginStyle, Theme } from '../../styles';
import { NavigationService } from '../../util';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  image: {
    width: '35%',
    aspectRatio: 1.9 / 1,
    resizeMode: 'contain',
    marginRight: 10
  },
  title: {
    fontFamily: Theme.fontBold, marginBottom: 5
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.bgPrimaryColor,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16
  },
  shadow: {
    shadowColor: 'rgba(119, 117, 117, 0.8)',
    shadowOffset: {
      width: 0,
      height: 3.5
    },
    elevation: 3.5,
    shadowRadius: 4,
    shadowOpacity: 0.5
  },
})

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount = () => {
    ApiService.getListCourse()
      .then(response => {
        const { data } = response.data
        this.setState({ data })
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.box, styles.shadow, {
        display: item.id ? 'flex' : 'none'
      }]}
      onPress={() => NavigationService.navigate(Navigation.COURSEDETAIL, { photo_url: item.photo_url })}
    >
      <Image source={{ uri: item.photo_url }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.short_description}</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <Background transparent style={LoginStyle.container}>
        <NavBar title="Courses" bgText={Theme.primaryColor} />
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            renderItem={this._renderItem}
          />
        </View>
      </Background>
    )
  }
}

