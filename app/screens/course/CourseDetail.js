import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { Background, NavBar } from '../../components';
import { CommonStyle, LoginStyle, Theme } from '../../styles';
import { ApiService } from '../../services';
import { Browser } from '../../util';


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: Theme.fontMedium,
    color: Theme.txtPrimaryColor,
  },
  imageHeader: {
    width,
    aspectRatio: 1.8 / 1,
  },
  image: {
    width: '50%',
    aspectRatio: 1.5 / 1,
    backgroundColor: Theme.bgPrimaryColor,
    alignSelf: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    color: Theme.txtPrimaryColor,
    fontFamily: Theme.fontBold,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 16
  },
  box: {
    flex: 1,
    backgroundColor: Theme.bgPrimaryColor,
    marginVertical: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: Theme.buttonColor,
    color: Theme.txtSecondaryColor,
    borderRadius: 5,
    padding: 5
  },
  txtButton: {
    fontSize: 12,
    fontFamily: Theme.fontBold,
    color: Theme.txtSecondaryColor
  },
  section: {
    fontFamily: Theme.fontBold,
    backgroundColor: '#D5D5D5',
    padding: 16
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: Theme.lineColor,
  }
})

export default class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      indicator: true
    }
  }

  componentDidMount = () => {
    ApiService.getDetailCourse()
      .then(response => {
        const { data } = response
        this.setState({ data, indicator: false })
      })
      .catch(error => {
        console.log(error);
        this.setState({ indicator: false })
      });
  }

  _renderMateri = () => (
    <View style={[CommonStyle.content, CommonStyle.shadow]}>
      <View style={{ flex: 1 }}>
        <Text style={CommonStyle.textTitle}>Materi Course</Text>
        <FlatList
          data={this.state.data['materi course']}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={CommonStyle.flatList}
          renderItem={this._renderItem}
        />
      </View>
    </View>
  )

  _renderItem = ({ item }) => (
    <View style={[styles.box, CommonStyle.shadow]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.section}>{item.section}</Text>
        {item.data.map((data) => (
          <View style={styles.item}>
            <Text style={styles.text}>{`${data.title} (${data['time-in']})`}</Text>
            <TouchableOpacity style={styles.button} onPress={() => Browser.open(data.url)}>
              <Text style={styles.txtButton}>START</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )

  render() {
    const { data, indicator } = this.state;
    const { photo_url } = this.props.navigation.state.params;

    return (
      <Background transparent style={LoginStyle.container}>
        <NavBar
          title="Course Detail"
          bgText={Theme.primaryColor}
          onBack={() => this.props.navigation.pop()}
        />
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={{
            marginTop: 50,
            display: indicator ? 'flex' : 'none',
          }}
        />
        {!indicator && <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: photo_url }} style={styles.imageHeader} />
          <View style={styles.container}>
            <View style={[CommonStyle.content, CommonStyle.shadow]}>
              <Text style={CommonStyle.textTitle}>Tentang Course</Text>
              <Text style={CommonStyle.textDescription}>{data['short-description']}</Text>
            </View>
            {this._renderMateri()}
            <View style={[CommonStyle.content, CommonStyle.shadow]}>
              <Image source={{ uri: data['quistion-photo'] }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={CommonStyle.textTitle}>{data.quistion}</Text>
                <Text style={CommonStyle.textDescription}>{data.answer}</Text>
              </View>
            </View>
          </View>
        </ScrollView>}
      </Background>
    )
  }
}
