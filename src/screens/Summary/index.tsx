import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { 
  Container, 
  Header,
  Title,
  Content,
  ChartContainer,
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';

import { useTheme } from 'styled-components';

import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface CategoryData {
  name: string;
  totalNumber: number;
  total: string;
  percent: string;
  color: string;
}

export function Summary() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  const loadData = async() => {
    const dataKey = '@gofinance:transactions';
    const asyncData = await AsyncStorage.getItem(dataKey);
    const newAsyncData = asyncData ? JSON.parse(asyncData!) : [];

    const outcomes = newAsyncData.filter((outcome: TransactionCardProps) => outcome.type === 'outcome');

    const totalOutcomes = outcomes.reduce((acumulator: number, outcome: TransactionCardProps) => {
      return acumulator + Number(outcome.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      outcomes.forEach((outcome: TransactionCardProps) => {
        if(outcome.category === category.key)
          categorySum += Number(outcome.amount);
      })

      if(categorySum > 0)
      {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

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
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
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

    </Container>
  )
}