import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

interface ProductsTableProps {
  verifiedProducts: ProductInTable[]
}

export default function VerifiedProductsTable({
  verifiedProducts,
}: ProductsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Preço de Venda</TableCell>
            <TableCell>Novo Preço</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {verifiedProducts.map((verifiedProduct) => (
            <TableRow key={verifiedProduct.code}>
              <TableCell component="th" scope="row">
                {verifiedProduct.code}
              </TableCell>
              <TableCell>{verifiedProduct.name}</TableCell>
              <TableCell>{verifiedProduct.sales_price}</TableCell>
              <TableCell>{verifiedProduct.new_price}</TableCell>
              <TableCell style={{ color: "red" }}>
                {verifiedProduct.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
