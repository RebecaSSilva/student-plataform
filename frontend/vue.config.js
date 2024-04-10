module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      const flags = args[0] || {};
      flags['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = true;
      return [flags];
    });
  },
};
