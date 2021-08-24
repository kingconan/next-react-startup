module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/quality_platform/home',
        permanent: true,
      }
    ]
  }
}
