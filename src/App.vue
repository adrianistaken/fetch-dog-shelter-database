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
    <div class="w-screen h-screen flex justify-center items-center">
        <Login v-if="!loggedIn" @login="handleLogin" />
        <Home v-else />
    </div>
</template>

<style scoped></style>
