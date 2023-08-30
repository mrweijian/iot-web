import request from "../../utils/request"

/**
 * 获取菜单列表
 */
export function getMenuList(): any {
    return request.get("/api/mange/sysMenu/getMenuList")
}

/**
 * 添加菜单信息
 */
export function addMenuInfo(param): any {
    return request.post("/api/mange/sysMenu/addMenuInfo", param)
}

/**
 * 获取菜单列表(树形结构)
 */
export function getMenuListTree(): any {
    return request.get("/api/mange/sysMenu/getMenuListTree")
}