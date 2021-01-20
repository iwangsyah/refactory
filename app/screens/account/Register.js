import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Location,
  InputText,
  ModalFoto,
  Background
} from '../../components';
import Images from '../../assets/images';
import { LoginStyle } from '../../styles';
import { Navigation, ActionTypes as types } from '../../configs';

function Register(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const reducer = useSelector(state => state);
  const { user, loginStory, registeredUsers } = reducer;
  const dispatch = useDispatch();

  const _setRegisteredUsers = (users) => {
    dispatch({ type: types.SET_REGISTERED_USERS, users });
  }

  const _onShowModal = (isVisible) => {
    setIsVisible(isVisible);
  }

  const _onChangeFoto = (imageUri) => {
    setImageUri(imageUri);
  }

  const _onRegister = () => {
    const data = { email, username, password, imageUri };

    if (email && username && password && imageUri) {
      const dataExist = _.find(registeredUsers.users, (item) => {
        return item.email === email;
      })
      if (dataExist) {
        const index = _.findIndex(loginStory.users, (item) => (item.email == email));
        if (index < 0) {
          alert('Email sudah terdaftar\ntetapi anda belum pernah login')
        } else {
          alert(`Email sudah terdaftar\nAnda telah login menggunakan\nusername : ${email}\nsebanyak ${loginStory.users[index].count} kali`);
        }
      } else {
        registeredUsers.users.push(data);
        _setRegisteredUsers(registeredUsers.users);
        navigation.navigate(Navigation.LOGIN);
      }
    } else {
      alert('Semua data harus diisi')
    }
  }

  const renderFoto = () => {
    let content;
    if (imageUri) {
      content = (
        <View style={[LoginStyle.row, { flex: 5 }]}>
          <Image
            source={{ isStatic: true, uri: imageUri }}
            style={LoginStyle.imagePreview}
          />
          <TouchableOpacity style={LoginStyle.buttonDelete} onPress={() => _onChangeFoto('')}>
            <Text style={LoginStyle.text}>Hapus Foto</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      content = (
        <View style={{ flex: 5 }}>
          <TouchableOpacity style={LoginStyle.iconContainer} onPress={() => _onShowModal(true)}>
            <Image
              source={Images.icCamera}
              style={LoginStyle.image} />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={LoginStyle.row}>
        <Text style={[LoginStyle.text, { flex: 2 }]}>
          Foto Profile
        </Text>
        {content}
      </View>
    )
  }

  return (
    <ImageBackground source={Images.bgLogin} style={{ flex: 1 }}>
      <Background transparent style={[LoginStyle.container, { paddingHorizontal: 16 }]}>
        <Text style={LoginStyle.title}>Register</Text>
        <View style={LoginStyle.box}>
          <InputText
            title="Username"
            onChange={username => setUsername(username)}
            value={username}
          />
          {renderFoto()}
          <InputText
            title="Email"
            keyboardType="email-address"
            onChange={email => setEmail(_.toLower(email))}
            value={_.toLower(email)}
          />
          <InputText
            title="Password"
            secureTextEntry
            onChange={password => setPassword(password)}
            value={password}
          />
        </View>
        <Button
          title="Register"
          onPress={() => _onRegister()}
        />
        <Text style={[LoginStyle.text, { textAlign: 'center' }]}>Sudah memiliki akun? <Text style={LoginStyle.txtColor} onPress={() => navigation.navigate(Navigation.LOGIN)}>Login</Text></Text>
        <Location data={user.location} />
      </Background>
      <ModalFoto
        visible={isVisible}
        onClose={() => _onShowModal(false)}
        onSelectedItem={(imageUri) => _onChangeFoto(imageUri)}
      />
    </ImageBackground>
  );
}

export default Register;

