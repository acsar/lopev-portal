<template>
    <UCard :ui="{
        base: 'relative overflow-hidden',
        background: 'bg-linear-to-br from-[--ui-primary] to-blue-800',
        ring: 'ring-0',
        rounded: 'rounded-xl',
        body: { padding: 'p-0' }
    }">
        <UIcon name="i-lucide-hospital"
            class="absolute -right-8 -bottom-8 w-64 h-64 text-white/5 transform -rotate-12" />

        <div class="relative flex flex-col sm:flex-row sm:items-center gap-6">
            <div class="hidden sm:flex shrink-0">
                <UAvatar icon="i-lucide-user" size="xl" :ui="{
                    background: 'bg-white/20',
                    icon: { base: 'text-white' },
                    rounded: 'rounded-lg'
                }" />
            </div>

            <div class="flex-1">
                <!-- <div class="flex items-center gap-2 mb-1">
                    <UIcon name="i-lucide-shield-check" class="medical-dark w-4 h-4" />
                    <span class="medical-dark text-xs font-medium uppercase tracking-wider">
                        Área Restrita do Paciente
                    </span>
                </div> -->

                <h1 class="text-2xl font-semibold medical-dark tracking-tight">
                    Olá, {{ userData.name }}, Bem-vindo ao seu Portal
                </h1>

                <p class="mt-2 medical-dark text-sm md:text-base leading-relaxed max-w-2xl">
                    Envie e acompanhe seus exames e agendamentos de forma simplificada.
                </p>
            </div>

            <!-- <div class="shrink-0 flex items-center">
                    <UButton label="Ver meus exames" icon="i-lucide-file-text" size="md" color="neutral" variant="solid"
                        class="bg-white text-blue-700 hover:bg-blue-50" />
                </div> -->
        </div>
    </UCard>
</template>

<script setup>
// Exemplo de recebimento de props ou busca de dados
defineProps({
    userData: {
        type: Object,
        default: () => ({ name: 'Paciente' })
    }
})
</script>