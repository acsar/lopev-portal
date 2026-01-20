<template>
    <button class="chat-button" @click="toggleChat">
        💬
    </button>

    <div class="chat-overlay" @click.self="open = false">
        <div class="chat-container">
            <deep-chat v-if="isLoaded" :connect="connect" :requestInterceptor="requestInterceptor" :textInput="{
                placeholder: { text: 'Descreva seus sintomas...' }
            }" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)
const open = ref(false)

const connect = {
    url: 'https://bot.lopevapp.com.br/agents/orientador-triagem/runs',
    method: 'POST',
    headers: {
        accept: 'application/json'
    }
}

const requestInterceptor = (requestDetails) => {
    const formData = new FormData();

    // Pegando o texto da última mensagem enviada pelo usuário
    const messageText = requestDetails.body?.messages?.[0]?.text || "";

    // Montando EXATAMENTE como o Agno espera (Body Form Data)
    formData.append('message', messageText);
    formData.append('stream', 'false');
    formData.append('user_id', '7');

    // Se houver arquivos, o Agno espera que sejam enviados individualmente
    if (requestDetails.body?.files) {
        requestDetails.body.files.forEach((file) => {
            formData.append('files', file);
        });
    }

    return {
        url: requestDetails.url,
        method: 'POST',
        body: formData, // O navegador cuidará do Boundary e do Content-Type
        headers: {
            'accept': 'application/json'
            // REMOVEMOS o 'content-type': 'application/json' que o Deep Chat injeta por padrão
        }
    };
}

onMounted(async () => {
    if (process.client) {
        await import('deep-chat')
        isLoaded.value = true
    }
})
</script>

<style scoped>
    .chat-button {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: none;
        font-size: 24px;
        cursor: pointer;
        background: #111827;
        color: white;
    }

    .chat-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 24px;
    }

    .chat-container {
        width: 380px;
        height: 520px;
        background: white;
        border-radius: 14px;
        overflow: hidden;
    }
</style>
