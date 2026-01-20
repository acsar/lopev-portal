<template>
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">

            <NuxtLink to="/" class="flex items-center gap-2">
                <img src="/logo_white.png" alt="Lopev Logo" class="h-10 w-10" />
                <span class="text-lg font-bold text-[--ui-primary]">PORTAL DO PACIENTE</span>
            </NuxtLink>

            <div class="flex items-center gap-4">

                <UButton v-if="false" icon="i-lucide-user-circle" label="Meu Perfil" variant="ghost" color="neutral" />

                <UButton icon="i-lucide-log-out" color="error" variant="subtle" class="rounded-full"
                    @click="handleLogout" />
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