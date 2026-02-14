<template>
    <div>
        <!-- Header -->
        <NavBar />

        <Hero />
        <!-- Hero Section -->
        <section class="hero is-medical-blue is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title has-text-white">Olá {{ userData.name }}, Bem-vindo ao seu
                        Histórico Saúde</h1>
                    <h2 class="subtitle has-text-white-ter is-size-6">Acompanhe seus exames e agendamentos de forma
                        simplificada.</h2>
                </div>
            </div>
        </section>

        <div class="container mt-5 px-3">
            <div class="columns is-multiline">
                <div class="column is-4">
                    <DocUpload :userId="userData.userId" :partnerId="userData.partnerId" />
                </div>
                <div class="column is-4">
                    <div class="box box-hover has-text-centered">
                        <span class="icon is-large">
                            <i class="fas fa-2x fa-calendar-alt"></i>
                        </span>
                        <p class="title is-5 mt-3">Consultas</p>
                        <button class="button is-primary is-light is-fullwidth is-rounded">Agendar Agora</button>
                    </div>
                </div>
                <div class="column is-4">
                    <div class="box box-hover has-text-centered">
                        <span class="icon is-large">
                            <i class="fab fa-2x fa-whatsapp"></i>
                        </span>
                        <p class="title is-5 mt-3">Suporte</p>
                        <button class="button is-success is-light is-fullwidth is-rounded">Falar no WhatsApp</button>
                    </div>
                </div>
            </div>

            <div class="columns mt-4">
                <div class="column is-5">
                    <div class="card is-borderless">
                        <TimeLine :userId="userData.userId" :partnerId="userData.partnerId" />
                    </div>
                </div>

                <div class="column is-7">
                    <div class="box">
                        <!-- <div class="message is-info">
                            <div class="message-header">
                                <p><i class="fas fa-user-md mr-2"></i> Lopev Explica</p>
                            </div>
                            <div class="message-body is-size-6">
                                Paciente apresenta quadro <strong>estável</strong>. A última ressonância de coluna
                                sugere
                                estabilidade clínica em comparação ao ano anterior.
                            </div>
                        </div> -->

                        <div class="columns is-multiline">
                            <div class="column is-6">
                                <div class="notification is-light mb-0">
                                    <p class="heading">Próxima Consulta</p>
                                    <p class="title is-5">22 de Janeiro</p>
                                </div>
                            </div>
                            <div class="column is-6">
                                <div class="notification is-light mb-0">
                                    <p class="heading">Médico Responsável</p>
                                    <p class="title is-5">Dr. João Silva</p>
                                </div>
                            </div>
                        </div>


                        <Chat />

                        <!-- <div class="notification is-warning is-light mt-4">
                            <button class="delete"></button>
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            <strong>Recomendação:</strong> Mantenha a medicação conforme prescrito e beba bastante água.
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DocUpload from '../components/DocUpload.vue'
import TimeLine from '../components/TimeLine.vue'
import Footer from '../components/footer.vue'

const userData = ref({
    name: '',
    userId: null,
    partnerId: null
})

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

<style scoped>
    body {
        font-family: 'Inter', sans-serif;
    }

    .is-medical-blue {
        background-color: #0f3e35 !important;
    }

    .text-medical-blue {
        color: #0f3e35 !important;
    }

    .container h2.subtitle {
        color: #d8d3e7 !important;
    }

    /* Ajuste fino para o efeito de elevação que o Bulma puro não tem */
    .box-hover {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        border: 1px solid #eef2f7;
    }

    .box-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    }
</style>
