import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import css from "@emotion/css"
import { Button } from "sancho"
import { navigate } from "@reach/router"
import { useAuth } from "../context/AuthContext"

const LoginPage = () => {
  const [userId, setUserId] = React.useState()
  const { user, login } = useAuth()

  if (user && user.user_id) {
    navigate("/game")
    return null
  }
  return (
    <Layout>
      <SEO title="Login" />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 5rem;
          .Button {
            margin-bottom: 1rem;
          }
        `}
      >
        <h1
          css={css`
            text-align: center;
          `}
        >
          Login
        </h1>
        <input value={userId} onChange={e => setUserId(e.target.value)} />
        <Button intent="danger" onPress={() => login(userId)}>
          Sign In
        </Button>
      </div>
    </Layout>
  )
}

export default LoginPage
