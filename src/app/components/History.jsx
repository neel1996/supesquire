import { HistoryEdu, HistoryOutlined } from "@mui/icons-material";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export default function History() {
  return (
    <Box
      sx={{
        backgroundColor: "#3f51b5",
        height: "100vh",
        boxShadow: "0px 0px 12px 0px rgb(63,81,181,0.17)",
      }}
    >
      <Stack
        sx={{
          color: "#edf0ff",
          flexDirection: "row",
          alignItems: "center",
          padding: "10px 20px",
          fontSize: "24px",
        }}
      >
        <HistoryOutlined />
        <Typography
          variant="caption"
          sx={{
            textAlign: "left",
            padding: "20px 10px",
            fontSize: "24px",
            fontWeight: 500,
          }}
        >
          Chat History
        </Typography>
      </Stack>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              padding: "15px 10px",
              background: "#95a0dd",
              borderRadius: "1px",
              fontSize: "18px",
              "&:hover": {
                background: "#7f8cd4",
              },
            }}
          >
            <ListItemIcon>
              <HistoryEdu />
            </ListItemIcon>
            <ListItemText primary="Untitled" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
