<template>
    <UCard :ui="{ body: { padding: 'p-0' } }">
        <template #header>
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-list" class="w-5 h-5 text-[#002d1e]" />
                <h3 class="font-semibold text-[#002d1e]">Registre seu histórico</h3>
            </div>
        </template>

        <!-- <div ref="messagesContainer" class="h-[300px] overflow-y-auto p-4 bg-gray-50/50 flex flex-col gap-4 w-full"> -->
        <div ref="messagesContainer"
            class="h-[300px] overflow-y-auto p-4 bg-gray-50/50 flex flex-col gap-4 w-full scroll-smooth">
            <div v-for="message in messages" :key="message.id" class="flex w-full"
                :class="message.sender === 'bot' ? 'justify-start' : 'justify-end'">
                <div class="max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm" :class="message.sender === 'bot'
                    ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    : 'bg-primary-500 text-white rounded-tr-none'">
                    <span v-html="message.text"></span>
                </div>
            </div>

            <!-- Indicador de digitação -->
            <div v-if="isTyping" class="flex w-full justify-start">
                <div
                    class="max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm bg-white text-gray-800 rounded-tl-none border border-gray-100">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>

        <template #footer>
            <div class="flex flex-col gap-2">
                <div class="flex items-end gap-2">
                    <UTextarea v-model="userMessage" placeholder="Digite sua mensagem..." :rows="1" autoresize
                        class="flex-1" @keyup.enter.exact.prevent="sendMessage" />

                    <div class="flex gap-1">
                        <UButton icon="i-lucide-send" color="primary" variant="soft"
                            :disabled="!userMessage.trim() && !file" @click="sendMessage" />
                        <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />
                        <UButton icon="i-lucide-upload" label="Anexar arquivo" color="primary" variant="soft"
                            @click="triggerFileUpload" />
                    </div>
                </div>

                <div v-if="file" class="flex items-center gap-2">
                    <UBadge color="neutral" variant="subtle" closable @close="file = null">
                        {{ file.name }}
                    </UBadge>
                </div>
            </div>
        </template>
    </UCard>
</template>

<script setup>
import { nextTick, watch, ref } from 'vue';
import { usePusher } from '@/composables/usePusher';

const props = defineProps({
    userId: Number,
    partnerId: Number
});

const userMessage = ref('');
const file = ref(null);
const fileInput = ref(null); // Referência para o input HTML
const isTyping = ref(false); // Novo estado para controlar a digitação
const messagesContainer = ref(null);

// Usando o composable usePusher
const { messages } = usePusher(props.userId);

// Add the `emit` function from `defineEmits` to enable event emission
const emit = defineEmits(['refresh-timeline']);

// Abre a janela de seleção de arquivo
const triggerFileUpload = () => {
    fileInput.value.click();
};

// Captura o arquivo selecionado
const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        file.value = selectedFile;
        sendFile();
    }
};

const sendMessage = async () => {
    if (!userMessage.value.trim() && !file.value) return;

    const formData = new FormData();
    formData.append("user_id", props.userId);
    formData.append("partner_id", props.partnerId);
    formData.append('date', new Date().toISOString().split('T')[0]);
    formData.append('text', userMessage.value);

    try {
        messages.value.push({
            id: Date.now(),
            text: userMessage.value,
            sender: 'user',
        });

        await nextTick();
        scrollToBottom();

        userMessage.value = '';

        isTyping.value = true;

        const response = await fetch('https://n8n.lopevapp.com.br/webhook/b0dcbce8-23be-4258-ada4-2aa962ce5e82', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        setTimeout(async () => {
            isTyping.value = false;
            messages.value.push({
                id: Date.now(),
                text: data.text,
                sender: 'bot',
            });

            await nextTick();
            scrollToBottom();

            // Emitir evento para o componente pai
            emit('refresh-timeline');
        }, 2000);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};

const sendFile = async () => {
    if (!file.value) return;

    const formData = new FormData();
    formData.append("user_id", props.userId);
    formData.append("partner_id", props.partnerId);
    formData.append('filename', generateUniqueFileName());
    formData.append('file', file.value);

    try {
        messages.value.push({
            id: Date.now(),
            text: `Documento enviado: ${file.value.name}`,
            sender: 'user',
        });

        await nextTick();
        scrollToBottom();

        file.value = null;

        isTyping.value = true;

        const response = await fetch('https://n8n.lopevapp.com.br/webhook/b0dcbce8-23be-4258-ada4-2aa962ce5e82', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        setTimeout(async () => {
            isTyping.value = false;
            messages.value.push({
                id: Date.now(),
                text: data.text,
                sender: 'bot',
            });

            await nextTick();
            scrollToBottom();

            // Emitir evento para o componente pai
            emit('refresh-timeline');
        }, 2000);
    } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
    }
};

// Gera um nome de arquivo único
function generateUniqueFileName() {
    const timestamp = Date.now(); // Obtém o timestamp atual
    const randomPart = Math.random().toString(36).substring(2, 15); // Gera uma string aleatória
    return `file_${timestamp}_${randomPart}`;
}

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
};

// Observa mudanças profundas no array e também o estado de digitação
watch([messages, isTyping], async () => {
    await nextTick();
    scrollToBottom();
}, { deep: true });


</script>

<style scoped>

    .typing-indicator {
        display: flex;
        gap: 4px;
    }

    .typing-indicator span {
        width: 6px;
        height: 6px;
        background-color: #ccc;
        border-radius: 50%;
        animation: blink 1.5s infinite;
    }

    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes blink {

        0%,
        100% {
            opacity: 0.2;
        }

        50% {
            opacity: 1;
        }
    }
</style>