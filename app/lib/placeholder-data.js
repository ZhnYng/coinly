export const user = {
  id: '1',
  username: 'john_doe',
  email: 'john@example.com',
  passwordHash: 'hashedPassword123',
};

export const transactions = [
  {
    id: '1',
    date: '2024-02-25',
    description: 'Groceries',
    amount: -5025, // $50.25 in cents (negative for expenses)
    category: 'Food',
  },
  {
    id: '2',
    date: '2024-02-24',
    description: 'Gasoline',
    amount: -4000, // $40.00 in cents (negative for expenses)
    category: 'Transportation',
  },
  {
    id: '3',
    date: '2024-02-23',
    description: 'Salary',
    amount: 200000, // $2000.00 in cents (positive for income)
    category: 'Income',
  },
  {
    id: '4',
    date: '2024-02-22',
    description: 'Wingstop',
    amount: -7520, // $75.20 in cents (negative for expenses)
    category: 'Food',
  },
  {
    id: '6',
    date: '2024-02-20',
    description: 'Freelance Project',
    amount: 120000, // $1200.00 in cents (positive for income)
    category: 'Income',
  },
];