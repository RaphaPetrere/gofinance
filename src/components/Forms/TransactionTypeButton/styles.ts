import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: 'income' | 'outcome';
  isActive?: boolean;
}


export const Container = styled(TouchableOpacity)<IconProps>`
  flex-direction: row;
  align-items: center;
  width: 48%;
  border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.text};
  border-radius: 5px;
  padding: 16px 0px;
  justify-content: center;
  ${({ isActive, type }) => isActive && type === 'income' && css`
    background-color: ${({ theme }) => theme.colors.success_light };
  `}

  ${({ isActive, type }) => isActive && type === 'outcome' && css`
    background-color: ${({ theme }) => theme.colors.attention_light };
  `}
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