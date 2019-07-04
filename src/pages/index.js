import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import css from "@emotion/css";
import { Button } from "sancho";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 75vh;
          `}
        >
          <h1
            css={css`
              text-align: center;
            `}
          >
            React Tag
          </h1>
          <Button
            variant="outline"
            intent="primary"
            component={Link}
            to="/login"
          >
            Sign In to Play
          </Button>
        </div>

        <p>
          React Tag is a live-action game based off of Assassin. The objective:{" "}
          <strong>eliminate your target; stay alive</strong>.
        </p>

        <p>
          Several players (more than 5 is best) join the game. The app takes
          their contact info and assigns each player a target from the pool of
          the players in the game. Players must then track down and eliminate
          their target. The elimination method is specified for each game.
          Possible elimination options include photographing the target, gently
          prodding with a spoon, or planting a device, like an alarm or rubber
          snake, which eliminates players when found or activated.
        </p>
      </div>
      <div>
        <h2>Instructions</h2>

        <ul>
          <li>Sign in with your social account</li>
          <li>Get the game code or link from the game owner</li>
          <li>Wait until the game's start time</li>
          <li>Follow the game rules to eliminate your target</li>
          <li>
            When you find your target, type in their secret code or make them
            surrender
          </li>
          <li>Repeat with the target of the eliminated player</li>
          <li>Survive</li>
        </ul>
        <p>The game ends when one player remains.</p>

        <p>Can you survive? Or will you be eliminated?</p>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
