<script>
import { inject, computed } from "vue";

export default {
    props: {
        dog: Object,
    },
    setup(props) {
        const favorites = inject("favorites");
        const addFavorite = inject("addFavorite");
        const removeFavorite = inject("removeFavorite");

        const isFavorited = computed(() => favorites.value.some(fav => fav.id === props.dog.id));

        const toggleFavorite = () => {
            if (isFavorited.value) {
                removeFavorite(props.dog.id);
            } else {
                addFavorite(props.dog);
            }
        };

        return { isFavorited, toggleFavorite };
    }
};
</script>

<template>
    <div class="dog-card">
        <figure class="image-container">
            <img :src="dog.img" alt="Dog Image" class="dog-image" />
        </figure>
        <div class="card-body p-4 rounded-b-sm">
            <h2 class="card-title text-2xl">{{ dog.name }}</h2>
            <p>Breed: {{ dog.breed }}</p>
            <p>Age: {{ dog.age }}</p>
            <p>Zip Code: {{ dog.zip_code }}</p>
            <div class="card-actions justify-start">
                <button class="btn btn-primary" :class="{ 'btn-secondary': isFavorited }" @click="toggleFavorite">
                    {{ isFavorited ? "Favorited" : "Favorite" }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dog-card {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    color: black;
    border-radius: 4px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 250px;
}

.image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

}

.dog-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    border-radius: 4px 4px 0px 0px;
}

@media (max-width: 604px) {
    .dog-card {
        max-width: none;
    }
}
</style>
