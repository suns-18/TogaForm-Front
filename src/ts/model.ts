export function roleStr(role: string): string {
	switch (role) {
		case "admin":
			return "管理员"
		case "normal":
			return "普通用户"
		default:
			return "未知"
	}
}

export type Stock = {
	tsCode: string
	symbol: string
	name: string
	area: string
	industry: string
	market: string
	exchange: string
}

export type Company = {
	companyId: number,
	tsCode: string
	exchange: string
	chairman: string,
	regCapital: number,
	website: string
	mainBusiness: string
	introduction: string
}

export type User = {
	id: string
	roleId: string,
	username: string,
	password: string,
	startTime: string,
	stopTime: string,
	status: string,
	createdBy: string
	creationDate: string
	lastUpdatedBy: string,
	lastUpdatedDate: string,
}

export function statusColor(color: string) {
	switch (color) {
		case "1":
			return "success"
		case "0":
		default:
			return "error"
	}
}

export function statusText(color: string) {
	switch (color) {
		case "1":
			return "启用"
		case "0":
		default:
			return "禁用"
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