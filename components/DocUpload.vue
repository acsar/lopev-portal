<template>
    <div class="box box-hover has-text-centered">
        <span class="icon is-large has-text-info">
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
import { ref, defineProps } from 'vue';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    userId: {
        type: String,
        required: true
    },
    partnerId: {
        type: String,
        required: true
    }
});

const selectedFile = ref(null);
const handleFileChange = (event) => {
    selectedFile.value = event.target.files[0];
    uploadFile();
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
    formData.append('filename', uuidv4());

    try {
        const response = await axios.post(
            'https://webhook.lopevapp.com.br/webhook/b0dcbce8-23be-4258-ada4-2aa962ce5e82',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        alert('Arquivo enviado com sucesso!');
        console.log(response.data);
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
        alert('Erro ao enviar o arquivo. Tente novamente.');
    }
};
</script>