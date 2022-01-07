import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      title:'Desenvolvimento de site',
      amount:'R$ 12.000,00',
      category:{
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date:'13/08/2021',
      type:'income',
    },
    {
      id: '2',
      title:'Hamburgueria Pizzy',
      amount:'R$ 59,00',
      category:{
        name: 'Alimentação',
        icon: 'coffee'
      },
      date:'13/08/2021',
      type:'outcome',
    },
    {
      id: '3',
      title:'Aluguel do apartamento',
      amount:'R$ 1.200,00',
      category:{
        name: 'Casa',
        icon: 'home'
      },
      date:'13/08/2021',
      type:'outcome',
    },
  ]
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
          <Icon name='power' />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de agosto'
          type='up'
        />
        <HighlightCard 
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última saída dia 13 de agosto'
          type='down'
        />
        <HighlightCard 
          title='Total'
          amount='R$ 16.411,00'
          lastTransaction='01 à 13 de agosto'
          type='total'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
        
        
      </Transactions>
    </Container>
  )
}