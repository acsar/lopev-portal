<template>
    <div>
        <header class="card-header is-shadowless">
            <p class="card-header-title">
                <span class="icon mr-2"><i class="fas fa-history text-medical-blue"></i></span>
                Histórico de Documentos
            </p>
        </header>
        <div class="mb-4">
            <PerfectScrollbar>
                <div class="card-content">
                    <div class="medical-timeline">
                        <div class="timeline-item" v-for="(item, index) in timeline" :key="index">
                            <p class="is-size-7 has-text-grey">{{ item.date }}</p>
                            <p class="has-text-weight-bold">{{ item.doc_type }}</p>
                            <div class="notification is-light py-2 px-3 mt-2 is-size-6">
                                {{ item.analysis }}
                            </div>
                            <div class="buttons mt-2">
                                <a :href="getStorageUrl(item.storage_url)" target="_blank"
                                    class="button is-small is-outlined">
                                    <span class="icon">
                                        <i class="fas fa-eye"></i>
                                    </span>
                                </a>
                                <a @click.prevent="deleteDocument(item.id, item.storage_url)"
                                    class="button is-small is-outlined has-text-danger">
                                    <span class="icon">
                                        <i class="fas fa-trash-alt"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </PerfectScrollbar>
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, onMounted, computed } from 'vue';

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

const url = computed(() => {
    if (!props.userId || !props.partnerId) return null

    return `https://n8n.lopevapp.com.br/webhook/ffd5afc9-4e60-4ab6-9e9a-e8d0d99f1684/${props.userId}/${props.partnerId}`
})

const getStorageUrl = (path) => {
    return `https://lopev.sfo3.cdn.digitaloceanspaces.com/docs/${path}`
}

const deleteDocument = (docId, storageKey) => {
    // Lógica para deletar o documento
    useFetch(`https://n8n.lopevapp.com.br/webhook/b762b86f-01e8-4291-a93f-5c22274b08f1/${docId}/${storageKey}`, {
        method: 'DELETE'
    })
}

const { data: timeline } = await useFetch(url)
</script>
<style scoped>

    .ps {
        max-height: 360px;
        /* or height: 100px; */
    }

    /* Timeline simples com Bulma */
    .medical-timeline {
        border-left: 2px solid #dbdbdb;
        margin-left: 10px;
        padding-left: 20px;
    }

    .timeline-item {
        position: relative;
        margin-bottom: 1.5rem;
    }

    .timeline-item::before {
        content: "";
        position: absolute;
        left: -27px;
        top: 5px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #2c5f8d;
    }
</style>
