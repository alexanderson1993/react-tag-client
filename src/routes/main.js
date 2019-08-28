import React from "react"
import { Router } from "@reach/router"
import css from "@emotion/css"
import GameList from "../components/gameList"
import useMedia from "../hooks/useMedia"
import { useTheme, ErrorBoundary } from "sancho"

const Game = React.lazy(() => import("./game"))
const NewGame = React.lazy(() => import("./newGame"))
const JoinGame = React.lazy(() => import("./joinGame"))

const GameComp = props => (
  <ErrorBoundary>
    <Game {...props}></Game>
  </ErrorBoundary>
)
const Main = () => {
  const theme = useTheme()
  const detailView = useMedia(
    [`(min-width: ${theme.breakpoints.sm})`],
    [false],
    true
  )

  return (
    <>
      {detailView ? (
        <Router>
          <JoinGame path="/game/join" back></JoinGame>
          <NewGame path="/game/new" back></NewGame>
          <GameComp path="/game/:gameId" back></GameComp>
          <GameList path="/game"></GameList>
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
            <JoinGame path="/game/join"></JoinGame>

            <NewGame path="/game/new"></NewGame>
            <GameComp path="/game/:gameId" />
          </Router>
        </div>
      )}
    </>
  )
}
export default Main
