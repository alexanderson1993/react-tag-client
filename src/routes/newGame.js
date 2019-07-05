import React from "react";
import css from "@emotion/css";
import { InputGroup, Input, TextArea, Button } from "sancho";
import Back from "../components/back";

const NewGame = ({ back }) => {
  const submit = () => {};
  return (
    <>
      {back && <Back to="/game" />}
      <h1>New Game</h1>
      <div
        css={css`
          max-width: 350px;
        `}
      >
        <form onSubmit={submit}>
          <InputGroup label="Game Name">
            <Input placeholder="The Showdown" />
          </InputGroup>
          <InputGroup
            label="Instructions"
            helpText="Include specific instructions so your players know what the rules of your game are, including how to eliminate other players."
          >
            <TextArea placeholder="Work hard, play hard. Use a spoon to gently poke your target to eliminate them." />
          </InputGroup>
          <Button type="submit" intent="success">
            Create Game
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewGame;
