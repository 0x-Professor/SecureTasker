import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AssignmentIcon from "@mui/icons-material/Assignment"
import SettingsIcon from "@mui/icons-material/Settings"
import { Link } from "react-router-dom"

const NavigationSidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: "1px solid #eee",
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6" component="div">
          Security Dashboard
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/operations">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Operations" secondary="Security operations" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  )
}

export default NavigationSidebar
