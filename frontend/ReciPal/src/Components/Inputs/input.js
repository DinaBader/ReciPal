import {TextInput } from 'react-native'
import React from 'react'
import styles from "./styles"
const input = ({value,onChangeText,placeholder,secureTextEntry}) => {
    const {inputStyle}=styles
  return (
    <TextInput
          style={inputStyle}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none" 
        />
  )
}

export default input