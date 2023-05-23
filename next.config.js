const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    domains: [
      'i.ibb.co',
      'source.unsplash.com',
      'unsplash.com',
      'images.unsplash.com',
      'i.ytimg.com',
      'images.timex.com',
      'www.vacheron-constantin.com',
      'atlas-content-cdn.pixelsquid.com',
      'd13o3tuo14g2wf.cloudfront.net',
      'icon2.cleanpng.com',
      'www.freepnglogos.com',
      'd13o3tuo14g2wf.cloudfront.net',
      'www.lg.com',
      'image-us.samsung.com',
      'nairobicomputershop.co.ke',
      'd13o3tuo14g2wf.cloudfront.net',
      'icon2.cleanpng.com',
      'www.freepnglogos.com',
      'd13o3tuo14g2wf.cloudfront.net',
      'www.lg.com',
      'image-us.samsung.com',
      'nairobicomputershop.co.ke',
      'e7.pngegg.com',
      'cdn.mos.cms.futurecdn.net'
    ]
  },
  experimental: {
    esmExternals: false

    // jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
