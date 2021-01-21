import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View
} from 'react-native';
import {
  Background,
  NavBar,
  Help,
  AsSeeOn,
  Connects
} from '../../components';
import { CommonStyle, LoginStyle, Theme } from '../../styles';
import { ApiService } from '../../services';
import Images from '../../assets/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: Theme.primaryColor,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: Theme.fontMedium,
    color: Theme.txtSecondaryColor,
    lineHeight: 32
  },
  description: {
    color: Theme.txtSecondaryColor,
    textAlign: 'left',
    marginVertical: 16,
  }
})

function Home() {
  const [data, setData] = useState([]);
  const connects = [
    { name: 'linkedin', url: 'https://www.linkedin.com/school/13270470/' },
    { name: 'facebook-f', url: 'https://www.facebook.com/refactoryid/' },
    { name: 'youtube-play', url: 'https://www.youtube.com/c/refactory' },
    { name: 'instagram', url: 'https://www.instagram.com/refactory.id/' }
  ]

  useEffect(() => {
    ApiService.getSeeOn()
      .then(response => {
        const { data } = response.data;
        setData(data);
      })
      .catch(error => {
        setIndicator(false);
      })
  }, [])

  const renderHeaderContent = () => (
    <ImageBackground
      source={Images.bgHome}
      style={{ flex: 1, height: 'auto', marginBottom: 8 }}
    >
      <Background
        transparent
        style={[LoginStyle.container, { padding: 16 }]}
      >
        <Text style={styles.title}>Empowering <Text style={{ color: Theme.buttonColor }}>People</Text> Through Programming</Text>
        <Text style={[CommonStyle.textDescription, styles.description]}>
          Refactory adalah perusahaan edukasi dan teknologi yang menyediakan layanan lengkap berupa course maupun custom training yang materinya dapat disesuaikan dengan kebutuhan teknologi dan bisnis perusahaan Anda
              </Text>
      </Background>
    </ImageBackground>
  )

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <View style={styles.header}>
        <Image
          source={Images.icLogo}
          style={{ maxHeight: 50, resizeMode: 'contain' }}
        />
      </View>
      <ScrollView>
        {renderHeaderContent()}
        <Help />
        <AsSeeOn data={data} />
        <Connects data={connects} />
      </ScrollView>
    </View>
  )
}

export default Home;