import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  View,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { LoginStyle, ModalBottomStyle } from '../styles';
import Modal from 'react-native-modal';
import Images from '../assets/images';

const { width } = Dimensions.get('window');

export default class ModalFoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onSelectedItem = (type) => {
    if (type == 'gallery') {
      ImagePicker.openPicker({
        width: width / 2,
        height: width / 2,
        cropping: true
      }).then(image => {
        this.props.onSelectedItem(image.path)
        this.props.onClose()
      });
    } else {
      ImagePicker.openCamera({
        width: width / 2,
        height: width / 2,
        cropping: true
      }).then(image => {
        this.props.onSelectedItem(image.path)
        this.props.onClose()
      });
    }
  }

  render() {
    const { visible, onClose, selecte } = this.props;
    return (
      <Modal
        isVisible={visible}
        style={ModalBottomStyle.bottomModal}
        onBackdropPress={() => onClose()}>
        <View enableOnAndroid style={ModalBottomStyle.modalBox}>
          <Text style={ModalBottomStyle.title}>
            Pilihan
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <View style={ModalBottomStyle.contentContainer}>
              <TouchableOpacity
                style={LoginStyle.iconContainer}
                onPress={() => this._onSelectedItem('gallery')}
              >
                <Image source={Images.icGallery} style={LoginStyle.image} />
              </TouchableOpacity>
              <Text>Gallery</Text>
            </View>
            <View style={ModalBottomStyle.contentContainer}>
              <TouchableOpacity
                style={LoginStyle.iconContainer}
                onPress={() => this._onSelectedItem('gallery')}
              >
                <Image source={Images.icCamera} style={LoginStyle.image} />
              </TouchableOpacity>
              <Text>Ambil Foto</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
