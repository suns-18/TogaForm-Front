export const PAGE_LIMIT = 10;

export type Project = {
    id: string,
    userId: string,

    projectName: string,
    createdBy: string,
    creationDate: string,

    lastUpdatedBy: string,
    lastUpdateDate: string
}

export type Quesnaire = {
    "id": string,
    "title": string,
    "createTime": string,
    "startTime": string,
    "endTime": string,
    "surveyType":  string,
    "description":  string,
    "project":  string,
    "questions": [],
    "roles": number[]
}

export type User = {
    id: string
    role: number,
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
export type UserList = {
    data: User[],
    totalPage: number,
    currentPage: number,
}

export type ProjectQuesnaire = {
    project: Project,
    quesnaires: Quesnaire[]
}

export type ProjectQuesnaireList = {
    data: ProjectQuesnaire[],
    totalPage: number,
    currentPage: number,
}
