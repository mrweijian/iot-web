import request from "../../utils/request"
import {LoginReq} from "./types";

export function login(data: LoginReq): any {
    return request.post('/api/auth/login', data)
}