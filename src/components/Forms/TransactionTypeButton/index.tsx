import React from 'react';

import {
  Container,
  Icon,
  Title,
  Button,
} from './styles';

import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
}

interface Props extends RectButtonProps{
  title: string;
  type: 'income' | 'outcome';
  isActive: boolean;
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
  return (
    <Container 
    isActive={isActive} 
    type={type}
    >
      <GestureHandlerRootView>
        <Button {...rest}>
          <Icon name={icon[type]} type={type}/>
          <Title>
            {title}
          </Title>
        </Button>
      </GestureHandlerRootView>
    </Container>
  )
}