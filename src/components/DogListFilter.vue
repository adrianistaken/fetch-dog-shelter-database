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
    <div
        class="bg-base-200 text-black flex justify-between items-center h-20 my-5 rounded-sm px-10 gap-4 dog-filters-container">
        <!-- Breed selector -->
        <div class="breed-filter">
            <button class="btn dropdown-button w-full" popovertarget="dog-breeds" style="anchor-name:--anchor-1">
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
        </div>

        <div class="zip-filter">
            <!-- ZIP Code -->
            <input type="text" placeholder="ZIP Code(s), comma-separated" class="input w-full zip-input"
                v-model="zipInput" />
        </div>

        <div class="min-age-filter">
            <!-- Age Min/Max -->
            <input type="number" class="input validator age-input" required placeholder="Min Age" min="0" max="30"
                title="Min Age" v-model="ageMin" @change="updateAge" />
            <!-- <p class="validator-hint">Must be 0 or above</p> -->
        </div>

        <div class="max-age-filter">
            <input type="number" class="input validator age-input" required placeholder="Max Age" min="0" max="30"
                title="Max Age" v-model="ageMax" @change="updateAge" />
            <!-- <p class="validator-hint">Must be 30 or below</p> -->
        </div>

        <div class="sort-filter">
            <!-- Sorting selector -->
            <button class="btn dropdown-button w-full" popovertarget="sort-options" style="anchor-name:--anchor-2">
                Sort by: {{ sortField }}
            </button>
            <!-- Sort options dropdown -->
            <ul class="dropdown menu dropdown-menu w-52 rounded-box shadow-sm overflow-y-auto max-h-60" popover
                id="sort-options" style="position-anchor:--anchor-2">
                <li class="sort-list-item" @click="updateSortField('Breed')"><a>Breed</a></li>
                <li class="sort-list-item" @click="updateSortField('Age')"><a>Age</a></li>
                <li class="sort-list-item" @click="updateSortField('Name')"><a>Name</a></li>
            </ul>
        </div>

        <div class="order-filter">
            <!-- Breed ordering -->
            <div :class="blockSortOrderToggle ? 'tooltip cursor-not-allowed w-full' : ''"
                data-tip="Sorting requires more filters">
                <button class="btn dropdown-button sort-button w-full" @click="$emit('updateSortOrder')"
                    :disabled="blockSortOrderToggle">
                    Sort: {{ sortOrder === "asc" ? "Asce" : "Desc" }}
                </button>
            </div>
        </div>

        <div class="search-button-container">
            <!-- Search Button (Now applies filters) -->
            <button class="btn btn-primary w-full" @click="applyFilters">
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
    width: 100%;
}

.zip-input {
    background-color: white;
    border: 1px solid black;
}

.age-input {
    background-color: white;
    border: 1px solid black;
    min-width: 100px;
    width: 100%;
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

@media (max-width: 1625px) {
    .dog-filters-container {
        display: grid;
        padding: 20px 40px;
        height: auto;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }

    .breed-filter {
        grid-area: 1 / 1 / 2 / 3;
    }

    .zip-filter {
        grid-area: 1 / 3 / 2 / 6;
    }

    .min-age-filter {
        grid-area: 2 / 1 / 3 / 2;
    }

    .max-age-filter {
        grid-area: 2 / 2 / 3 / 3;
    }

    .sort-filter {
        grid-area: 2 / 3 / 3 / 4;
    }

    .order-filter {
        grid-area: 2 / 4 / 3 / 5;
    }

    .search-button-container {
        grid-area: 2 / 5 / 3 / 6;
    }
}

@media (max-width: 1105px) {
    .dropdown-button {
        display: block;
        width: 100%;
        /* Ensures it takes full width */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .dog-filters-container {
        display: grid;
        padding: 20px 40px;
        height: auto;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }

    .breed-filter {
        grid-area: 1 / 1 / 2 / 3;
    }

    .zip-filter {
        grid-area: 1 / 3 / 2 / 5;
    }

    .min-age-filter {
        grid-area: 2 / 1 / 3 / 3;
    }

    .max-age-filter {
        grid-area: 2 / 3 / 3 / 5;
    }

    .sort-filter {
        grid-area: 3 / 1 / 4 / 3;
    }

    .order-filter {
        grid-area: 3 / 3 / 4 / 5;
    }

    .search-button-container {
        grid-area: 4 / 1 / 5 / 5;
    }
}
</style>