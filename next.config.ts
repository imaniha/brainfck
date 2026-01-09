import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['tamagui', 'react-native-web'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    return config
  },
  turbopack: {
    resolveAlias: {
      'react-native$': 'react-native-web',
    },
  },
};

export default nextConfig;
