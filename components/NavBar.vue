<template>
    <header class="border-b border-gray-200 bg-[#0f3e35] sticky top-0 z-50">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">

            <NuxtLink to="/" class="flex items-center gap-2">
                <img src="/logo_white.png" alt="Lopev Logo" class="h-10 brightness-0 invert" />
                <div class="flex flex-col">
                    <span class="text-lg font-bold text-white">HISTÓRICO SAÚDE</span>
                    <span class="text-sm text-[#d8d3e7]">Sua Saúde, seu tempo, seu jeito</span>
                </div>
            </NuxtLink>

            <div class="flex items-center gap-4">

                <UButton v-if="false" icon="i-lucide-user-circle" label="Meu Perfil" variant="ghost" color="neutral" />

                <UButton @click="handleLogout" icon="i-lucide-log-out" variant="link" class="text-white">Sair</UButton>
                <!-- <UButton icon="i-lucide-log-out" color="error" variant="subtle" class="rounded-full"
                     /> -->
            </div>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
    console.log('Logout clicado');
    // Clear user data from localStorage
    localStorage.removeItem('userData')

    // Redirect to login page
    router.push('/auth/login')
}
</script>