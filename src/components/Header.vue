<script>
import { inject } from "vue";

export default {
    setup() {
        const handleLogout = inject("handleLogout");
        return { handleLogout };
    }
};
</script>

<template>
    <div class="bg-base-100 h-32 flex justify-between items-center px-36 w-full">
        <div>
            <img src="../assets/Fetch_Logo_Secondary_Horizontal_ReversedOut_Fetch.png" alt="" class="w-40">
        </div>
        <div>
            <button class="cursor-pointer" @click="handleLogout">Logout</button>
        </div>
    </div>
</template>

<style></style>
