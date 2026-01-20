<template>
    <nav class="navbar is-white has-shadow" role="navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="#">
                    <figure class="image is-98x98 mr-2">
                        <img src="/logo_white.png" alt="Lopev Logo">
                    </figure>
                    <strong class="is-size-4 text-medical-blue">LOPEV</strong>
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a v-show="false" class="button is-light is-rounded">
                                <span class="icon"><i class="fas fa-user-circle"></i></span>
                                <span>Meu Perfil</span>
                            </a>
                            <a @click="handleLogout" class="button is-danger is-light is-rounded">
                                <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('userData')

    // Redirect to login page
    router.push('/auth/login')
}
</script>
