<script>
import { inject, ref, computed } from "vue";
import DogCard from "./DogCard.vue";
import FindMatch from "./FindMatch.vue";
import { DogService } from "../Services/DogService";

export default {
    components: { DogCard, FindMatch },
    setup() {
        const favorites = inject("favorites");
        const matchedDog = ref(null);

        const findMatch = async () => {
            try {
                const favoriteIds = favorites.value.map(dog => dog.id);

                const matchId = await DogService.getMatch(favoriteIds);
                if (favoriteIds.includes(matchId)) {
                    matchedDog.value = favorites.value.find(dog => dog.id === matchId);
                } else {
                    console.warn("Matched dog not in favorites..");
                }
            } catch (error) {
                console.error("Error finding match:", error);
            }
        };

        const hasFavorite = computed(() => favorites.value.length > 0);

        return { favorites, matchedDog, hasFavorite, findMatch };
    },
};
</script>

<template>
    <div>
        <FindMatch :matchedDog="matchedDog" @findMatch="findMatch" :hasFavorite="hasFavorite" />

        <div v-if="favorites.length === 0">No favorited dogs yet.</div>
        <div v-else class="dog-list">
            <DogCard v-for="dog in favorites" :key="dog.id" :dog="dog" />
        </div>
    </div>
</template>

<style scoped></style>
