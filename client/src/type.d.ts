interface ProductsInDB {
  code: number
  name: string
  cost_price: number
  sales_price: number
  components: { code: number; qty: number }[]
}

interface ProductToUpdate {
  code: number
  new_price: number
}

interface ProductInTable {
  code: number
  name?: string
  cost_price?: number
  sales_price?: number
  new_price: number
  status?: string
}
