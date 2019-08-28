import React from "react"

export function useSubscribeToMore(subscribeToMore, subscription, config) {
  const s2m = React.useCallback(subscribeToMore, [])

  React.useEffect(() => {
    if (!config.skip) {
      const sub = s2m({ document: subscription, ...config })
      return () => sub()
    }
  }, [config, s2m, subscription])
}
