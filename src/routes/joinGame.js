import React from "react";
import { Text, InputGroup, Input, Button, useToast } from "sancho";
import Back from "../components/back";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import GAME from "../queries/game.graphql";
import GAMES from "../queries/games.graphql";
import JOIN_GAME from "../queries/joinGame.graphql";
import debounce from "../helpers/debounce";
import Loading from "../components/loading";
import { navigate } from "@reach/router";

const sendUpdate = debounce((code, client, setLoading, setData) => {
  setLoading(true);
  client.query({ query: GAME, variables: { code } }).then(res => {
    setLoading(false);
    if (res.data && res.data.game) {
      setData(res.data.game);
    }
  });
}, 1000);

const JoinGame = ({ back, location }) => {
  const [joinGame, { loading: joining }] = useMutation(JOIN_GAME, {
    refetchQueries: [{ query: GAMES }],
  });
  const toast = useToast();
  const urlParams = new URLSearchParams(location.search);
  const [code, setCode] = React.useState(urlParams.get("code"));
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const client = useApolloClient();

  React.useEffect(() => {
    if (code) sendUpdate(code, client, setLoading, setData);
  }, [code, client]);

  if (joining) {
    return <Loading label="Joining Game..." />;
  }
  return (
    <>
      {back && <Back to="/game" />}

      <Text variant="h3">Join Game</Text>
      <InputGroup label="Game Code">
        <Input
          required
          placeholder="shoe-backfire"
          value={code}
          onChange={e => {
            setCode(e.target.value);
            setData(null);
            setLoading(false);
          }}
        />
      </InputGroup>
      <Button
        intent="success"
        disabled={!(data && data.id)}
        onPress={() =>
          joinGame({ variables: { code } })
            .then(({ data: { joinGame: { id } } }) => navigate(`/game/${id}`))
            .catch(err => {
              toast({
                title: "Error joining game.",
                duration: 5000,
                subtitle: err.message.replace("GraphQL error: ", ""),
                intent: "danger",
              });
            })
        }
      >
        Join Game
      </Button>
      {loading && <Loading label="Getting game..." />}
      {data && (
        <>
          <Text variant="h4">Game Information</Text>
          <Text variant="h5">{data.name}</Text>
          <Text variant="body">{data.description}</Text>
        </>
      )}
    </>
  );
};

export default JoinGame;
