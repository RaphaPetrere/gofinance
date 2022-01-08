import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: 'income' | 'outcome';
  isActive?: boolean;
}


export const Container = styled.View<IconProps>`
  width: 48%;
  border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.text};
  border-radius: 5px;
  ${({ isActive, type }) => isActive && type === 'income' && css`
    background-color: ${({ theme }) => theme.colors.success_light };
  `}

  ${({ isActive, type }) => isActive && type === 'outcome' && css`
    background-color: ${({ theme }) => theme.colors.attention_light };
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px 0px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) => 
    type === 'income' ? theme.colors.success : theme.colors.attention
  };
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;