import React from "react";
import { Router } from "@reach/router";
import css from "@emotion/css";
import GameList from "../components/gameList";
import useMedia from "../hooks/useMedia";
import { useTheme } from "sancho";

const Game = React.lazy(() => import("./game"));
const NewGame = React.lazy(() => import("./newGame"));
const JoinGame = React.lazy(() => import("./joinGame"));

const Main = () => {
  const theme = useTheme();
  const detailView = useMedia(
    [`(min-width: ${theme.breakpoints.sm})`],
    [false],
    true
  );

  return (
    <>
      {detailView ? (
        <Router>
          <JoinGame path="/join" back></JoinGame>
          <NewGame path="/new" back></NewGame>
          <Game path="/:gameId" back></Game>
          <GameList path="/"></GameList>
        </Router>
      ) : (
        <div
          css={css`
            display: grid;
            grid-template-columns: 40% 1fr;
            gap: 2rem;
          `}
        >
          <GameList></GameList>
          <Router>
            <JoinGame path="/join"></JoinGame>

            <NewGame path="/new"></NewGame>
            <Game path="/:gameId"></Game>
          </Router>
        </div>
      )}
    </>
  );
};
export default Main;
