module.exports = {
  typescript: {
    enableTypeChecking: false
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