<script>
import { ref, onMounted } from "vue";
import { DogService } from "../../DogService.js";
import { AuthService } from "../AuthService.js";
import DogCard from "./DogCard.vue";

export default {
    components: { DogCard },
    setup() {
        const dogs = ref([]);
        const loading = ref(false);
        const errorMessage = ref("");
        const authenticated = ref(false);

        const currentFrom = ref(null);
        const nextFrom = ref(null);
        const prevFrom = ref(null);
        const currentPage = ref(1);

        const fetchDogs = async (fromCursor = null) => {
            if (!authenticated.value) {
                console.log("User is not authenticated, not fetching dogs.");
                return;
            }

            loading.value = true;
            errorMessage.value = "";

            try {
                const searchResults = await DogService.searchDogs({
                    size: 12,
                    sort: "breed:asc",
                    from: fromCursor,
                });

                if (searchResults.resultIds.length > 0) {
                    dogs.value = await DogService.getDogs(searchResults.resultIds);
                }

                currentFrom.value = fromCursor;
                nextFrom.value = searchResults.next ? extractCursor(searchResults.next) : null;
                prevFrom.value = searchResults.prev ? extractCursor(searchResults.prev) : null;
            } catch (error) {
                errorMessage.value = "Error fetching dogs.";
                console.error("Error fetching dogs:", error);
            } finally {
                loading.value = false;
            }
        };

        const extractCursor = (url) => {
            const urlParams = new URLSearchParams(url.split("?")[1]);
            return urlParams.get("from");
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

        onMounted(async () => {
            authenticated.value = await AuthService.isAuthenticated();
            if (authenticated.value) {
                fetchDogs();
            } else {
                console.error("User is not authenticated, cannot fetch dogs.");
            }
        });

        return { dogs, loading, errorMessage, currentPage, nextPage, prevPage, nextFrom, prevFrom };
    },
};
</script>

<template>
    <div>
        <div v-if="loading">Loading dogs...</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <div v-if="dogs.length" class="dog-list">
            <DogCard v-for="dog in dogs" :key="dog.id" :dog="dog" />
        </div>

        <div class="join w-full justify-center">
            <button class="join-item btn" :disabled="!prevFrom" @click="prevPage">
                <img width="25" height="100" src="https://img.icons8.com/ios-filled/100/back.png" alt="back" />
            </button>
            <button class="join-item btn text-black">{{ currentPage }}</button>
            <button class="join-item btn" :disabled="!nextFrom" @click="nextPage">
                <img width="25" height="100" src="https://img.icons8.com/ios-filled/100/forward--v1.png"
                    alt="forward--v1" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.dog-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;
}
</style>
