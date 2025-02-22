<script>
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";

export default {
    components: {
        Login,
    },
    data() {
        return {
            loggedIn: false,
        };
    },
    methods: {
        test() {
        }
    },
    mounted() {
        console.log('Component mounted');
    }
};
</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <Login v-if="!loggedIn" />
        <Home v-else />
    </div>
</template>

<style scoped></style>
