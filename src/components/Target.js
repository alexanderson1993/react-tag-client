import React from "react"
import SURRENDER from "../queries/surrender.graphql"
import { Text, Avatar, Button, IconChevronDown, Popover } from "sancho"
import { useMutation } from "@apollo/react-hooks"
import css from "@emotion/css"
import Loading from "../components/loading"

const Target = ({ gameId, user_id, name, photoURL }) => {
  /**
   *
   * TODO: Add useMutation
   *
   */

  function surrender() {
    // noop
  }
  const loading = false

  if (loading) return <Loading label="Surrendering..." />
  return (
    <>
      <Text variant="h3">Target</Text>

      <Avatar src={photoURL} name={name} size="xl"></Avatar>
      <div>
        <div
          css={css`
            margin: 1rem 0;
          `}
        >
          <Text variant="h4">
            {name} (ID: {user_id})
          </Text>
        </div>
      </div>
      <div
        css={css`
          margin-bottom: 2rem;
        `}
      >
        <Popover
          content={
            <div style={{ padding: "1rem" }}>
              Are you sure you want to surrender? This will end the game for
              you.
              <div>
                <Button intent="danger" onPress={surrender}>
                  Yes, surrender.
                </Button>
              </div>
            </div>
          }
        >
          <Button intent="danger" iconAfter={<IconChevronDown />}>
            Surrender
          </Button>
        </Popover>
      </div>
    </>
  )
}

export default Target
