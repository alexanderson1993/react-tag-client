import React, { Suspense } from "react";
import Loading from "./components/loading";
import ErrorBoundary from "./helpers/errorBoundary";
import GraphQL from "./helpers/graphqlClient";
import AuthProvider from "./context/AuthContext";
import ErrorProvider from "./context/ErrorContext";

// eslint-disable-next-line react/display-name,react/prop-types
export default (input = {}) => data => {
  const { ssr } = input;
  const { element } = data;
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return (
    <AuthProvider>
      <GraphQL>
        <ErrorProvider>
          <ErrorBoundary>
            {ssr ? (
              element
            ) : (
              <Suspense fallback={<Loading label="Loading Page..." />}>
                {element}
              </Suspense>
            )}
          </ErrorBoundary>
        </ErrorProvider>
      </GraphQL>
    </AuthProvider>
  );
};
