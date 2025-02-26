<script>
import { inject } from "vue";
import DogCard from "./DogCard.vue";

export default {
    components: { DogCard },
    setup() {
        const favorites = inject("favorites");
        return { favorites };
    },
};
</script>

<template>
    <div>
        <div v-if="favorites.length === 0">No favorited dogs yet.</div>
        <div v-else class="dog-list">
            <DogCard v-for="dog in favorites" :key="dog.id" :dog="dog" />
        </div>
    </div>
</template>

<style scoped></style>
