import React from "react"
import css from "@emotion/css"
import { InputGroup, Input, TextArea, Button } from "sancho"
import Back from "../components/back"
import { useMutation } from "@apollo/react-hooks"
import CREATE_GAME from "../queries/createGame.graphql"
import { navigate } from "gatsby"
import Loading from "../components/loading"

import GAMES from "../queries/games.graphql"

const NewGame = ({ back }) => {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [createGameAction, { loading }] = useMutation(CREATE_GAME, {
    update: (cache, { data: { createGame } }) => {
      const { games } = cache.readQuery({ query: GAMES })
      cache.writeQuery({
        query: GAMES,
        data: { games: games.concat([createGame]) },
      })
    },
  })
  const formRef = React.useRef()
  const submit = async e => {
    e.preventDefault()
    e.stopPropagation()
    const { data } = await createGameAction({
      variables: { name, description },
    })
    navigate(`/game/${data.createGame.game_id}`)
  }
  if (loading) return <Loading label="Creating game..." />
  return (
    <>
      {back && <Back to="/game" />}
      <h1>New Game</h1>
      <div
        css={css`
          max-width: 350px;
        `}
      >
        <form onSubmit={submit} ref={formRef}>
          <InputGroup label="Game Name">
            <Input
              required
              placeholder="The Showdown"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup
            label="Instructions"
            helpText="Include specific instructions so your players know what the rules of your game are, including how to eliminate other players."
          >
            <TextArea
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Work hard, play hard. Use a spoon to gently poke your target to eliminate them."
            />
          </InputGroup>
          <Button intent="success" onPress={submit}>
            Create Game
          </Button>
        </form>
      </div>
    </>
  )
}

export default NewGame
