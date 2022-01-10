import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';
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
  TransactionList,
  LogoutButton,
  LoadContainer,
} from './styles';

import { filterTransactionByType, formatAmount, getTotalAmount } from '../../utils/functions';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightCardDataProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightCardData {
  incomes: HighlightCardDataProps,
  outcomes: HighlightCardDataProps,
  total: HighlightCardDataProps,
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightCardData>({} as HighlightCardData);

  const theme = useTheme();

  const getLastTransactionDate = (transactionCollection: DataListProps[], type: 'income' | 'outcome') => {
    const rawDate = filterTransactionByType(transactionCollection, type).pop()?.date;
    const tipos = {
      income: 'entrada',
      outcome: 'saída'
    };
    return `Última ${tipos[type]} dia `+Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long'
    }).format(new Date(rawDate!))
  }

  const loadTransaction = async() => {
    const dataKey = '@gofinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const asyncTransactions = response ? JSON.parse(response!) : [];

    const transactionsFormatted: DataListProps[] = asyncTransactions.map((item: DataListProps) => {
      const amount = formatAmount(Number(item.amount));

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        date,
        type: item.type,
        category: item.category
      }
    });

    setTransactions(transactionsFormatted);
    const incomesTotal = getTotalAmount(filterTransactionByType(asyncTransactions, 'income'));
    const outcomesTotal = getTotalAmount(filterTransactionByType(asyncTransactions, 'outcome'));
    const total = incomesTotal - outcomesTotal;
    setHighlightData({
      incomes: {
        amount: formatAmount(incomesTotal),
        lastTransaction: getLastTransactionDate(asyncTransactions, 'income')
      },
      outcomes: {
        amount: formatAmount(outcomesTotal),
        lastTransaction: getLastTransactionDate(asyncTransactions, 'outcome')
      },
      total: {
        amount: formatAmount(total),
        lastTransaction: `1 à ${Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long'
        }).format(new Date(asyncTransactions.pop()?.date))}`
      },
    })
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadTransaction();
  },[],));
  return (
    <Container>
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
        :
        <>
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
              <GestureHandlerRootView>
                <LogoutButton onPress={() => {}}>
                  <Icon name='power' />
                </LogoutButton>
              </GestureHandlerRootView>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard 
              title='Entradas'
              amount={highlightData?.incomes?.amount}
              lastTransaction={highlightData?.incomes?.lastTransaction}
              type='up'
            />
            <HighlightCard 
              title='Saídas'
              amount={highlightData?.outcomes?.amount}
              lastTransaction={highlightData?.outcomes?.lastTransaction}
              type='down'
            />
            <HighlightCard 
              title='Total'
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.lastTransaction}
              type='total'
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList 
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
            
            
          </Transactions>
        </>
      }
    </Container>
  )
}