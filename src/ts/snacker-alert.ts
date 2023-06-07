export const TIMEOUT = 2000
export type MsgProp = {
	content: string,
	color: string,
	show: boolean
}
export const errMsg = (msgProp: MsgProp, content: string) => {
	msgProp.content = content
	msgProp.color = 'error'
	msgProp.show = true
}