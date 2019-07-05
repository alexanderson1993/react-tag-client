import React from "react";
import Back from "../components/back";
import css from "@emotion/css";
import {
  Text,
  Avatar,
  Button,
  IconChevronDown,
  Popover,
  useToast,
} from "sancho";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import GAME from "../queries/game.graphql";
import GAME_SUB from "../queries/gameSub.graphql";
import START_GAME from "../queries/startGame.graphql";
import SURRENDER from "../queries/surrender.graphql";
import Loading from "../components/loading";
import { useAuth } from "../context/AuthContext";
import useQrCode from "react-qrcode-hook";
import NOTIFICATION from "../queries/notification.graphql";
import { useSubscribeToMore } from "../hooks/useSubscribeToMore";

const Target = ({ gameId, displayName, photoURL }) => {
  const [surrender, { loading }] = useMutation(SURRENDER, {
    variables: { gameId },
  });
  if (loading) return <Loading label="Surrendering..." />;
  return (
    <>
      <Text variant="h3">Target</Text>

      <Avatar src={photoURL} name={displayName} size="xl"></Avatar>
      <div>
        <div
          css={css`
            margin: 1rem 0;
          `}
        >
          <Text variant="h4">{displayName}</Text>
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
  );
};

const GameInfo = ({ id, name, description, code, owner, playerCount }) => {
  const [startGame, { loading }] = useMutation(START_GAME, {
    variables: { gameId: id },
  });
  const { user } = useAuth();
  const qrCode = useQrCode(`https://react-tag.com/game/join?code=${code}`);

  if (loading) return <Loading label="Starting game..." />;
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

      {owner.id !== user.uid ? (
        <Text variant="h4">Owner: {owner.displayName}</Text>
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
  );
};

function useNotification() {
  const toast = useToast();
  const { data } = useSubscription(NOTIFICATION);
  React.useEffect(() => {
    if (data) {
      toast({
        title: data.notification,
        position: "top-right",
      });
    }
  }, [data]);
}

const Game = ({ back, gameId }) => {
  const { data, loading, error, subscribeToMore } = useQuery(GAME, {
    variables: { gameId },
    skip: !gameId,
  });
  const config = React.useMemo(
    () => ({
      variables: { gameId },
      updateQuery: (previousResult, { subscriptionData }) => {
        return { game: subscriptionData.data.gameUpdate };
      },
    }),
    [gameId]
  );
  useSubscribeToMore(subscribeToMore, GAME_SUB, config);

  useNotification();
  if (!gameId) return null;
  if (loading) return <Loading label="Loading game information..."></Loading>;
  if (error) throw new Error(error);

  const { game } = data;
  if (!game) throw new Error("Error loading game data.");
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
            <Avatar size="xl" src={game.winner.photoURL} />{" "}
            {game.winner.displayName}
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
          <Target gameId={game.id} {...game.me.target.user} />
        )}
        {!game.started && <GameInfo {...game} />}
        <Text>Total Players: {game.playerCount}</Text>
        <Text>Players Remaining: {game.aliveCount}</Text>
      </div>
    </>
  );
};

export default Game;
