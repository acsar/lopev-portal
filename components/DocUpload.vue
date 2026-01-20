<template>
    <div class="box box-hover has-text-centered">
        <span class="icon is-large">
            <i class="fas fa-2x fa-file-upload"></i>
        </span>
        <p class="title is-5 mt-3">Exames</p>
        <div class="file">
            <button @click="uploadFile" :disabled="!selectedFile"
                class="button is-info is-light is-fullwidth is-rounded">Enviar</button>
            <input @change="handleFileChange" class="file-input" type="file" name="resume">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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
const handleFileChange = (event) => {
    selectedFile.value = event.target.files[0];
    uploadFile();
};

// Função para gerar UUID simples no client-side
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const uploadFile = async () => {
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
</script>

<style scoped></style>
