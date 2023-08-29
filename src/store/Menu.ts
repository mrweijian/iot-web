import {defineStore} from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {menus: []}
    },
    persist: true,
    getters: {},
    actions: {},
})