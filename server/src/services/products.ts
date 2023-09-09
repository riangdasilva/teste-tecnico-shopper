import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const serializeProduct = (product: ProductInDB) => {
  return {
    ...product,
    code: Number(product.code),
    cost_price: Number(product.cost_price),
    sales_price: Number(product.sales_price),
  }
}

const readProduct = async (code: number) => {
  const product = await prisma.products.findUnique({
    where: {
      code,
    },
  })
  return product ? serializeProduct(product) : null
}

const readProducts = async (productsCode: number[]) => {
  return await prisma.products
    .findMany({
      where: {
        code: {
          in: productsCode,
        },
      },
    })
    .then((products) => products.map(serializeProduct))
}

const updateProducts = async (productsToUpdate: UpdateProduct[]) => {
  productsToUpdate.forEach(async ({ code, new_price }) => {
    await prisma.products.update({
      where: {
        code,
      },
      data: {
        sales_price: new_price,
      },
    })
  })
}

export default {
  readProduct,
  readProducts,
  updateProducts,
}
