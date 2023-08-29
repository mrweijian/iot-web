import {defineStore} from "pinia";

export const useLeftMenuStore = defineStore('left_menu', {
    state: () => {
        return {menus: []}
    },
    getters: {},
    actions: {},
})