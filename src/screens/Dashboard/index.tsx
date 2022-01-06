import React from 'react';

import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={{ uri: 'https://avatars.githubusercontent.com/u/56046074?v=4'}}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Marilene</UserName>
            </User>
          </UserInfo>
        </UserWrapper>
        <Icon name='power' />
      </Header>
    </Container>
  )
}