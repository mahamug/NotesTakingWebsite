import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const NavList = ({ open }) => {
  const { notificationCount } = useContext(DataContext);
  const navList = [
    {
      id: 1,
      name: "Notes",
      icon: <LightbulbOutlinedIcon />,
      route: "/",
    },
    {
      id: 2,
      name: "Archive",
      icon: <ArchiveOutlinedIcon />,
      route: "/archive",
    },
    {
      id: 3,
      name: "Trash",
      icon: <DeleteOutlineOutlinedIcon />,
      route: "/delete",
    },
    {
      id: 4,
      name: "Reminders",
      icon: (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
            position: "relative",
          }}
          style={{ alignItems: "center" }}
        >
          <NotificationsNoneOutlinedIcon />
          {notificationCount >= 0 && (
            <span
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                fontSize: "12px",
                padding: "4px",
                position: "absolute",
                top: "-6px",
                right: "-6px",
              }}
            >
              {notificationCount}
            </span>
          )}
        </ListItemIcon>
      ),
      route: "/notification",
    },
  ];

  return (
    <List>
      {navList.map((list) => (
        <ListItem key={list.id} disablePadding sx={{ display: "block" }}>
          <Link
            to={list.route}
            style={{
              textDecoration: "none",
              display: "flex",
              color: "inherit",
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              {list.icon}
              <ListItemText
                primary={list.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
