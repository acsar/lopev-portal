<template>
    <div>
        <NavBar />
        <div class="p-2 sm:p-4 lg:p-6">

            <div class="grid grid-cols-1 md:grid-cols-[minmax(0,60%)_minmax(0,40%)] gap-2">
                <div>
                    <Hero :userData="userData" class="mb-4" />
                    <TimeLine :userId="userData.userId" :partnerId="userData.partnerId" :refreshKey="refreshKey" />
                </div>
                <div>
                    <ChatMessage :userId="userData.userId" :partnerId="userData.partnerId"
                        @refresh-timeline="refreshTimeline" />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DocUpload from '../components/DocUpload.vue'
import TimeLine from '../components/TimeLine.vue'

const userData = ref({
    name: '',
    userId: null,
    partnerId: null
})

const timeline = ref(null)
const refreshKey = ref(0) // Reactive variable to trigger refresh

const refreshTimeline = () => {
    refreshKey.value++ // Increment the key to trigger the watcher in TimeLine
};

onMounted(() => {
    if (process.client) {
        const _userData = localStorage.getItem('userData')
        if (_userData) {
            userData.value = JSON.parse(_userData)
        }
    }
})

definePageMeta({
    middleware: 'auth'
})
</script>