module.exports = {
    reactStrictMode: true, async rewrites() {
        return [{
            source: "/api/:path*", destination: process.env.NEXT_PUBLIC_SERVER_URL + "/:path*",
        }]
    }
}
