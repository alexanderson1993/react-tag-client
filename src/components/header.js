import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Navbar, Toolbar, Text } from "sancho";
import css from "@emotion/css/macro";

const Header = ({ siteTitle }) => (
  <header
    css={css`
      height: 70px;
    `}
  >
    <Navbar>
      <Toolbar>
        <Link
          to="/"
          style={{
            textDecoration: `none`,
          }}
        >
          <Text variant="h1">{siteTitle}</Text>
        </Link>
      </Toolbar>
    </Navbar>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
