<template>

    <UCard :ui="{ body: { padding: 'p-6 sm:p-8' }, ring: 'ring-1 ring-gray-200' }">
        <template #header>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-history" class="w-5 h-5 text-[#002d1e]" />
                    <h3 class="font-semibold text-[#002d1e]">Histórico de Documentos</h3>
                </div>
                <div>
                    <UButton icon="i-lucide-refresh-cw" variant="ghost" color="neutral" :loading="status === 'pending'"
                        @click="refresh" />
                    <UButton icon="i-lucide-upload" variant="ghost" color="neutral" :loading="status === 'pending'" />
                </div>
            </div>
        </template>

        <div v-if="status === 'pending'" class="p-12 flex flex-col items-center justify-center gap-3">
            <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-[#002d1e]" />
            <p class="text-sm text-gray-500">Carregando histórico...</p>
        </div>

        <div v-else class="h-[500px] overflow-y-auto p-6 bg-white">
            <div v-if="!timeline || timeline.length === 0" class="text-center py-20">
                <UIcon name="i-lucide-file-x-2" class="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p class="text-gray-500">Nenhum documento encontrado no seu histórico.</p>
            </div>

            <UTimeline color="medical-dark" v-else :items="timeline" :ui="{
                dot: 'bg-[#002d1e]',
                line: 'bg-gray-100'
            }">

                <template #indicator="{ item }">
                    <UIcon :name="getDocIcon(item.doc_type)" class="w-5 h-5 text-[#002d1e]" />
                </template>

                <template #date="{ item }">
                    {{ useTimeAgo(new Date(item.date)) }}
                </template>

                <template #title="{ item }">
                    <span>{{ item.doc_type }}</span>
                </template>

                <template #description="{ item }">
                    <span>{{ item.analysis }}</span>
                    <div>
                        <UButton icon="i-lucide-external-link" size="xs" variant="subtle" color="neutral"
                            label="Abrir Documento" class="text-[#002d1e]" @click="openDocument(item.storage_url)" />
                        <UButton icon="i-lucide-trash-2" size="xs" variant="ghost" color="error"
                            @click="handleDelete(item.id, item.storage_url)" />
                    </div>
                </template>

            </UTimeline>
        </div>
    </UCard>

</template>

<script setup>
import { useTimeAgo } from '@vueuse/core'
// Em SPA, não precisamos de await top-level no useFetch se não quisermos bloquear o componente
const props = defineProps({
    userId: Number,
    partnerId: Number
});

// 1. Dicionário de ícones (Fácil de expandir)
const ICON_MAP = {
    'ressonância': 'i-lucide-scan',
    'raio-x': 'i-lucide-box-select',
    'sangue': 'i-lucide-test-tube-2',
    'coração': 'i-lucide-heart-pulse',
    'ecg': 'i-lucide-heart-pulse',
    'receita': 'i-lucide-pill',
    'prescrição': 'i-lucide-pill',
    'laudo': 'i-lucide-file-text',
    'padrão': 'i-lucide-file-digit'
}

// 2. Função para obter o ícone baseado no tipo de documento
const getDocIcon = (docType) => {
    if (!docType) return ICON_MAP['padrão']

    const type = docType.toLowerCase()
    // Procura se alguma chave do mapa está contida no nome do documento
    const key = Object.keys(ICON_MAP).find(k => type.includes(k))

    return ICON_MAP[key] || ICON_MAP['padrão']
}

const url = computed(() => {
    if (!props.userId || !props.partnerId) return null
    return `https://n8n.lopevapp.com.br/webhook/ffd5afc9-4e60-4ab6-9e9a-e8d0d99f1684/${props.userId}/${props.partnerId}`
});

// useFetch configurado para SPA
const { data: timeline, status, refresh } = useFetch(url, {
    immediate: true,
    watch: [url],
    transform: (response) => {
        return response.map(item => ({
            ...item,
            action: 'ok'
        }))
    }
})

const openDocument = (path) => {
    const fullUrl = `https://lopev.sfo3.cdn.digitaloceanspaces.com/docs/${path}`;
    window.open(fullUrl, '_blank');
};

const handleDelete = async (docId, storageKey) => {
    // Simples confirmação nativa (pode ser trocada por um UModal depois)
    if (!confirm('Excluir este documento permanentemente?')) return;

    try {
        await $fetch(`https://n8n.lopevapp.com.br/webhook/b762b86f-01e8-4291-a93f-5c22274b08f1/${docId}/${storageKey}`, {
            method: 'DELETE'
        });

        // Feedback e atualização
        refresh();
    } catch (e) {
        alert('Erro ao excluir documento.');
    }
};

// const formatDate = (dateStr) => {
//     if (!dateStr) return '';
//     const [year, month, day] = dateStr.split('-');
//     return `${day}/${month}/${year}`;
// };
</script>