import React, { useState } from 'react';
import { Modal } from 'react-native';

import { useForm } from 'react-hook-form';
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

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'any',
    color: '#104312'
  });

  const {
    control,
    handleSubmit
  } = useForm();

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name
    }
    console.log(data);
  }
  return (
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
          />
          <InputHookForm 
            name="amount"
            control={control}
            placeholder="Preço"
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
  );
}