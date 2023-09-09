import { Router } from "express"
import { validateProducts } from "../middlewares/validateProducts"
import { readProduct, updateProducts } from "../controllers/products"

const router = Router()

router.get("/:code", readProduct)
router.patch("/", validateProducts, updateProducts)

export default router
