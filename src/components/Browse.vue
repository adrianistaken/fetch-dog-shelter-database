<script>
import { ref, onMounted } from "vue";
import { DogService } from "../../DogService.js";
import DogCard from "./DogCard.vue";

export default {
    components: { DogCard },
    setup() {
        const dogs = ref([]);
        const loading = ref(false);
        const errorMessage = ref("");

        const fetchDogs = async () => {
            loading.value = true;
            errorMessage.value = "";

            try {
                const searchResults = await DogService.searchDogs({
                    size: 25,
                    sort: "breed:asc",
                });

                if (searchResults.resultIds.length > 0) {
                    dogs.value = await DogService.getDogs(searchResults.resultIds);
                }
            } catch (error) {
                errorMessage.value = "Error fetching dogs.";
                console.error("Error fetching dogs:", error);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchDogs);

        return { dogs, loading, errorMessage };
    },
};
</script>

<template>
    <div>
        <div v-if="loading">Loading dogs...</div>
        <div v-if="errorMessage" class="">{{ errorMessage }}</div>

        <div class="flex gap-4 flex-wrap" v-if="dogs.length">
            <DogCard v-for="dog in dogs" :key="dog.id" :dog="dog" />
        </div>
    </div>
</template>

<style scoped></style>
