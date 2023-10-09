import { faker } from '@faker-js/faker'

function generateFakeSale() {
  return {
    id: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    amount: faker.finance.amount(),
  }
}

export const generateFakeSales = (count: number) => {
  return Array.from({ length: count }, generateFakeSale)
}
