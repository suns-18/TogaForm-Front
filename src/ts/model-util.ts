export function roleStr(role: number): string {
    switch (role) {
        case 0:
            return "管理员"
        case 1:
            return "教师"
        case 2:
            return "学生"
        default:
            return "未知用户"

    }
}

export function roleColor(role: number) {
    switch (role) {
        case 0:
            return "red-accent-3"
        case 1:
            return "success"
        case 2:
            return "info"
        default:
            return "black"

    }
}


export function localTime(source: string) {
    if (source === null) {
        return ''
    } else {
        const date = new Date(source)
        const y = date.getFullYear()
        let m: string | number = date.getMonth() + 1
        m = m < 10 ? `0${String(m)}` : m
        let d: string | number = date.getDate()
        d = d < 10 ? `0${String(d)}` : d
        let h: string | number = date.getHours()
        h = h < 10 ? `0${String(h)}` : h
        let minute: string | number = date.getMinutes()
        minute = minute < 10 ? `0${String(minute)}` : minute
        let second: string | number = date.getSeconds()
        second = second < 10 ? `0${String(second)}` : second
        return `${String(y)}-${String(m)}-${String(d)}   ${String(h)}:${String(
            minute
        )}:${String(second)}`
    }
}

export function expire(dest: string) {
    if (dest === null) {
        return undefined
    } else {
        return ((new Date().getTime())
            - new Date(dest).getTime()) > 0
    }
}

export function expireStr(start: string,
                          end: string) {
    if (expire(end)) return "已过期"
    if (expire(start)) return "启用中"
    else
        return "未启用"
}

export function expireColor(start: string,
                            end: string) {
    if (expire(end)) return "red-accent-3"
    if (expire(start)) return "success"
    else return "warning"
}
