/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',  // Quando o usuário acessar o domínio raiz
                destination: '/index.html',  // Redireciona para index.html
                permanent: true,  // Redirecionamento permanente (301)
            },
        ]
    },
}

export default nextConfig;