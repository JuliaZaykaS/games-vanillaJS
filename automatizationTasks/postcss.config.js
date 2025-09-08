module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 4 version", "> 0.3%"],
      grid: "autoplace",
      //   flexbox: "no-2009",
    }),
  ],
};
