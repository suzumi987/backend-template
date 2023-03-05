declare interface IResponse {
    code: number
    data: object | null | undefined | string
    devMessage: string
}

declare interface IPaginationRequest {
    limit: number
    page: number
    offset: number
}

declare interface IApiModel extends IResponse {
    response: () => IResponse
}