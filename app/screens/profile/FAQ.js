import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  View,
  Text,
} from 'react-native';
import Images from '../../assets/images';
import { NavBar } from '../../components';
import { CommonStyle, Theme } from '../../styles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    borderColor: Theme.lineColor,
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.bgPrimaryColor,
  },
  subItem: {
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    padding: 12,
    marginTop: 15,
    marginBottom: 0
  },
  text: {
    fontFamily: Theme.fontMedium
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain'
  }
});

export default class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          title: 'Refactory itu perusahaan apa sih?',
          items: [
            {
              title:
                'Refactory adalah perusahaan yang bergerak di bidang jasa IT.'
            },
          ],
        },
        {
          id: 2,
          title: 'Layanan apa saja yang ada di Refactory?',
          items: [
            { title: 'Refactory mempunyai empat layanan, yaitu Join Development (Project On Demand), DevOps Service by SL, Online Bootcamp/Custom Training Onsite, dan Refactory Course.' },
          ],
        },
        {
          id: 3,
          title: 'Apa itu Corporate Training/Bootcamp?',
          items: [
            {
              title:
                'Corporate training yaitu layanan training yang disediakan Refactory untuk perusahaan Anda. Tujuan dari layanan ini yaitu untuk mengembangkan kemampuan pemrograman dari karyawan perusahaan Anda. Refactory juga membantu mencarikan resource atau peserta untuk bootcamp.'
            },
          ],
        },
        {
          id: 4,
          title: 'Apakah perbedaan antara Corporate Training dengan Corporate Bootcamp?',
          items: [
            { title: 'Corporate training dilakukan secara on site dengan maksimal durasi training selama empat minggu. Corporate online bootcamp sendiri dilakukan full secara online dengan durasi bootcamp selama 12 minggu.' },
          ],
        },
        {
          id: 5,
          title: 'Lokasi kantor Refactory itu ada dimana sih?',
          items: [
            { title: 'Lokasi kami saat ini hanya berada di Yogyakarta. Tepatnya di Jln. Palagan Tentara Pelajar Km. 9,8 Ngaglik, Kab. Sleman, DI Yogyakarta 55581' },
          ],
        },
        {
          id: 6,
          title: 'Kalau mau request untuk join development itu gimana?',
          items: [
            { title: 'Untuk join development, bisa dibaca FAQ.' },
          ],
        },
        {
          id: 7,
          title: 'Apakah keunggulan corporate training ataupun bootcamp Refactory ini daripada di tempat lain?',
          items: [
            { title: 'Di Refactory, materi yang ingin diberikan kepada peserta bisa custom request dari klien. Lalu, Refactory akan membuatkan silabus sesuai dengan materi yang sudah di-request oleh klien. Selama training atau bootcamp, klien bisa mengimplementasikan studi kasus yang sedang dihadapi oleh klien. Dan paling menarik yaitu Refactory memberikan garansi setelah training selama dua minggu (10 hari kerja). Jadi, peserta masih bisa tanya jawab melalui pesan WA, telegram, ataupun Slack dengan mentor kami.' },
          ],
        },
      ],
      selectedId: 0,
    };
  }

  _renderItem = ({ item }) => {
    const active = item.id === this.state.selectedId;
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => {
          const id = active ? 0 : item.id;
          this.setState({ selectedId: id });
        }}>
        <View style={styles.item}>
          <Text style={[styles.text, { marginRight: 20 }]}>
            {item.title}
          </Text>
          <Image
            style={styles.icon}
            source={active ? Images.icArrowUp : Images.icArrowDown}
          />
        </View>
        <View style={{
          paddingHorizontal: 20,
          display: active ? 'flex' : 'none'
        }}
        >
          {item.items.map((object) => (
            <View style={styles.subItem}>
              <Text style={styles.text}>{object.title} </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Theme.bgPrimaryColor }}>
          <NavBar title="FAQ" bgText={Theme.primaryColor} onBack={() => this.props.navigation.pop()} />
          <View style={styles.container}>
            <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={CommonStyle.flatList}
              renderItem={this._renderItem}
            />
          </View>
        </View>
      </View>
    );
  }
}
