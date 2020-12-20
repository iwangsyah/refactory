import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Background, NavBar } from '../../components';
import { CommonStyle, LoginStyle, Theme } from '../../styles';
import Images from '../../assets/images';
import { ApiService } from '../../services';
import { Browser } from '../../util';

const { width } = Dimensions.get('window');

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
  },
  subText: {
    fontSize: 18,
    color: Theme.txtPrimaryColor,
    fontFamily: Theme.fontMedium,
    marginTop: 16,
  },
  seeOn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    minWidth: width / 4,
    minHeight: 60,
    marginHorizontal: 16,
    resizeMode: 'contain'
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 16,
    resizeMode: 'contain'
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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      connect: [
        { name: 'linkedin', url: 'https://www.linkedin.com/school/13270470/' },
        { name: 'facebook-f', url: 'https://www.facebook.com/refactoryid/' },
        { name: 'youtube-play', url: 'https://www.youtube.com/c/refactory' },
        { name: 'instagram', url: 'https://www.instagram.com/refactory.id/' },
      ]
    }
  }

  componentDidMount = () => {
    ApiService.getSeeOn()
      .then(response => {
        const { data } = response.data
        this.setState({ data })
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  renderHelp = () => (
    <View style={CommonStyle.content}>
      <Text style={CommonStyle.textTitle}>Apa Yang Refactory Dapat Bantu?</Text>
      <View style={{ alignItems: 'center' }}>
        <Image source={Images.icApproval} style={styles.icon} />
        <Text style={styles.subText}>Memperkuat Tim Engineer Anda</Text>
        <Text style={CommonStyle.textDescription}>
          Refactory adalah perusahaan edukasi dan teknologi yang menyediakan layanan lengkap berupa course maupun custom training yang materinya dapat disesuaikan dengan kebutuhan teknologi dan bisnis perusahaan Anda
        </Text>
        <Image source={Images.icBolt} style={styles.icon} />
        <Text style={styles.subText}>Wujudkan Software Impian Anda</Text>
        <Text style={CommonStyle.textDescription}>
          Kami adalah perusahaan One-Stop IT Solution untuk proyek Anda, membantu di setiap tahap mulai dari menyusun ide, melalui desain dan pengembangan aplikasi seluler, situs web dan aplikasi desktop, hingga peluncuran produk.
        </Text>
      </View>
    </View>
  )

  renderAsSeeOn = () => (
    <View style={CommonStyle.content}>
      <Text style={CommonStyle.textTitle}>AS SEEN ON</Text>
      <View style={styles.seeOn}>
        {this.state.data.map((item) => (
          <TouchableOpacity
            style={{ marginHorizontal: 16 }}
            onPress={() => Browser.open(item.link_url)}
          >
            <Image
              source={{ uri: item.photo_url }}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  renderConnect = () => (
    <View style={CommonStyle.content}>
      <Text style={CommonStyle.textTitle}>CONNECT</Text>
      <View style={styles.seeOn}>
        {this.state.connect.map((item) => (
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
  )

  render() {
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
          {this.renderHelp()}
          {this.renderAsSeeOn()}
          {this.renderConnect()}
        </ScrollView>
      </View>
    )
  }
}

