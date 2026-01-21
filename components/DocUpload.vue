<template>
    <UFileUpload v-model="selectedFile" label="Enviar" icon="i-lucide-upload" variant="button" color="neutral"
        class="w-full" />
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    userId: {
        type: Number,
        // required: true
    },
    partnerId: {
        type: Number,
        // required: true
    }
});

const selectedFile = ref(null);

const handleFileUpload = async () => {
    if (!selectedFile.value) {
        alert('Por favor, selecione um arquivo antes de enviar.');
        return;
    }

    if (!props.userId) {
        alert('ID do usuário não está definido.');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('user_id', props.userId);
    formData.append('partner_id', props.partnerId);
    formData.append('filename', generateUUID());

    try {
        const response = await $fetch(
            'https://webhook.lopevapp.com.br/webhook/b0dcbce8-23be-4258-ada4-2aa962ce5e82',
            {
                method: 'POST',
                body: formData
            }
        );
        alert('Arquivo enviado com sucesso!');
        console.log(response);
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
        alert('Erro ao enviar o arquivo. Tente novamente.');
    }
};

// Função para gerar UUID simples no client-side
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Observa mudanças no arquivo selecionado e dispara o upload automaticamente
watch(selectedFile, (newFile) => {
    if (newFile) {
        handleFileUpload();
    }
});
</script>

<style scoped>

    /* Adiciona estilos para garantir que o botão seja clicável */
    .w-full {
        display: block;
        cursor: pointer;
    }
</style>
