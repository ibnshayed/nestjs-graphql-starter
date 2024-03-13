export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  //   database: {
  //     host: process.env.DATABASE_HOST,
  //     port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  //   },
  jwt: {
    accessToken: {
      secret: 'kjadlksjoi3u4kla',
      expireIn: '1d',
    },
    refreshToken: {
      secret: 'kjadlksjoi3u4kla',
      expireIn: '1d',
    },
  },
});
