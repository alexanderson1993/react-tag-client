import React, { Component } from "react";
import styled from "@emotion/styled";
import { Button } from "sancho";
import { ErrorContext } from "../context/ErrorContext";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default class ErrorBoundary extends Component {
  static contextType = ErrorContext
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.context.dispatch({ type: "errored", errorData: error, errorInfo });
  }
  refresh() {
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.reload();
    }
  }
  render() {
    if (this.context.state.error) {
      // Error path
      if (this.props.render) return this.props.render;
      return (
        <div className="error-boundary">
          <Container>
            <h2>Error in React Tag.</h2>
            <Button onPress={this.refresh}>Refresh</Button>

            <h3>
              If you know what you are looking for, you can check out what went
              wrong.
            </h3>
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.context.state.errorData &&
                this.context.state.errorData.toString()}
              <br />
              {this.context.state.errorInfo.componentStack}
            </details>
          </Container>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
