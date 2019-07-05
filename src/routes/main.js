import React from "react";
import { Router } from "@reach/router";
import css from "@emotion/css";
import GameList from "../components/gameList";
import useMedia from "../hooks/useMedia";
import { useTheme } from "sancho";

const Game = React.lazy(() => import("./game"));
const NewGame = React.lazy(() => import("./newGame"));

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
          <Game path="/:gameId" back></Game>
          <NewGame path="new" back></NewGame>
          <GameList path="/"></GameList>
        </Router>
      ) : (
        <div
          css={css`
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 2rem;
          `}
        >
          <GameList></GameList>
          <Router>
            <Game path="/:gameId"></Game>
            <NewGame path="new"></NewGame>
          </Router>
        </div>
      )}
    </>
  );
};
export default Main;
