import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

interface TransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const transactions = this.transactionsRepository.all()
    const balance = this.transactionsRepository.getBalance(transactions)
    console.log(balance)

    if (type === 'outcome' && value > balance.total) {
      throw new Error("saldo indisponivel")
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })
    return transaction
  }
}

export default CreateTransactionService
