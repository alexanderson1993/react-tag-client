/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import "./layout.css";
import {
  DarkMode,
  LightMode,
  Container,
  useTheme,
  IconButton,
  IconSun,
  IconMoon,
} from "sancho";
import css from "@emotion/css";
import { Global } from "@emotion/core";
import useDarkMode from "../hooks/useDarkMode";
import Profile from "./profile";

const Theme = ({ children }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  const ThemeMode = darkMode ? DarkMode : LightMode;
  return (
    <ThemeMode>
      <>
        <Layout>{children}</Layout>
        <IconButton
          variant="ghost"
          intent="primary"
          icon={darkMode ? <IconSun /> : <IconMoon></IconMoon>}
          label="Menu"
          onClick={() => setDarkMode(!darkMode)}
          css={css`
            position: fixed;
            right: 20px;
            bottom: 20px;
          `}
        />
      </>
    </ThemeMode>
  );
};
const Layout = ({ children }) => {
  const theme = useTheme();
  return (
    <Container>
      <Global
        styles={css`
          body {
            transition: all 0.5s ease;
            background-color: ${theme.colors.background.default};
            color: ${theme.colors.text.default};
            font-family: ${theme.fonts.base};
            font-size: ${theme.fontSizes[2]};
            line-height: ${theme.lineHeights.body};
            a {
              color: ${theme.colors.text.selected};
            }
          }
        `}
      ></Global>
      <Profile />
      <div
        css={css`
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: 5rem;
        `}
      >
        <main
          css={css`
            flex: 1;
          `}
        >
          {children}
        </main>
        <footer
          css={css`
            text-align: center;
          `}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
