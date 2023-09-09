import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import CSVSelector from "./CSVSelector"
import { readProduct, updateProducts } from "../services/products"
import ProductsTable from "./ProductsTable"
import VerifiedProductsTable from "./VerifiedProductsTable"

export default function Main() {
  const [loadedProducts, setLoadedProducts] = useState([] as ProductToUpdate[])
  const [verifiedProducts, setVerifiedProducts] = useState(
    [] as ProductInTable[]
  )
  const [canUpdate, setCanUpdate] = useState(false)

  const update = () => {
    updateProducts(loadedProducts)
    setLoadedProducts([])
    setVerifiedProducts([])
    setCanUpdate(false)
  }

  const verifyProduct = async (
    product: ProductToUpdate,
    products: ProductToUpdate[]
  ) => {
    const { code, new_price } = product
    if (!code) return "Código não informado"
    if (typeof code !== "number") return "Código inválido"
    if (!new_price) return "Preço não informado"
    if (typeof new_price !== "number") return "Preço inválido"

    const productInDB = await readProduct(code)

    if (!productInDB) return `Produto não encontrado`
    if (new_price < productInDB.cost_price) return `Preço abaixo do custo`

    const difference = Math.abs(new_price - productInDB.sales_price)
    const limit = productInDB.sales_price * 0.1
    if (difference > limit) return `Preço acima ou abaixo de 10% do preço atual`

    const components = productInDB.components
    if (components.length > 0) {
      let sum = 0
      for (const component of components) {
        const componentInProducts = products.find(
          (product) => product.code === component.code
        )
        if (!componentInProducts) {
          return `Componente ${component.code} não encontrado`
        }
        sum += componentInProducts.new_price * component.qty
      }
      if (sum !== new_price) {
        return `Preço não condiz com o preço dos componentes`
      }
    }

    console.log(productInDB)
    return productInDB
  }

  const verify = async () => {
    const verified = [] as ProductInTable[]
    let canUpdate = true
    for (const loadedProduct of loadedProducts) {
      const result = await verifyProduct(loadedProduct, loadedProducts)
      if (typeof result === "string") {
        verified.push({
          ...loadedProduct,
          status: result,
        })
        canUpdate = false
      }
      if (typeof result === "object") {
        verified.push({
          ...loadedProduct,
          name: result.name,
          cost_price: result.cost_price,
          sales_price: result.sales_price,
          status: "",
        })
      }
    }
    setCanUpdate(canUpdate)
    setVerifiedProducts(verified)
  }

  const cancel = () => {
    setLoadedProducts([])
    setVerifiedProducts([])
    setCanUpdate(false)
  }

  const UpdateButton = () => {
    if (canUpdate) {
      return (
        <Button variant="contained" color="success" onClick={update}>
          Atualizar
        </Button>
      )
    }
    return (
      <Button variant="contained" color="success" disabled>
        Atualizar
      </Button>
    )
  }

  const Table = () => {
    if (verifiedProducts.length > 0) {
      return (
        <>
          <VerifiedProductsTable verifiedProducts={verifiedProducts} />
          <Stack direction="row" spacing={2}>
            <UpdateButton />
            <Button variant="contained" disabled>
              Verificar
            </Button>
            <Button variant="contained" onClick={cancel}>
              Cancelar
            </Button>
          </Stack>
        </>
      )
    }
    return (
      <>
        <ProductsTable products={loadedProducts} />
        <Stack direction="row" spacing={2}>
          <UpdateButton />
          <Button variant="contained" onClick={verify}>
            Verificar
          </Button>
          <Button variant="contained" onClick={cancel}>
            Cancelar
          </Button>
        </Stack>
      </>
    )
  }

  return (
    <>
      {loadedProducts.length > 0 ? (
        <Table />
      ) : (
        <CSVSelector setLoadedProducts={setLoadedProducts} />
      )}
    </>
  )
}
