import { TransactionCardProps } from '../components/TransactionCard';

export const filterTransactionByType = (
  transactionCollection: TransactionCardProps[], 
  type: 'income' | 'outcome'
) => transactionCollection.filter(transaction => transaction.type === type);

export const getTotalAmount = (
  transactionCollection: TransactionCardProps[]
) => transactionCollection.reduce(
  (acumulator: number, item) => acumulator + Number(item.amount), 0
);

export const formatAmount = (amount: number) => amount.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});