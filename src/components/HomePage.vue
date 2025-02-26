<script>
import Header from './Header.vue';
import Browse from './Browse.vue';
import Favorites from './Favorites.vue';

export default {
    components: {
        Header,
        Browse,
        Favorites,
    },
    methods: {
    },
    data() {
        return {
            showingSearch: true,
        }
    }
}
</script>

<template>
    <div class="bg-white min-h-screen w-full">
        <Header />
        <div class="bg-base w-5/6 min-h-[calc(100vh-8rem)] mx-auto mt-20">
            <div class="tabs tabs-border">
                <input type="radio" name="home_tabs" class="tab text-xl bg-base-100 !rounded-b-none" aria-label="Browse"
                    checked="checked" />
                <div class="tab-content bg-base-100 p-10 pt-0 rounded-tr-sm">
                    <Browse />
                </div>

                <input type="radio" name="home_tabs" class="tab text-xl bg-primary !rounded-b-none"
                    aria-label="Favorites" />
                <div class="tab-content bg-primary p-10 pt-0 rounded-tr-sm">
                    <Favorites />
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>