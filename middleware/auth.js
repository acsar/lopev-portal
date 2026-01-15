export default defineNuxtRouteMiddleware((to, from) => {
    const userData = localStorage.getItem('userData'); // Verifica se os dados do usuário estão armazenados
    if (!userData) {
        return navigateTo('/auth/login'); // Redireciona para a página de login se não estiver autenticado
    }
});