import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import StoreIcon from "@mui/icons-material/Store"

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StoreIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            teste-tecnico-shopper
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
