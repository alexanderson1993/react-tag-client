import React from "react";
import "./layout.css";
import {
  Avatar,
  Text,
  Button,
  IconLogOut,
  Popover,
  MenuList,
  MenuItem,
} from "sancho";
import css from "@emotion/css";
import { useAuth } from "../context/AuthContext";
import Loading from "./loading";
import { Link } from "gatsby";

const ProfileButton = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <Loading size="sm" />;
  if (!user) {
    return (
      <Button component={Link} variant="ghost" intent="primary" to="/login">
        Login
      </Button>
    );
  }

  return (
    <Popover
      content={
        <MenuList>
          <MenuItem contentBefore={<IconLogOut />} onPress={logout}>
            Logout
          </MenuItem>
        </MenuList>
      }
    >
      <Button
        variant="ghost"
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0.5rem;
        `}
      >
        <div
          css={css`
            padding: 0.5rem;
          `}
        >
          <Avatar
            size="sm"
            name={user.providerData[0].displayName}
            src={user.providerData[0].photoURL}
          />
        </div>{" "}
        <Text>{user.providerData[0].displayName}</Text>
      </Button>
    </Popover>
  );
};
const Profile = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 1rem;
        right: 1rem;
      `}
    >
      <ProfileButton />
    </div>
  );
};

export default Profile;
