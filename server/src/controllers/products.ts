import { Request, Response } from "express"
import productsService from "../services/products"
import packsService from "../services/packs"

export const readProduct = async (req: Request, res: Response) => {
  const code = Number(req.params.code)
  const product = await productsService.readProduct(code)
  const components = await packsService.readPackByProductCode(code)

  res.json({
    ...product,
    components: components ? components : [],
  })
}

export const updateProducts = async (req: Request, res: Response) => {
  const productsToUpdate: UpdateProduct[] = req.body
  await productsService.updateProducts(productsToUpdate)
  res.status(204).end()
}
