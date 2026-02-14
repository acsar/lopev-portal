<template>
    <div class="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4 font-['Inter']">
        <div
            class="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col items-center p-8 text-center animate-fade-in group">

            <!-- Logo Container (consistent with NavBar) -->
            <div class="mb-10 flex items-center gap-3">
                <div
                    class="p-3 bg-[#0f3e35] rounded-xl shadow-lg transition-transform duration-500 group-hover:rotate-3">
                    <img src="/logo_white.png" alt="Lopev Logo" class="h-12 w-auto brightness-0 invert" />
                </div>
                <div class="flex flex-col text-left">
                    <span class="text-xl font-black text-[#0f3e35] tracking-tight text-nowrap">HISTÓRICO SAÚDE</span>
                    <!-- <span class="text-xs text-[#a18cc0] font-medium uppercase tracking-widest">Lopev Health
                        Platform</span> -->
                </div>
            </div>

            <!-- Icon Warning -->
            <div class="mb-8 relative">
                <div class="absolute inset-0 bg-red-100 rounded-full scale-150 opacity-20 animate-pulse"></div>
                <div
                    class="relative flex items-center justify-center w-20 h-20 bg-white rounded-full text-red-500 shadow-inner border border-red-50">
                    <i class="fa-solid fa-user-lock text-4xl"></i>
                </div>
            </div>

            <!-- Content -->
            <div class="space-y-4 mb-10">
                <h1 class="text-3xl font-bold text-[#0f3e35] tracking-tight">Caro cliente!</h1>
                <div
                    class="inline-block px-4 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-bold uppercase tracking-wide border border-red-100">
                    Sua conta está inativa
                </div>

                <p class="text-gray-600 mt-6 leading-relaxed text-lg text-pretty">
                    Entre em contato com nosso suporte agora mesmo. <br />
                    <span class="font-semibold text-gray-800">Não perca a oportunidade de cuidar da sua saúde com
                        praticidade e confiança.</span>
                </p>
            </div>

            <!-- Contact Section -->
            <div class="w-full space-y-2">
                <a href="https://wa.me/553235120280" target="_blank"
                    class="flex items-center justify-center gap-3 bg-[#0f3e35] hover:bg-[#1a5a4e] text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-[#0f3e35]/20 w-full">
                    <i class="fa-brands fa-whatsapp text-2xl"></i>
                    <div class="flex flex-col items-start leading-tight">
                        <span class="text-xs opacity-80 font-normal uppercase tracking-wider">Telefone / WhatsApp</span>
                        <span class="text-xl">(32) 3512-0280</span>
                    </div>
                </a>
            </div>

            <!-- Footer / Slogan -->
            <div class="mt-2 pt-2 border-t border-gray-100 w-full text-pretty">
                <p class="text-[#0f3e35] font-bold text-sm tracking-wide">
                    Lopev — <span class="text-[#a18cc0]">Sua saúde</span>, <span class="text-[#a18cc0]">Seu
                        tempo</span>, <span class="text-[#a18cc0]">Seu jeito</span>.
                </p>
            </div>

            <!-- User management -->
            <!-- <button @click="handleLogout"
                class="mt-8 text-sm font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
                <i class="fa-solid fa-arrow-left-long"></i>
                Sair e tentar outra conta
            </button> -->
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
    if (process.client) {
        localStorage.removeItem('userData')
        router.push('/auth/login')
    }
}

definePageMeta({
    layout: false
})
</script>

<style scoped>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
</style>
