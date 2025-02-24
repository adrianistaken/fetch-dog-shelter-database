<script>
import { AuthService } from "../AuthService";

export default {
    data() {
        return {
            name: "",
            email: "",
            loading: false,
            errorMessage: "",
        };
    },
    emits: ['login'],
    methods: {
        async login() {
            this.loading = true;
            this.errorMessage = "";

            try {
                const response = await AuthService.login(this.name, this.email);

                this.$emit("login");
            } catch (error) {
                console.error("Error logging in:", error);
                this.errorMessage = "Login failed. Please check your credentials.";
            } finally {
                this.loading = false;
            }
        }

    },
    mounted() { }
};
</script>

<template>
    <div class="text-center">
        <img src="../assets/Fetch_Logo_Primary_Reversed_out_Fetch.png" alt="Fetch logo" class="w-48 m-auto">
        <h2 class="mt-4 font-bold text-xl">Find Your Future Best Friend</h2>
        <div v-if="errorMessage" role="alert" class="alert alert-error alert-soft mt-4">
            <span>{{ errorMessage }}</span>
        </div>
        <div class="m-4 flex gap-4">
            <input v-model="name" type="text" placeholder="Name"
                class="input bg-white placeholder-gray-400 text-black" />
            <input v-model="email" type="email" placeholder="Email"
                class="input bg-white placeholder-gray-400 text-black" />
        </div>
        <button class="btn btn-primary" @click="login" :disabled="loading">
            {{ loading ? "Logging in..." : "Login" }}
        </button>
    </div>
</template>

<style></style>