<script>
export default {
    props: {
        dogBreeds: Array,
        sortOrder: String,
    },
    emits: ["breedSelected", "updateSortOrder"],
    data() {
        return {
            currentBreed: "All",
        };
    },
    methods: {
        selectBreed(breed) {
            this.currentBreed = breed;
            document.getElementById("dog-breeds").hidePopover();
            this.$emit("breedSelected", breed);
        },
    },
};
</script>

<template>
    <div class="bg-base-200 text-black flex items-center h-20 my-5 rounded-sm px-10 gap-4">
        <button class="btn btn-primary" popovertarget="dog-breeds" style="anchor-name:--anchor-1">
            Breed: {{ currentBreed }}
        </button>

        <ul class="dropdown menu w-52 rounded-box bg-primary shadow-sm overflow-y-auto max-h-60" popover id="dog-breeds"
            style="position-anchor:--anchor-1">
            <li @click="selectBreed('All')">
                <a>All</a>
            </li>
            <li v-for="breed in dogBreeds" :key="breed" @click="selectBreed(breed)">
                <a>{{ breed }}</a>
            </li>
        </ul>

        <div :class="currentBreed !== 'All' ? 'tooltip cursor-not-allowed' : ''"
            data-tip="Sorting only works when viewing all breeds">
            <button class="btn btn-primary sort-button" @click="$emit('updateSortOrder')"
                :disabled="currentBreed !== 'All'">
                Sort: {{ sortOrder === "asc" ? "A-Z" : "Z-A" }}
            </button>
        </div>

    </div>
</template>

<style scoped>
.sort-button:disabled {
    background-color: #fbaa00;
}
</style>