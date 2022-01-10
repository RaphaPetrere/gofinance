import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Container, 
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from './styles';

import { TransactionCardProps } from '../../components/TransactionCard';
import { HistoryCard } from '../../components/HistoryCard';

import { categories } from '../../utils/categories';
import { formatAmount, getTotalAmount } from '../../utils/functions';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryData {
  name: string;
  totalNumber: number;
  total: string;
  percent: string;
  color: string;
}

export function Summary() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [selectedDate, setSelectedData] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const theme = useTheme();

  const handleDateChange = (action: 'prev' | 'next') => 
    setSelectedData(
      action === 'prev' ? 
        subMonths(selectedDate, 1) : 
        addMonths(selectedDate, 1)
    );

  const loadData = async() => {
    setIsLoading(true);
    const dataKey = `@gofinance:transactions_user:${user.id}`;
    const asyncData = await AsyncStorage.getItem(dataKey);
    const newAsyncData = asyncData ? JSON.parse(asyncData!) : [];

    const outcomes = newAsyncData.filter((outcome: TransactionCardProps) =>
      outcome.type === 'outcome' &&
      new Date(outcome.date).getMonth() === selectedDate.getMonth() &&
      new Date(outcome.date).getFullYear() === selectedDate.getFullYear()
    );

    const totalOutcomes = getTotalAmount(outcomes);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      outcomes.forEach((outcome: TransactionCardProps) => {
        if(outcome.category === category.key)
          categorySum += Number(outcome.amount);
      })

      if(categorySum > 0)
      {
        const total = formatAmount(categorySum);

        const percent = `${(categorySum / totalOutcomes * 100).toFixed(0)}%`;
        totalByCategory.push({
          name: category.name,
          totalNumber: categorySum,
          total,
          percent,
          color: category.color,
        })
      }
    })

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
        :
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <GestureHandlerRootView>
              <MonthSelectButton
                onPress={() => handleDateChange('prev')}
              >
                <MonthSelectIcon name="chevron-left"/>
              </MonthSelectButton>
            </GestureHandlerRootView>
            <Month>
              { format(selectedDate, 'MMMM, yyyy', {
                locale: ptBR
              }) }
            </Month>
            <GestureHandlerRootView>
              <MonthSelectButton
                onPress={() => handleDateChange('next')}
              >
                <MonthSelectIcon name="chevron-right"/>
              </MonthSelectButton>
            </GestureHandlerRootView>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie 
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                }
              }}
              labelRadius={50}
              x='percent'
              y='totalNumber'
            />
          </ChartContainer>
          {
            totalByCategories.map(item => 
              <HistoryCard 
                key={item.name}
                title={item.name}
                amount={item.total}
                color={item.color}
              />
            )
          }
        </Content>
      }

    </Container>
  )
}