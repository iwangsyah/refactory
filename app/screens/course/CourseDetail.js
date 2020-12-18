import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList, Image, Text, View } from 'react-native';
import { Background, NavBar, Button } from '../../components';
import { ApiService } from '../../services';
import { LoginStyle, Theme } from '../../styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginTop: 16,
    backgroundColor: Theme.bgPrimaryColor,
    padding: 16
  },
  text: {
    color: Theme.txtPrimaryColor,
    marginBottom: 16,
    textAlign: 'center',
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

export default class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount = () => {
    ApiService.getDetailCourse()
      .then(response => {
        const { data } = response
        this.setState({ data })
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  _renderItem = ({ item }) => (
    <View style={[styles.box, styles.shadow]}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: Theme.fontBold, backgroundColor: '#D5D5D5', padding: 16 }}>{item.section}</Text>
        {item.data.map((data) => (
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: Theme.lineColor, padding: 16, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>{`${data.title} (${data['time-in']})`}</Text>
            <View style={{ backgroundColor: Theme.buttonColor, color: Theme.txtSecondaryColor, borderRadius: 5, padding: 5 }}>
              <Text style={{ fontSize: 12, fontFamily: Theme.fontBold, color: Theme.txtSecondaryColor }}>START</Text></View>
          </View>
        ))}
      </View>
    </View>
  )

  render() {
    const { data } = this.state;
    const { photo_url } = this.props.navigation.state.params;

    return (
      <Background transparent style={LoginStyle.container}>
        <NavBar title="Course Detail" bgText={Theme.primaryColor} onBack={() => this.props.navigation.pop()} />
        <ScrollView>
          <Image source={{ uri: photo_url }} style={styles.imageHeader} />
          <View style={styles.container}>
            <View style={[styles.content, styles.shadow]}>
              <Text style={styles.title}>Tentang Course</Text>
              <Text style={styles.text}>{data['short-description']}</Text>
            </View>
            <View style={[styles.content, styles.shadow]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Materi Course</Text>
                <FlatList
                  data={data['materi course']}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}
                  renderItem={this._renderItem}
                />
              </View>
            </View>
            <View style={[styles.content, styles.shadow]}>
              <Image source={{ uri: data['quistion-photo'] }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{data.quistion}</Text>
                <Text style={styles.text}>{data.answer}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Background>
    )
  }
}
