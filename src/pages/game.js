import React from "react";
import Layout from "../components/layout";
import { navigate } from "@reach/router";
import { useAuth } from "../context/AuthContext";

const Main = React.lazy(() => import("../routes/main"));

const Game = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) {
    navigate("/");
    return null;
  }
  return (
    <Layout>
      <Main></Main>
    </Layout>
  );
};

export default Game;
