import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/images/FieldNationLogo.jpg";

function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [
    manageMenuAnchor,
    setManageMenuAnchor,
  ] = useState(null);

  const [
    profileMenuAnchor,
    setProfileMenuAnchor,
  ] = useState(null);

  const manageMenuOpen =
    Boolean(manageMenuAnchor);

  const profileMenuOpen =
    Boolean(profileMenuAnchor);

  const handleManageClick = (event) => {
    setManageMenuAnchor(
      event.currentTarget
    );
  };

  const handleManageMenuClose = () => {
    setManageMenuAnchor(null);
  };

  const handleManageItem = (item) => {
    handleManageMenuClose();

    if (item === "Locations") {
      navigate("/locations");
      return;
    }
  };

  const handleProfileClick = (event) => {
    setProfileMenuAnchor(
      event.currentTarget
    );
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleMyProfile = () => {
    handleProfileMenuClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleProfileMenuClose();

    localStorage.removeItem(
      "fieldNationAuthenticated"
    );

    localStorage.removeItem(
      "fieldNationUser"
    );

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#4d5673",
        borderBottom:
          "1px solid #dcdcdc",
      }}
    >
      <Toolbar
        sx={{
          height: 70,
          minHeight: 70,
        }}
      >
        <Box
          sx={{
            mr: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Field Nation"
            style={{
              height: "42px",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate("/locations")
            }
          />
        </Box>

        <IconButton>
          <AddIcon />
        </IconButton>

        <IconButton
          sx={{
            mr: 2,
          }}
        >
          <SearchIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 3.5,
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              lineHeight: 1.5,
            }}
          >
            Work
          </Typography>

          <Typography
            sx={{
              cursor: "pointer",
              lineHeight: 1.5,
            }}
          >
            Workforce
          </Typography>

          <Typography
            sx={{
              cursor: "pointer",
              lineHeight: 1.5,
            }}
          >
            Recruitments
          </Typography>

          <Typography
            component="button"
            onClick={
              handleManageClick
            }
            aria-controls={
              manageMenuOpen
                ? "manage-menu"
                : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              manageMenuOpen
                ? "true"
                : undefined
            }
            sx={{
              border: "none",
              background: "transparent",
              color: "#4d5673",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight:
                location.pathname ===
                "/locations"
                  ? 600
                  : 400,
              padding: 0,
              margin: 0,
              display: "inline-flex",
              alignItems: "center",
              lineHeight: "24px",
              borderBottom:
                location.pathname ===
                "/locations"
                  ? "3px solid #ff6a00"
                  : "3px solid transparent",
              "&:hover": {
                backgroundColor:
                  "transparent",
              },
            }}
          >
            Manage
          </Typography>

          <Typography
            sx={{
              cursor: "pointer",
              lineHeight: 1.5,
            }}
          >
            Integrations
          </Typography>

          <Typography
            sx={{
              cursor: "pointer",
              lineHeight: 1.5,
            }}
          >
            Insights
          </Typography>
        </Box>

        <Typography
          sx={{
            mr: 4,
            fontWeight: 600,
          }}
        >
          $1.10
        </Typography>

        <IconButton>
          <HelpOutlineOutlinedIcon />
        </IconButton>

        <IconButton>
          <Badge
            badgeContent={227}
            color="error"
          >
            <MailOutlineOutlinedIcon />
          </Badge>
        </IconButton>

        <IconButton>
          <Badge
            badgeContent={132}
            color="error"
          >
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>

        <IconButton
          onClick={
            handleProfileClick
          }
          aria-controls={
            profileMenuOpen
              ? "profile-menu"
              : undefined
          }
          aria-haspopup="true"
          aria-expanded={
            profileMenuOpen
              ? "true"
              : undefined
          }
        >
          <AccountCircleOutlinedIcon
            fontSize="large"
          />
        </IconButton>
      </Toolbar>

      <Menu
        id="manage-menu"
        anchorEl={
          manageMenuAnchor
        }
        open={
          manageMenuOpen
        }
        onClose={
          handleManageMenuClose
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 265,
              borderRadius: 1,
              boxShadow:
                "0 4px 16px rgba(0,0,0,0.12)",
            },
          },
        }}
      >
        <MenuItem
          onClick={() =>
            handleManageItem(
              "Clients"
            )
          }
        >
          Clients
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Templates"
            )
          }
        >
          Templates
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Custom Fields"
            )
          }
        >
          Custom Fields
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Tags"
            )
          }
        >
          Tags
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Selection Rules"
            )
          }
        >
          Selection Rules
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Locations"
            )
          }
        >
          Locations
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Documents"
            )
          }
        >
          Documents
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Import Spreadsheets"
            )
          }
        >
          Import Spreadsheets
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Provider Tags"
            )
          }
        >
          Provider Tags
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "SmartAudit"
            )
          }
        >
          SmartAudit
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Provider Assessments"
            )
          }
        >
          Provider Assessments
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleManageItem(
              "Revisit & Incomplete Reasons"
            )
          }
        >
          Revisit & Incomplete Reasons
        </MenuItem>
      </Menu>

      <Menu
        id="profile-menu"
        anchorEl={
          profileMenuAnchor
        }
        open={
          profileMenuOpen
        }
        onClose={
          handleProfileMenuClose
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              borderRadius: 1,
              boxShadow:
                "0 4px 16px rgba(0,0,0,0.12)",
            },
          },
        }}
      >
        <MenuItem
          onClick={
            handleMyProfile
          }
        >
          My Profile
        </MenuItem>

        <MenuItem
          onClick={
            handleLogout
          }
          sx={{
            color: "#d32f2f",
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default TopNavigation;