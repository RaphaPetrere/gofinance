import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

export const Profile = () => 
<View>
  <Text testID='text-title'>Perfil</Text>
  <TextInput 
    testID='input-name'
    placeholder='Nome'
    autoCorrect={false}
    value="Raphael"
  />

  <TextInput 
    testID='input-surname'
    placeholder='Sobrenome'
    value="Petrére"
  />

  <Button 
    title='Salvar'
    onPress={() => {}}
  />
</View>;