import React from "react";
import { Link } from "gatsby";

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

const LoginPage = () => {
  const signIn = provider =>
    auth
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorMessage);
      });
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
