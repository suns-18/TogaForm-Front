import axios from "./axios.ts";

export const getUserById = async (id: string) => {
    let res = await axios.post(
        `/user/queryById`, {
            'id': id
        })

    if (res.data['code'] == 0)
        return {username: '获取用户信息失败'}
    
    return res.data['data']
}