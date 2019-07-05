import React from "react";
import Back from "../components/back";
import css from "@emotion/css";
import { Text, Avatar, Button, IconChevronDown, Popover } from "sancho";

const Game = ({ back, gameId }) => {
  if (!gameId) return;
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
        <Text variant="h3">Target</Text>

        <Avatar
          src="https://unsplash.it/400"
          name="Test User"
          size="xl"
        ></Avatar>
        <div>
          <div
            css={css`
              margin: 1rem 0;
            `}
          >
            <Text variant="h4">Test User</Text>
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
                  <Button intent="danger">Yes, surrender.</Button>
                </div>
              </div>
            }
          >
            <Button intent="danger" iconAfter={<IconChevronDown />}>
              Surrender
            </Button>
          </Popover>
        </div>
        <Text>Total Players: {45}</Text>
        <Text>Players Remaining: {12}</Text>
      </div>
    </>
  );
};

export default Game;
