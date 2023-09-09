import express, { NextFunction } from "express"
import { Request, Response } from "express"
import productsRouter from "./routers/products"

const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  next()
})

app.use("/api/products", productsRouter)

export default app
