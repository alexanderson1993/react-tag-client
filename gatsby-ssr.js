/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import wrapWithProvider from "./src/wrapRootElement";
export const wrapRootElement = wrapWithProvider({ ssr: true });
