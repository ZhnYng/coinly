export const user = {
  id: '1',
  username: "test",
  email: "test@gmail.com",
  password: "123456"
};

export const transactions = [
  {
    date: new Date('2024-02-25'),
    description: 'Groceries',
    amount: -5025, // $50.25 in cents (negative for expenses)
    category: 'Food',
  },
  {
    date: new Date('2024-02-24'),
    description: 'Gasoline',
    amount: -4000, // $40.00 in cents (negative for expenses)
    category: 'Transportation',
  },
  {
    date: new Date('2024-02-23'),
    description: 'Salary',
    amount: 200000, // $2000.00 in cents (positive for income)
    category: 'Income',
  },
  {
    date: new Date('2024-02-22'),
    description: 'Wingstop',
    amount: -7520, // $75.20 in cents (negative for expenses)
    category: 'Food',
  },
  {
    date: new Date('2024-02-20'),
    description: 'Freelance Project',
    amount: 120000, // $1200.00 in cents (positive for income)
    category: 'Income',
  },
];