import React from "react"
import START_GAME from "../queries/startGame.graphql"
import { useAuth } from "../context/AuthContext"
import { Text, Button } from "sancho"
import { useMutation } from "@apollo/react-hooks"
import useQrCode from "react-qrcode-hook"
import css from "@emotion/css"
import Loading from "../components/loading"

const GameInfo = ({ game_id, name, description, code, owner, playerCount }) => {
  const [startGame, { loading }] = useMutation(START_GAME, {
    variables: { gameId: game_id },
  })
  const { user } = useAuth()
  const qrCode = useQrCode(`https://react-tag.com/game/join?code=${code}`)

  if (loading) return <Loading label="Starting game..." />
  return (
    <>
      <Text variant="h3">{name}</Text>

      <Text variant="h4">
        <a href={`https://react-tag.com/game/join?code=${code}`}>
          Join Code: {code}
        </a>
      </Text>
      <img
        css={css`
          margin: 2rem 0;
        `}
        alt="qr code"
        src={qrCode}
      />

      {owner.user_id !== user.user_id ? (
        <Text variant="h4">Owner: {owner.name}</Text>
      ) : (
        <div>
          <Button
            intent="success"
            disabled={playerCount < 3}
            onPress={startGame}
          >
            Start Game
          </Button>
        </div>
      )}

      <Text variant="body">{description}</Text>
    </>
  )
}

export default GameInfo
