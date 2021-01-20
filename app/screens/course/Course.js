import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import { ApiService } from '../../services';
import {
  NavBar,
  Background,
  CourseListItem
} from '../../components';
import { CommonStyle, LoginStyle, Theme } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold'
  },
})

function Course(props) {
  const { navigation } = props;
  const [data, setData] = useState({});
  const [indicator, setIndicator] = useState(true);


  useEffect(() => {
    ApiService.getListCourse()
      .then(response => {
        const { data } = response.data
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
      <NavBar title="Courses" bgText={Theme.primaryColor} />
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50,
          display: indicator ? 'flex' : 'none',
        }}
      />
      {!indicator && <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={CommonStyle.flatList}
          renderItem={({ item }) => (
            <CourseListItem item={item} navigation={navigation} />
          )}
        />
      </View>}
    </Background>
  )
}

export default Course;

