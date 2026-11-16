export default ({ config }) => {
  return {
    ...config,
    android: {
      ...config.android,
      config: {
        ...config.android?.config,
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_FB_API_KEY || "AIzaSyCoMXn15b_aSB2SP48vBk0hSKTBVnYnM8k"
        }
      }
    }
  };
};