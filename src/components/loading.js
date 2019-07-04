import React from "react";
import { Spinner } from "sancho";

const Loading = ({ label, size = "xl" }) => (
  <Spinner size={size} label={label} center />
);

export default Loading;
