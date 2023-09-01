module.exports = {
  async rewrites() {
    return [
      {
        source: "/memos/:query*",
        destination: "http://localhost:3001/memos/:query*",
      },
    ];
  },
};
