<script>
import { ref, onMounted, watch, computed } from "vue";
import { DogService } from "../Services/DogService.js";
import { AuthService } from "../Services/AuthService.js";
import DogCard from "./DogCard.vue";
import DogListFilter from "./DogListFilter.vue";

export default {
    components: { DogCard, DogListFilter },
    setup() {
        const dogs = ref([]);
        const dogBreeds = ref([]);
        const selectedBreed = ref("All");

        const loading = ref(false);
        const errorMessage = ref("");

        const currentPage = ref(1);
        const currentFrom = ref(null);
        const nextFrom = ref(null);
        const prevFrom = ref(null);
        const perPage = 12;
        const sortOrder = ref("asc"); // Default sorting order

        const extractCursor = (url) => new URLSearchParams(url.split("?")[1]).get("from");

        const fetchDogs = async (fromCursor = null) => {
            loading.value = true;
            errorMessage.value = "";

            try {
                const isAuthenticated = await AuthService.isAuthenticated();
                if (!isAuthenticated) {
                    errorMessage.value = "User is not authenticated, cannot fetch dogs.";
                    throw new Error("User is not authenticated, cannot fetch dogs.");
                }

                const searchResults = await DogService.searchDogs({
                    breeds: selectedBreed.value === "All" ? [] : [selectedBreed.value],
                    size: perPage,
                    sort: `breed:${sortOrder.value}`,
                    from: fromCursor,
                });

                dogs.value = searchResults.resultIds.length > 0
                    ? await DogService.getDogs(searchResults.resultIds)
                    : [];

                currentFrom.value = fromCursor;
                nextFrom.value = searchResults.next ? extractCursor(searchResults.next) : null;
                prevFrom.value = searchResults.prev ? extractCursor(searchResults.prev) : null;
            } catch (error) {
                errorMessage.value = error.message || "Error fetching dogs.";
                console.error(error);
            } finally {
                loading.value = false;
            }
        };

        const fetchDogBreeds = async () => {
            try {
                dogBreeds.value = await DogService.getDogBreeds();
            } catch (error) {
                console.error("Error fetching dog breeds:", error);
            }
        };

        const handleBreedSelected = (breed) => {
            selectedBreed.value = breed;
            currentPage.value = 1;
            fetchDogs();
        };

        const nextPage = () => {
            if (nextFrom.value) {
                currentPage.value++;
                fetchDogs(nextFrom.value);
            }
        };

        const prevPage = () => {
            if (prevFrom.value) {
                currentPage.value--;
                fetchDogs(prevFrom.value);
            }
        };

        const toggleSortOrder = () => {
            sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
            fetchDogs();
        };

        onMounted(async () => {
            try {
                const isAuthenticated = await AuthService.isAuthenticated();
                if (isAuthenticated) {
                    await fetchDogs();
                    await fetchDogBreeds();
                } else {
                    console.error("User is not authenticated, cannot fetch dogs.");
                }
            } catch (error) {
                console.error("Error during initialization:", error);
            }
        });

        return {
            dogs, dogBreeds, selectedBreed, loading, errorMessage,
            currentPage, nextPage, prevPage, nextFrom, prevFrom,
            handleBreedSelected, sortOrder,
            toggleSortOrder,
        };
    },
};
</script>

<template>
    <div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <DogListFilter :dogBreeds="dogBreeds" :sortOrder="sortOrder" @breedSelected="handleBreedSelected"
            @updateSortOrder="toggleSortOrder" />

        <div v-if="loading">Loading dogs...</div>
        <div v-if="dogs.length" class="dog-list">
            <DogCard v-for="dog in dogs" :key="dog.id" :dog="dog" />
        </div>

        <div class="join w-full justify-center mt-12">
            <button class="join-item btn" :disabled="!prevFrom" @click="prevPage">
                <img width="25" height="100" src="https://img.icons8.com/ios-filled/100/back.png" alt="back" />
            </button>
            <button class="join-item btn text-black">{{ currentPage }}</button>
            <button class="join-item btn" :disabled="!nextFrom" @click="nextPage">
                <img width="25" height="100" src="https://img.icons8.com/ios-filled/100/forward--v1.png"
                    alt="forward" />
            </button>
        </div>
    </div>
</template>

<style scoped></style>
