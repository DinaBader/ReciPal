import { View, Text ,Image,TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import React from 'react'
import common from '../../utils/common';
import style from "./style.js"
const Languages = () => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View style={[common.backgroundColor]}>
      <View style={[common.title]}>
          <TouchableOpacity>
          <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
          </TouchableOpacity>
        <Text style={[common.white, common.header]}>Languages</Text>
      </View>
      <Text style={[common.gray,style.title]}>Current Language</Text>
      <RadioButton
        value="English"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
        style={style.radiobutton}
      />
        <Text style={style.radioButtonText}>English</Text>
      <RadioButton
        value="Arabic"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
       <Text style={style.radioButtonText}>English</Text>
    </View>
  )
}

export default Languages