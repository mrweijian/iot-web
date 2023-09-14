import {defineStore} from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            menus: [],
            topActive:0,
            leftActive:0
        }
    },
    persist: true,
    getters: {},
    actions: {},
})