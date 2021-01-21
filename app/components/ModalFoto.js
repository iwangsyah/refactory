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
    if (type == 'Gallery') {
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

  const _renderButton = (icon, type) => (
    <View style={ModalBottomStyle.contentContainer}>
      <TouchableOpacity
        style={LoginStyle.iconContainer}
        onPress={() => _onSelectedItem(type)}
      >
        <Image source={icon} style={LoginStyle.image} />
      </TouchableOpacity>
      <Text>{type}</Text>
    </View>
  )

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
          {_renderButton(Images.icGallery, 'Gallery')}
          {_renderButton(Images.icCamera, 'Capture')}
        </View>
      </View>
    </Modal>
  );
}

export default ModalFoto;
