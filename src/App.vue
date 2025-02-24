<script>
import LoginPage from "./components/LoginPage.vue";
import HomePage from "./components/HomePage.vue";
import { AuthService } from "./AuthService";
import { ref, provide, onMounted } from "vue";

export default {
    components: {
        LoginPage,
        HomePage,
    },
    setup() {
        const loggedIn = ref(false);

        const handleLogin = () => {
            loggedIn.value = true;
        };

        const handleLogout = () => {
            console.log("Logging out...");
            AuthService.logout();
            loggedIn.value = false;
        };

        const checkAuthentication = async () => {
            loggedIn.value = await AuthService.isAuthenticated();
            console.log("Authentication status after refresh:", loggedIn.value);
        };

        onMounted(() => {
            checkAuthentication();
        });

        provide("handleLogout", handleLogout);
        provide("loggedIn", loggedIn);

        return { loggedIn, handleLogin, handleLogout };
    },
};
</script>

<template>
    <div class="min-h-screen w-full flex justify-center items-center overflow-x-hidden">
        <LoginPage v-if="!loggedIn" @login="handleLogin" />
        <HomePage v-else @logout="handleLogout" />
    </div>
</template>

<style scoped></style>
