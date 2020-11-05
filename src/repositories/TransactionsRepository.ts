import Transaction from '../models/Transaction'

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

interface Balance {
  income: number
  outcome: number
  total: number
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(transactions: CreateTransactionDTO[]): Balance {

    const totalBalance = {
      income: 0,
      outcome: 0,
      total: 0
    }

    transactions.map(function (obj) {
      if (obj.type === "income") {
        totalBalance.income = totalBalance.income + obj.value
      } else {
        totalBalance.outcome = totalBalance.outcome + obj.value
      }
    })

    totalBalance.total = totalBalance.income - totalBalance.outcome

    return totalBalance
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
