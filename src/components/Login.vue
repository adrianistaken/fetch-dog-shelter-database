<script>
export default {
    data() {
        return {
            message: ''
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
    <div class="text-center">
        <img src="../assets/Fetch_Logo_Primary_Reversed_out_Fetch.png" alt="Fetch logo" class="w-48 m-auto">
        <h2 class="mt-4 font-bold text-xl">Find Your Future Best Friend</h2>
        <div class="m-4 flex gap-4">
            <input type="text" placeholder="Name" class="input bg-white placeholder-gray-400 text-black" />
            <input type="text" placeholder="Email" class="input bg-white placeholder-gray-400 text-black" />
        </div>
        <button class="btn btn-primary">Login</button>
    </div>
</template>

<style></style>
