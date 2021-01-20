import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';
import { ApiService } from '../../services';
import { NavBar, Background, Materi } from '../../components';
import { CommonStyle, LoginStyle, Theme } from '../../styles';


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
})

function CourseDetail(props) {
  const { navigation } = props;
  const [data, setData] = useState({});
  const [indicator, setIndicator] = useState(true);
  const { photo_url } = navigation.state.params;

  useEffect(() => {
    ApiService.getDetailCourse()
      .then(response => {
        const { data } = response;
        setData(data);
        setIndicator(false);
      })
      .catch(error => {
        console.log(error);
        setIndicator(false);
      });
  }, [])

  return (
    <Background transparent style={LoginStyle.container}>
      <NavBar
        title="Course Detail"
        bgText={Theme.primaryColor}
        onBack={() => navigation.pop()}
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
          <Materi data={data['materi course']} />
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

export default CourseDetail;
