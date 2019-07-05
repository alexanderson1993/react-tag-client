import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import css from "@emotion/css";
import { Button } from "sancho";
import {
  googleProvider,
  twitterProvider,
  githubProvider,
  auth,
} from "../helpers/firebase";
import { navigate } from "@reach/router";
import { useMutation } from "@apollo/react-hooks";
import { useAuth } from "../context/AuthContext";

import CREATE_USER from "../queries/createUser.graphql";

const LoginPage = () => {
  const { user } = useAuth();
  const [createUser] = useMutation(CREATE_USER);
  const signIn = provider =>
    auth
      .signInWithPopup(provider)
      .then(function(res) {
        // Create the user object
        if (res.additionalUserInfo.isNewUser) {
          createUser({
            variables: {
              displayName: res.user.providerData[0].displayName,
              photoURL: res.user.providerData[0].photoURL,
            },
          });
        }
      })
      // Ignore error if there is a user
      .catch(function() {});

  if (user && user.uid) {
    navigate("/game");
    return null;
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
        <Button intent="danger" onPress={() => signIn(googleProvider)}>
          Sign In with Google
        </Button>
        <Button intent="primary" onPress={() => signIn(twitterProvider)}>
          Sign In with Twitter
        </Button>
        <Button onPress={() => signIn(githubProvider)}>
          Sign In with Github
        </Button>
      </div>
    </Layout>
  );
};

export default LoginPage;
