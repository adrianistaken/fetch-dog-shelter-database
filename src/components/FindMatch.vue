<script>
import DogMatchCard from './DogMatchCard.vue';

export default {
    components: { DogMatchCard },
    props: {
        matchedDog: Object,
        hasFavorite: Boolean,
    },
    emits: ["findMatch"],
};
</script>

<template>
    <div class="bg-base-200 flex justify-center items-center h-20 my-5 rounded-sm px-10"
        :class="!hasFavorite ? 'cursor-not-allowed' : ''">
        <button :disabled="!hasFavorite" class="btn find-match-button" onclick="my_modal_2.showModal()"
            @click="$emit('findMatch')">Find
            Match</button>

        <dialog id="my_modal_2" class="modal">
            <div class="modal-box text-center modal-container">
                <h3 class="text-lg font-bold mb-4">Your Perfect Match Is</h3>

                <div v-if="matchedDog">
                    <DogMatchCard :dog="matchedDog" />
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>

<style scoped>
.find-match-button {
    background-color: #3180E7;
    border: 1px solid #3180E7;
    color: white;
    width: 50%;
    box-shadow: 6px 5px 12px -6px rgba(49, 128, 231, 0.41);
}

.find-match-button:hover {
    background-color: #4CBBEF;
    border: 1px solid #4CBBEF;
    color: black;
    box-shadow: 6px 5px 12px -6px rgba(76, 187, 239, 1);
}

.find-match-button:disabled {
    opacity: .35;
    cursor: not-allowed;
}

.modal-container {
    background-color: #4CBBEF;
}
</style>