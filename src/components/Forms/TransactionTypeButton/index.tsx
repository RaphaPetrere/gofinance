import React from 'react';

import {
  Container,
  Icon,
  Title,
} from './styles';

import { TouchableOpacityProps } from 'react-native';

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
}

interface Props extends TouchableOpacityProps{
  title: string;
  type: 'income' | 'outcome';
  isActive: boolean;
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
  return (
    <Container 
      {...rest} 
      isActive={isActive} 
      type={type}
    >
      <Icon name={icon[type]} type={type}/>
      <Title>
        {title}
      </Title>
    </Container>
  )
}