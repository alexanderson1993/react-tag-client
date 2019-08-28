import React from "react"

import { storiesOf } from "@storybook/react"
import GameList from "../components/gameList"
import { MockedProvider } from "@apollo/react-testing"
import GAMES from "../queries/games.graphql"
import GAMES_SUB from "../queries/gameListSub.graphql"

import { AuthContext } from "../context/AuthContext"

const mocks = [
  {
    request: {
      query: GAMES,
    },
    result: {
      data: {
        games: [
          {
            game_id: "1",
            name: "Game 1",
            completed: false,
            description:
              "A friendly game of assassin! Just poke your opponent with a spoon.",
            started: true,
            __typename: "Game",
          },
          {
            game_id: "2",
            name: "Game 2",
            completed: true,
            description:
              "A friendly game of assassin! Just poke your opponent with a spoon.",
            started: true,
            __typename: "Game",
          },
          {
            game_id: "3",
            name: "Game 3",
            completed: false,
            description:
              "A friendly game of assassin! Just poke your opponent with a spoon.",
            started: false,
            __typename: "Game",
          },
        ],
      },
    },
  },
  {
    request: {
      query: GAMES_SUB,
    },
    result: {
      data: {
        gameUpdate: {},
      },
    },
  },
]
storiesOf("GameList", module).add("game list", () => {
  return (
    <AuthContext.Provider value={{ user: { user_id: 1 } }}>
      <MockedProvider mocks={mocks}>
        <GameList />
      </MockedProvider>
    </AuthContext.Provider>
  )
})
