module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/register",
                destination: "/login"
            }
        ]
    }
}
