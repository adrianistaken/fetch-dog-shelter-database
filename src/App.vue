<script>
import LoginPage from "./components/LoginPage.vue";
import HomePage from "./components/HomePage.vue";
import { AuthService } from "./Services/AuthService";
import { DogService } from "./Services/DogService";
import { ref, provide, onMounted, watch } from "vue";

export default {
    components: {
        LoginPage,
        HomePage,
    },
    setup() {
        const loggedIn = ref(false);
        const favorites = ref([]);

        const addFavorite = (dog) => {
            if (!favorites.value.some(fav => fav.id === dog.id)) {
                favorites.value.push(dog);
            }
        };

        const removeFavorite = (dogId) => {
            favorites.value = favorites.value.filter(dog => dog.id !== dogId);
        };

        const loadFavorites = async () => {
            const savedIds = JSON.parse(localStorage.getItem("favoriteDogs")) || [];
            if (savedIds.length > 0) {
                try {
                    const fetchedDogs = await DogService.getDogs(savedIds);
                    favorites.value = fetchedDogs;
                } catch (error) {
                    console.error("Error loading favorites:", error);
                }
            }
        };

        const handleLogin = () => {
            loggedIn.value = true;
        };

        const handleLogout = () => {
            console.log("Logging out...");
            AuthService.logout();
            loggedIn.value = false;
        };

        const checkAuthentication = async () => {
            loggedIn.value = await AuthService.isAuthenticated();
            console.log("Authentication status after refresh:", loggedIn.value);
        };

        watch(favorites, (newFavorites) => {
            const favoriteIds = newFavorites.map(dog => dog.id);
            localStorage.setItem("favoriteDogs", JSON.stringify(favoriteIds));
        }, { deep: true });

        provide("favorites", favorites);
        provide("addFavorite", addFavorite);
        provide("removeFavorite", removeFavorite);

        provide("handleLogout", handleLogout);
        provide("loggedIn", loggedIn);

        onMounted(() => {
            loadFavorites();
            checkAuthentication();
        });

        return { loggedIn, handleLogin, handleLogout };
    },
};
</script>

<template>
    <div class="min-h-screen w-full flex justify-center items-center overflow-x-hidden">
        <LoginPage v-if="!loggedIn" @login="handleLogin" />
        <HomePage v-else @logout="handleLogout" />
    </div>
</template>

<style scoped></style>
