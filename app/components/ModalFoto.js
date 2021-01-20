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

function ModalFoto(props) {
  const { visible, onClose, onSelectedItem } = props;
  const config = {
    width: width / 2,
    height: width / 2,
    cropping: true
  }

  const _onSelectedItem = (type) => {
    if (type == 'gallery') {
      ImagePicker.openPicker(config).then(image => {
        onSelectedItem(image.path);
        onClose();
      });
    } else {
      ImagePicker.openCamera(config).then(image => {
        onSelectedItem(image.path);
        onClose();
      });
    }
  }

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
              onPress={() => _onSelectedItem('gallery')}
            >
              <Image source={Images.icGallery} style={LoginStyle.image} />
            </TouchableOpacity>
            <Text>Gallery</Text>
          </View>
          <View style={ModalBottomStyle.contentContainer}>
            <TouchableOpacity
              style={LoginStyle.iconContainer}
              onPress={() => _onSelectedItem('capture')}
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

export default ModalFoto;
