<template>
    <footer class="footer has-background-medical-blue">
        <div class="container">
            <div class="columns">
                <div class="column is-4">
                    <img src="/logo_footer.png" alt="Lopev Logo" class="footer-logo mb-3">
                </div>
                <div class="column is-4">
                    <p class="title is-5 has-text-white mb-3">Certificações</p>
                    <ul class="footer-links">
                        <li><a href="#" class="has-text-white-ter">LGPD</a></li>
                        <li><a href="#" class="has-text-white-ter">Rapidoc</a></li>
                    </ul>
                    <p class="title is-6 has-text-white mb-3 mt-4">Parcerias de Saúde</p>
                </div>
                <div class="column is-4">
                    <p class="title is-5 has-text-white mb-3">Sobre</p>
                    <ul class="footer-links">
                        <li><a href="#" class="has-text-white-ter">Política de Privacidade</a></li>
                        <li><a href="#" class="has-text-white-ter">Termos de Uso</a></li>
                        <li><a href="#" class="has-text-white-ter">Contato</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
    .has-background-medical-blue {
        background-color: #0f3e35 !important;
    }

    .footer-logo {
        max-width: 120px;
    }

    .footer-links {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .footer-links li {
        margin-bottom: 0.5rem;
    }

    .footer-links a {
        transition: opacity 0.2s;
    }

    .footer-links a:hover {
        opacity: 0.7;
    }
</style>