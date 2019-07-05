import React from "react";
import { IconArrowLeft, Button } from "sancho";
import css from "@emotion/css";
import { Link } from "gatsby";

const Back = ({ to }) => {
  return (
    <div
      css={css`
        position: fixed;
        left: 1rem;
        top: 1rem;
      `}
    >
      <Button
        variant="ghost"
        intent="primary"
        label="back"
        iconBefore={<IconArrowLeft></IconArrowLeft>}
        component={Link}
        to={to}
      >
        Back
      </Button>
    </div>
  );
};
export default Back;
