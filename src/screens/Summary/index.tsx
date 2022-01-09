import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { 
  Container, 
  Header,
  Title,
  Content,
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';

interface CategoryData {
  name: string;
  total: string;
  color: string;
}

export function Summary() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const loadData = async() => {
    const dataKey = '@gofinance:transactions';
    const asyncData = await AsyncStorage.getItem(dataKey);
    const newAsyncData = asyncData ? JSON.parse(asyncData!) : [];

    const outcomes = newAsyncData.filter((outcome: TransactionCardProps) => outcome.type === 'outcome');

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
        totalByCategory.push({
          name: category.name,
          total,
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