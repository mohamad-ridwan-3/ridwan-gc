/** @type {import('next').NextConfig} */
module.exports = {
  // basePath: "/store",
  // assetPrefix: "https://api.ezbix.com/store",
  images: {
    domains: [
      "pps.whatsapp.net",
      "s3-ap-southeast-1.amazonaws.com",
      "new-client.realm.chat",
      "assets.komers.io"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ]
  },
}
