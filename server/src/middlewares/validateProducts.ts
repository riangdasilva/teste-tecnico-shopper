import { Request, Response, NextFunction } from "express"
import productsService from "../services/products"

const validateProduct = async (product: UpdateProduct) => {
  const { code, new_price } = product

  if (!code) {
    throw new Error("Product code is missing")
  }

  if (typeof code !== "number") {
    throw new Error("Product code must be a number")
  }

  if (!new_price) {
    throw new Error("Product sales price is missing")
  }

  if (typeof new_price !== "number") {
    throw new Error("Product sales price must be a number")
  }

  const productExists = await productsService.readProduct(code)

  if (!productExists) {
    throw new Error(`Product with code ${code} does not exist`)
  }

  if (new_price < productExists.cost_price) {
    throw new Error("Product sales price cannot be lower than cost price")
  }

  if (
    Math.abs(new_price - productExists.sales_price) >
    productExists.sales_price * 0.1
  ) {
    throw new Error(
      "Product sales price cannot be 10% higher or lower than current sales price"
    )
  }
}

export const validateProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products: UpdateProduct[] = req.body

    if (!products) {
      throw new Error("Products are missing")
    }

    if (!Array.isArray(products)) {
      throw new Error("Products must be an array")
    }

    for (const product of products) {
      await validateProduct(product)
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
    return
  }

  next()
}
