<template>
    <main class="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <div class="w-full max-w-md">

            <div class="flex flex-col items-center mb-8">
                <img src="/logo_white.png" alt="Lopev Logo" class="h-16 w-16 mb-2 invert brightness-0" />
                <h2 class="text-xl font-bold text-[#002d1e] tracking-tight">Portal do Paciente</h2>
            </div>

            <UCard :ui="{
                body: { padding: 'p-6 sm:p-10' },
                ring: 'ring-1 ring-gray-200',
                shadow: 'shadow-xl',
                rounded: 'rounded-2xl'
            }">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-[#002d1e] text-center">Login</h1>
                    <p class="text-gray-500 text-center text-sm mt-1">Acesse seus exames e histórico</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6">

                    <UAlert v-if="errorMessage" icon="i-lucide-alert-circle" color="error" variant="subtle"
                        title="Erro no acesso" :description="errorMessage" class="mb-4" />

                    <UFormField label="E-mail" name="email" required>
                        <UInput v-model="email" type="email" placeholder="Digite seu e-mail" icon="i-lucide-envelope"
                            size="lg" class="w-full" />
                    </UFormField>

                    <UFormField label="Senha" name="password" required>
                        <UInput v-model="password" type="password" placeholder="Digite sua senha" icon="i-lucide-lock"
                            size="lg" class="w-full" />
                    </UFormField>

                    <UButton type="submit" size="lg" block :loading="isLoading" :disabled="isLoading"
                        class="bg-[#002d1e] hover:bg-[#003d2a] text-white font-semibold transition-all py-3">
                        Entrar
                    </UButton>

                    <div class="text-center mt-4">
                        <UButton variant="link" color="neutral" size="xs" label="Esqueceu sua senha?"
                            class="text-gray-500 hover:text-[#002d1e]" />
                    </div>
                </form>
            </UCard>

            <p class="text-center text-xs text-gray-400 mt-8 uppercase tracking-widest">
                Sistema Seguro & Criptografado
            </p>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Mantendo suas variáveis originais
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const router = useRouter()

async function handleLogin() {
    errorMessage.value = '' // Limpa mensagens de erro
    isLoading.value = true // Ativa o loading

    try {
        const response = await fetch('https://webhook.lopevapp.com.br/webhook/a16d47df-7532-4f38-8386-b02d30943793', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email.value, password: password.value })
        })

        const data = await response.json()
        console.log('Resposta do servidor:', data.success)
        console.log('Dados do usuário:', data.data)
        if (data.success === true) {
            // Login bem-sucedido, armazena os dados do usuário
            localStorage.setItem('userData', JSON.stringify(data.data))
            router.push('/') // Redireciona para a página inicial
        } else {
            // Login falhou
            errorMessage.value = 'Email ou senha inválidos.'
            setTimeout(() => errorMessage.value = '', 2000) // Remove o alerta após 2 segundos
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error)
        errorMessage.value = 'Login invalido!'
        setTimeout(() => errorMessage.value = '', 2000) // Remove o alerta após 2 segundos
    } finally {
        isLoading.value = false // Desativa o loading
    }
}
</script>