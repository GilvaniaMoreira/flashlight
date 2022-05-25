import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
// import imagex from './images/eco-light-off.png' (another way to import images)

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // turn on cell phone flash
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    // when shake the phone turn on flash and change toggle.
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // this function will be called when the component is unmounted
    return () => subscription.remove();
  }, []);
  // if toggle return light
  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? require('./images/eco-light.png')
              : require('./images/eco-light-off.png')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? require('./images/logo-dio.png')
              : require('./images/logo-dio-white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
