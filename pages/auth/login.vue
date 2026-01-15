<template>
    <section class="herosss is-fullheight is-flex is-align-items-center">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-4">
                    <div class="box">
                        <h1 class="title has-text-centered">Login</h1>
                        <form @submit.prevent="handleLogin">
                            <p v-if="errorMessage" class="notification is-danger is-light">{{ errorMessage }}</p>
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input v-model="email" class="input" type="email" placeholder="Digite seu email"
                                        required />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Senha</label>
                                <div class="control has-icons-left">
                                    <input v-model="password" class="input" type="password"
                                        placeholder="Digite sua senha" required />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <button class="button is-primary is-fullwidth" :class="{ 'is-loading': isLoading }"
                                    :disabled="isLoading">
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

<style scoped>
    .hero {
        background-color: #f5f5f5;
    }
</style>