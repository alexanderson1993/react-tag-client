import React from "react";
import {
  Layer,
  List,
  ListItem,
  Button,
  ListSection,
  IconChevronRight,
} from "sancho";
import { Link } from "gatsby";
import css from "@emotion/css";
import { useQuery } from "@apollo/react-hooks";

import GAMES from "../queries/games.graphql";
import GAMES_SUB from "../queries/gameListSub.graphql";
import Loading from "./loading";
import { useSubscribeToMore } from "../hooks/useSubscribeToMore";
import { useAuth } from "../context/AuthContext";

const GameList = () => {
  const { data, loading, error, subscribeToMore } = useQuery(GAMES);
  const { user } = useAuth();
  const config = React.useMemo(
    () => ({
      updateQuery: (previousResult, { subscriptionData }) => {
        return previousResult.games.map(g => {
          if (g.id === subscriptionData.data.gameUpdate.id) {
            return subscriptionData.data.gameUpdate;
          }
          return g;
        });
      },
    }),
    [user.uid]
  );
  useSubscribeToMore(subscribeToMore, GAMES_SUB, config);
  if (error) throw new Error(error);
  const { games = [] } = data;
  const activeGames = games.filter(g => !g.completed);
  const completedGames = games.filter(g => g.completed);
  return (
    <div>
      <h2>Current Games</h2>
      <Layer elevation="sm">
        {loading ? (
          <Loading label="Loading game list..."></Loading>
        ) : (
          <List
            css={css`
              max-height: calc(100vh - 282px);
              overflow-y: auto;
            `}
          >
            <ListSection title="Active Games">
              {activeGames.length === 0 ? (
                <ListItem
                  interactive={false}
                  primary="No Active Games"
                ></ListItem>
              ) : (
                activeGames.map(g => (
                  <ListItem
                    component={Link}
                    to={`/game/${g.id}`}
                    key={g.id}
                    primary={g.name}
                    secondary={g.description}
                    contentAfter={<IconChevronRight />}
                    wrap={false}
                  ></ListItem>
                ))
              )}
            </ListSection>
            <ListSection title="Completed Games">
              {completedGames.length === 0 ? (
                <ListItem
                  interactive={false}
                  primary="No Completed Games"
                ></ListItem>
              ) : (
                completedGames.map(g => (
                  <ListItem
                    component={Link}
                    to={`/game/${g.id}`}
                    key={g.id}
                    primary={g.name}
                    secondary={g.description}
                    contentAfter={<IconChevronRight />}
                    wrap={false}
                  ></ListItem>
                ))
              )}
            </ListSection>
          </List>
        )}
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
