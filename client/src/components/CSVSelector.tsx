import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

interface CSVSelectorProps {
  setLoadedProducts: React.Dispatch<React.SetStateAction<ProductToUpdate[]>>
}

export default function CSVSelector({ setLoadedProducts }: CSVSelectorProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return
    const reader = new FileReader()
    reader.readAsText(selectedFile)
    reader.onload = () => {
      const csvText = reader.result as string
      const lines = csvText.split("\n") as string[]

      const productsToUpdate = lines
        .map((line) => {
          const [code, price] = line.split(",")
          return {
            code: Number(code),
            new_price: Number(price),
          }
        })
        .filter((product) => !isNaN(product.code) && !isNaN(product.new_price))

      setLoadedProducts(productsToUpdate)
    }
  }

  return (
    <>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Carregar CSV
        <input type="file" accept=".csv" onChange={handleFileChange} hidden />
      </Button>
    </>
  )
}
