import React, { useState, useEffect } from 'react';
import { 
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputHookForm } from '../../components/Forms/InputHookForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
});

type NavigationProps = {
  navigate: (screen:string) => void;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'any',
    color: '#104312'
  });

  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema) //faz a validação com base no schema.
  });

  async function handleRegister(form: FormData) {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category')
      return Alert.alert('Selecione uma categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    console.log(newTransaction);

    try {
      const dataKey = '@gofinance:transactions';
      const asyncData = await AsyncStorage.getItem(dataKey);
      const newAsyncData = asyncData ? JSON.parse(asyncData!) : [];
      //Ao passar o !, ele assegura ao Typescript de que sempre irá ter um valor
      const dataFormatted = [
        ...newAsyncData,
        newTransaction
      ];
      AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      //Limpando o formulário inteiro
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
        icon: 'any',
        color: '#104312'
      });
      reset(); //Isso irá limpar o formulário
      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Cadastro
          </Title>
        </Header>

        <Form>
          <Fields>
            <InputHookForm 
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputHookForm 
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton 
                onPress={() => setTransactionType('income')}
                title='Income'
                type='income'
                isActive={transactionType === 'income'}
              />
              <TransactionTypeButton 
                onPress={() => setTransactionType('outcome')}
                title='Outcome'
                type='outcome'
                isActive={transactionType === 'outcome'}
              />
            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={() => setCategoryModalOpen(true)}
            />
          </Fields>

          <Button 
            title='Enviar'
            onPress={handleSubmit(handleRegister)}
          />
        </Form>
        
        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setCategoryModalOpen(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}