<script>
export default {
    props: {
        dogBreeds: Array,
        sortOrder: String,
        sortField: String,
    },
    emits: ["breedSelected", "updateSortOrder", "applyFilters", "updateSortField"],
    data() {
        return {
            currentBreed: "All",
            ageMin: null,
            ageMax: null,
            zipInput: "",
        };
    },
    computed: {
        blockSortOrderToggle() {
            const validAgeMin = this.ageMin !== null && this.ageMin !== "" && !isNaN(this.ageMin);
            const validAgeMax = this.ageMax !== null && this.ageMax !== "" && !isNaN(this.ageMax);
            const validZip = this.zipInput.trim() !== "";

            const hasFilters = validAgeMin || validAgeMax || validZip;

            return this.currentBreed !== "All" && !hasFilters;
        }
    },
    methods: {
        selectBreed(breed) {
            this.currentBreed = breed;
            document.getElementById("dog-breeds").hidePopover();
            this.$emit("breedSelected", breed);
        },
        updateSortField(field) {
            document.getElementById("sort-options").hidePopover();
            this.$emit("updateSortField", field.toLowerCase());
        },
        applyFilters() {
            const zipArray = this.zipInput.split(",").map(zip => zip.trim()).filter(zip => zip.length > 0);
            this.$emit("applyFilters", { zipCodes: zipArray, ageMin: this.ageMin, ageMax: this.ageMax });
        }
    },
};
</script>

<template>
    <div class="bg-base-200 text-black flex justify-between items-center h-20 my-5 rounded-sm px-10 gap-4">
        <div class="flex gap-4">
            <!-- Breed selector -->
            <button class="btn dropdown-button" popovertarget="dog-breeds" style="anchor-name:--anchor-1">
                Breed: {{ currentBreed }}
            </button>
            <!-- Breed dropdown -->
            <ul class="dropdown menu dropdown-menu w-52 rounded-box shadow-sm overflow-y-auto max-h-60" popover
                id="dog-breeds" style="position-anchor:--anchor-1">
                <li @click="selectBreed('All')">
                    <a>All</a>
                </li>
                <li v-for="breed in dogBreeds" :key="breed" @click="selectBreed(breed)">
                    <a>{{ breed }}</a>
                </li>
            </ul>

            <!-- Breed ordering -->
            <div :class="blockSortOrderToggle ? 'tooltip cursor-not-allowed' : ''"
                data-tip="Sorting requires more filters">
                <button class="btn dropdown-button sort-button" @click="$emit('updateSortOrder')"
                    :disabled="blockSortOrderToggle">
                    Sort: {{ sortOrder === "asc" ? "Asce" : "Desc" }}
                </button>
            </div>

        </div>

        <div class="flex gap-4">
            <!-- ZIP Code -->
            <input type="text" placeholder="ZIP Code(s), comma-separated" class="input zip-input" v-model="zipInput" />

            <!-- Age Min/Max -->
            <input type="number" class="input validator age-input" required placeholder="Min Age" min="0" max="30"
                title="Min Age" v-model="ageMin" @change="updateAge" />
            <!-- <p class="validator-hint">Must be 0 or above</p> -->

            <input type="number" class="input validator age-input" required placeholder="Max Age" min="0" max="30"
                title="Max Age" v-model="ageMax" @change="updateAge" />
            <!-- <p class="validator-hint">Must be 30 or below</p> -->

            <!-- Sorting selector -->
            <button class="btn dropdown-button" popovertarget="sort-options" style="anchor-name:--anchor-2">
                Sort by: {{ sortField }}
            </button>
            <!-- Sort options dropdown -->
            <ul class="dropdown menu dropdown-menu w-52 rounded-box shadow-sm overflow-y-auto max-h-60" popover
                id="sort-options" style="position-anchor:--anchor-2">
                <li class="sort-list-item" @click="updateSortField('Breed')"><a>Breed</a></li>
                <li class="sort-list-item" @click="updateSortField('Age')"><a>Age</a></li>
                <li class="sort-list-item" @click="updateSortField('Name')"><a>Name</a></li>
            </ul>

            <!-- Search Button (Now applies filters) -->
            <button class="btn btn-primary" @click="applyFilters">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                        stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                Search
            </button>
        </div>

    </div>
</template>

<style scoped>
.sort-button:disabled {
    opacity: .35;
}

.zip-input {
    background-color: white;
    border: 1px solid black;
    width: 250px;
}

.age-input {
    background-color: white;
    border: 1px solid black;
    width: 100px;
}

.dropdown-button {
    background-color: white;
    border: 1px solid black;
    color: black;
}

.dropdown-menu {
    background-color: #F2F2F2;
    border: 1px solid black;
    color: black;
}

.sort-list-item {
    background-color: #F2F2F2;
    color: black;
}
</style>