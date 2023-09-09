interface UpdateProduct {
  code: number
  new_price: number
}

interface ProductInDB {
  code: bigint
  name: string
  cost_price: Decimal
  sales_price: Decimal
}

interface PackInDB {
  id: bigint
  pack_id: bigint
  product_id: bigint
  qty: bigint
}
