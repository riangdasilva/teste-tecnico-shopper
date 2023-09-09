import axios from "axios"

import { API } from "../config"

export const readProduct = async (code: number): Promise<ProductsInDB> => {
  const response = await axios.get(`${API}/products/${code}`)
  return response.data
}

export const updateProducts = async (productsToUpdate: ProductToUpdate[]) => {
  const response = await axios.patch(`${API}/products`, productsToUpdate)
  return response.data
}
