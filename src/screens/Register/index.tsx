import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { CategorySelect } from '../../components/Forms/CategorySelect';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelected(type: 'income' | 'outcome') {
    setTransactionType(type);
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
          <Input 
            placeholder='Nome'
          />
          <Input 
            placeholder='Preço'
          />
          <TransactionsTypes>
            <TransactionTypeButton 
              onPress={() => handleTransactionTypeSelected('income')}
              title='Income'
              type='income'
              isActive={transactionType === 'income'}
            />
            <TransactionTypeButton 
              onPress={() => handleTransactionTypeSelected('outcome')}
              title='Outcome'
              type='outcome'
              isActive={transactionType === 'outcome'}
            />
          </TransactionsTypes>

          <CategorySelect 
            title='Categoria'
          />
        </Fields>

        <Button 
          title='Enviar'
        />
      </Form>
    </Container>
  );
}