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
    <div class="header-container bg-base-100 h-32 flex justify-between items-center px-36 w-full">
        <div>
            <img src="../assets/Fetch_Logo_Secondary_Horizontal_ReversedOut_Fetch.png" alt="" class="header-logo w-40">
        </div>
        <div>
            <button class="btn btn-primary hover:btn-secondary logout-button" @click="handleLogout">Logout</button>
        </div>
    </div>
</template>

<style scoped>
.logout-button {
    font-family: "Lexend", serif;
}

.header-logo {
    min-width: 160px;
}

@media (max-width: 604px) {
    .header-container {
        padding: 60px 50px
    }
}
</style>
