import React from 'react';
import {
  Button,
  ImageContainer,
  Text,
} from './styles';

import { RectButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({title, svg: Svg, ...rest}: Props) {
  return (
    <GestureHandlerRootView>
      <Button {...rest}>
        <ImageContainer>
          <Svg />
        </ImageContainer>

        <Text>
          {title}
        </Text>
      </Button>
    </GestureHandlerRootView>
  )
}