import React from "react"
import Back from "../components/back"
import css from "@emotion/css"
import { Text, Avatar, useToast } from "sancho"
import { useQuery, useSubscription } from "@apollo/react-hooks"
import GAME from "../queries/game.graphql"
import GAME_SUB from "../queries/gameSub.graphql"
import Loading from "../components/loading"
import NOTIFICATION from "../queries/notification.graphql"
import { useSubscribeToMore } from "../hooks/useSubscribeToMore"
import Target from "../components/Target"
import GameInfo from "../components/GameInfo"
import { useAuth } from "../context/AuthContext"

function useNotification() {
  const toast = useToast()
  const { user } = useAuth()
  const { data } = useSubscription(NOTIFICATION, {
    variables: { playerId: user.user_id },
  })

  React.useEffect(() => {
    if (data) {
      toast({
        title: data.notification,
        position: "top-right",
      })
    }
  }, [data])
}

const Game = ({ back, gameId }) => {
  const { data = {}, loading, error, subscribeToMore } = useQuery(GAME, {
    variables: { gameId },
    fetchPolicy: "network-only",

    skip: !gameId || gameId === "game",
  })
  const config = React.useMemo(
    () => ({
      variables: { gameId },
      skip: !gameId || gameId === "game",
      updateQuery: (previousResult, { subscriptionData }) => {
        return { game: subscriptionData.data.gameUpdate }
      },
    }),
    [gameId]
  )
  useSubscribeToMore(subscribeToMore, GAME_SUB, config)

  useNotification()
  if (!gameId) return null
  if (loading) return <Loading label="Loading game information..."></Loading>
  if (error) throw new Error(error)

  const { game } = data
  if (!game) throw new Error("Error loading game data.")
  return (
    <>
      {back && <Back to="/game" />}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 80vh;
        `}
      >
        {game.started && game.completed && game.winner && (
          <>
            <Text variant="display1">
              <span role="img" aria-label="crown">
                👑
              </span>
            </Text>
            <Text variant="h3">Winner!</Text>{" "}
            <Avatar size="xl" src={game.winner.photoURL} /> {game.winner.name}
          </>
        )}
        {game.started && !game.completed && game.me.dead && (
          <>
            <Text variant="display1">
              <span role="img" aria-label="skull">
                💀
              </span>
            </Text>
            <div>You are eliminated.</div>
          </>
        )}
        {game.started && !game.completed && !game.me.dead && game.me.target && (
          <Target gameId={game.game_id} {...game.me.target.user} />
        )}
        {!game.started && <GameInfo {...game} />}
        <Text>Total Players: {game.playerCount}</Text>
        <Text>Players Remaining: {game.aliveCount}</Text>
      </div>
    </>
  )
}

export default Game
