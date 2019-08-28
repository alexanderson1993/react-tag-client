import React from "react"
import "./layout.css"
import {
  Avatar,
  Text,
  Button,
  IconLogOut,
  Popover,
  MenuList,
  MenuItem,
} from "sancho"
import css from "@emotion/css"
import { useAuth } from "../context/AuthContext"
import { Link } from "gatsby"
import { useQuery } from "@apollo/react-hooks"
import ME_QUERY from "../queries/me.graphql"

const ProfileButton = () => {
  const { user, logout } = useAuth()
  const { data: { me = {} } = {} } = useQuery(ME_QUERY, {
    variables: { user_id: user.user_id },
  }) // TODO: Use this as one of the queries

  if (!user) {
    return (
      <Button component={Link} variant="ghost" intent="primary" to="/login">
        Login
      </Button>
    )
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
          <Avatar size="sm" name={me ? me.name : ""} src={me && me.photoURL} />
        </div>{" "}
        <Text>{me && me.name}</Text>
      </Button>
    </Popover>
  )
}
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
  )
}

export default Profile
