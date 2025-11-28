module.exports = {
  typescript: {
    enableTypeChecking: false
  },
  devServer: (devServerConfig) => {
    // webpack-dev-server v5 compatibility patch for react-scripts 5.0.1
    // Several options were renamed or restructured in v5:
    // - onBeforeSetupMiddleware/onAfterSetupMiddleware -> setupMiddlewares
    // - https -> server
    const {
      onBeforeSetupMiddleware,
      onAfterSetupMiddleware,
      https,
      ...rest
    } = devServerConfig;

    const config = {
      ...rest,
      setupMiddlewares: (middlewares, devServer) => {
        if (onBeforeSetupMiddleware) {
          onBeforeSetupMiddleware(devServer);
        }
        if (onAfterSetupMiddleware) {
          onAfterSetupMiddleware(devServer);
        }
        return middlewares;
      },
    };

    // Convert https option to server option if present
    if (https) {
      config.server = {
        type: 'https',
        options: typeof https === 'object' ? https : {},
      };
    }

    return config;
  },
  webpack: {
    configure: (webpackConfig, { env }) => {
      // Handle ESM/CommonJS issues for development
      if (env === 'development') {
        webpackConfig.module.rules.push({
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        });

        // Ignore TypeScript errors for problematic modules in dev mode
        webpackConfig.ignoreWarnings = [
          {
            module: /echarts-for-react/,
          },
          {
            module: /react-csv/,
          },
        ];
      }

      return webpackConfig;
    },
  },
};