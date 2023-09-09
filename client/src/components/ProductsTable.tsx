import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

interface ProductsTableProps {
  products: ProductToUpdate[]
}

export default function ProductsTable({ products }: ProductsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Novo Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(({ code, new_price }) => (
            <TableRow key={code}>
              <TableCell component="th" scope="row">
                {code}
              </TableCell>
              <TableCell>{new_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
