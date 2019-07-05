import React from "react";
import { Layer, List, ListItem, Button, ListSection } from "sancho";
import { Link } from "gatsby";
import css from "@emotion/css";

const GameList = () => {
  return (
    <div>
      <h2>Current Games</h2>
      <Layer elevation="sm">
        <List
          css={css`
            max-height: calc(100vh - 282px);
            overflow-y: auto;
          `}
        >
          <ListSection title="Active Games">
            <ListItem interactive={false} primary="No Active Games"></ListItem>
          </ListSection>
          <ListSection title="Completed Games">
            <ListItem
              interactive={false}
              primary="No Completed Games"
            ></ListItem>
          </ListSection>
        </List>
      </Layer>
      <Button
        block
        intent="success"
        component={Link}
        to="/game/new"
        style={{ marginTop: "1rem" }}
      >
        New Game
      </Button>
      <Button
        block
        intent="none"
        component={Link}
        to="/game/join"
        style={{ marginTop: "1rem" }}
      >
        Join Game
      </Button>
    </div>
  );
};
export default GameList;
