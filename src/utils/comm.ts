/**
 * 静态图片资源处理
 * @param path {String} 路径
 */
import {TOKEN_KEY} from "./variable";

export const getImage = (path: string) => {
    return new URL('/images' + path, import.meta.url).href
}

/**
 * 登录token获取
 */
export const getToken = () => {
    return LocalStore.get(TOKEN_KEY)
}

export const LocalStore = {
    set(key: string, data: any) {
        localStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data))
    },
    get(key: string) {
        const dataStr = localStorage.getItem(key)
        try {
            if (dataStr) {
                const data = JSON.parse(dataStr)
                return data && typeof data === 'object' ? data : dataStr
            } else {
                return dataStr
            }
        } catch (e) {
            return dataStr
        }
    },
    remove(key: string) {
        localStorage.removeItem(key)
    },
    removeAll() {
        localStorage.clear()
    }
}
 export const getParentNode=(tree:any, menuPath:any)=> {
    let parentNode = null; // 父节点
  
    // 递归函数
    function searchParent(node:any) {
      // 遍历子节点
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          // 如果当前子节点的 key 与目标 key 匹配，则将父节点设置为当前节点
          if (node.children[i].menuPath === menuPath) {
            parentNode = node;
            break;
          } else {
            // 递归遍历子节点的子节点
            searchParent(node.children[i]);
          }
        }
      }
    }
  
    // 遍历树结构的每个节点，寻找目标节点的父节点
    for (let i = 0; i < tree.length; i++) {
      searchParent(tree[i]);
      if (parentNode) {
        break; // 如果已经找到父节点，则终止遍历
      }
    }
  
    return parentNode; // 返回父节点
  }
export const getNodeByMenuPath=(tree:any, menuPath:any)=> {
    let targetNode = null; // 目标节点
  
    // 递归函数
    function searchNode(node:any) {
      // 如果当前节点的 menuPath 与目标 menuPath 匹配，则将目标节点设置为当前节点
      if (node.menuPath === menuPath) {
        targetNode = node;
      }
  
      // 递归遍历当前节点的子节点
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          searchNode(node.children[i]);
        }
      }
    }
  
    // 遍历树结构的每个节点，寻找目标节点
    for (let i = 0; i < tree.length; i++) {
      searchNode(tree[i]);
      if (targetNode) {
        break; // 如果已经找到目标节点，则终止遍历
      }
    }
  
    return targetNode; // 返回目标节点
  }
  