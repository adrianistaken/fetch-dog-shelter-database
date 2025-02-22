<script>
import axios from "axios";

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
                const response = await axios.post(
                    "https://frontend-take-home-service.fetch.com/auth/login",
                    {
                        name: this.name,
                        email: this.email,
                    },
                    { withCredentials: true }
                )

                if (response.status === 200) {
                    this.$emit('login');
                }
            } catch (error) {
                this.errorMessage = "Login failed. Please check your credentials.";
                console.error("Login error:", error);
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