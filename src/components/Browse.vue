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
        const perPage = 25;

        const selectedZipCodes = ref([]);
        const selectedAgeMin = ref(null);
        const selectedAgeMax = ref(null);
        const sortOrder = ref("asc"); // Default sorting order
        const sortField = ref("breed"); // Default sorting field (breed, name, age)

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

                const breedFilter = selectedBreed.value === "All" ? [] : [selectedBreed.value];

                const searchParams = {
                    breeds: breedFilter.length ? breedFilter : undefined,
                    zipCodes: selectedZipCodes.value.length > 0 ? selectedZipCodes.value : undefined,
                    ageMin: selectedAgeMin.value || undefined,
                    ageMax: selectedAgeMax.value || undefined,
                    size: perPage,
                    sort: `${sortField.value}:${sortOrder.value}`,
                    from: fromCursor,
                };

                const searchResults = await DogService.searchDogs(searchParams);

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

        const handleApplyFilters = ({ zipCodes, ageMin, ageMax }) => {
            selectedZipCodes.value = zipCodes;
            selectedAgeMin.value = ageMin;
            selectedAgeMax.value = ageMax;
            currentPage.value = 1;
            fetchDogs();
        };

        const updateSortField = (field) => {
            sortField.value = field;
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
            currentPage.value = 1;
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
            currentPage, nextPage, prevPage, perPage, selectedZipCodes, selectedAgeMin, selectedAgeMax, nextFrom, prevFrom,
            handleBreedSelected, handleApplyFilters, updateSortField, sortOrder, sortField, toggleSortOrder,
        };
    },
};
</script>

<template>
    <div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <DogListFilter :dogBreeds="dogBreeds" :sortOrder="sortOrder" :sortField="sortField"
            @breedSelected="handleBreedSelected" @updateSortField="updateSortField" @applyFilters="handleApplyFilters"
            @updateSortOrder="toggleSortOrder" />

        <div v-if="loading">Loading dogs...</div>
        <div v-if="dogs.length" class="dog-list">
            <DogCard v-for="dog in dogs" :key="dog.id" :dog="dog" />
        </div>

        <div class="join w-full justify-center mt-12">
            <button class="join-item btn" :disabled="!prevFrom || loading" @click="prevPage">
                <img width="25" height="100" src="https://img.icons8.com/ios-filled/100/back.png" alt="back" />
            </button>
            <button class="join-item btn text-black">{{ currentPage }}</button>
            <button class="join-item btn" :disabled="!nextFrom || loading" @click="nextPage">
                <img width="25" height="100" src="https://img.icons8.com/ios-filled/100/forward--v1.png"
                    alt="forward" />
            </button>
        </div>
    </div>
</template>

<style scoped></style>
