import {defineStore} from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            menus: [],
            topActive:'6',
            leftActive:''
        }
    },
    persist: true,
    getters: {},
    actions: {},
})