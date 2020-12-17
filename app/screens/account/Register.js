import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {
  Background,
  ModalFoto,
  InputText,
  Location,
  Button
} from '../../components';
import Images from '../../assets/images';
import { Navigation } from '../../configs';
import { NavigationService } from '../../util';
import { Theme, LoginStyle } from '../../styles';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      imageUri: '',
      isVisible: false,
      location: props.navigation.state.params.location
    }
  }

  _onShowModal = (isVisible) => {
    this.setState({ isVisible })
  }

  _onChangeFoto = (imageUri) => {
    this.setState({ imageUri })
  }

  renderFoto = () => {
    const { imageUri } = this.state;
    let content;
    if (imageUri) {
      content = (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ isStatic: true, uri: imageUri }}
            style={LoginStyle.imagePreview}
          />
          <TouchableOpacity style={LoginStyle.buttonDelete} onPress={() => this._onChangeFoto('')}>
            <Text style={LoginStyle.text}>Hapus Foto</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      content = (
        <TouchableOpacity
          style={LoginStyle.iconContainer}
          onPress={() => this._onShowModal(true)}
        >
          <Image
            source={Images.icCamera}
            style={LoginStyle.image} />
        </TouchableOpacity>
      )
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[LoginStyle.text, { marginRight: 10 }]}>
          Foto Profile
      </Text>
        {content}
      </View>
    )
  }

  render() {
    const { isVisible, location } = this.state;
    return (
      <ImageBackground source={Images.bgLogin} style={{ flex: 1 }}>
        <Background transparent style={LoginStyle.container}>
          <Text style={LoginStyle.title}>Register</Text>
          <View style={LoginStyle.box}>
            <InputText title="Username" onChange={username => this.setState({ username })} />
            {this.renderFoto()}
            <InputText title="Email" onChange={email => this.setState({ email })} />
            <InputText title="Password" onChange={password => this.setState({ password })} />
          </View>
          <Button title="Register" />
          <Text style={[LoginStyle.text, { textAlign: 'center' }]}>Sudah memiliki akun? <Text style={LoginStyle.txtColor} onPress={() => NavigationService.navigate(Navigation.LOGIN)}>Login</Text></Text>
          <Location data={location} />
        </Background>
        <ModalFoto
          visible={isVisible}
          onClose={() => this._onShowModal(false)}
          onSelectedItem={(imageUri) => this._onChangeFoto(imageUri)}
        />
      </ImageBackground>
    );
  }
}

