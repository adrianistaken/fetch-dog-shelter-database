<script>
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";

export default {
    components: {
        Login,
        Home,
    },
    data() {
        return {
            loggedIn: false,
        };
    },
    methods: {
        handleLogin() {
            this.loggedIn = true;
        },
    },
    mounted() {
        console.log('Component mounted');
    }
};
</script>

<template>
    <div class="min-h-screen w-full flex justify-center items-center overflow-x-hidden">
        <Login v-if="!loggedIn" @login="handleLogin" />
        <Home v-else />
    </div>
</template>

<style scoped></style>
