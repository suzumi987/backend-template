class ApiModel implements IApiModel {
    public code: number
    public data: object | null | undefined | string
    public devMessage: string

    constructor(_data: object | null | undefined | string, _code: number, _devMessage: string) {
        this.data = _data
        this.code = _code
        this.devMessage = _devMessage
    }

    response(): IResponse {
        return {
            data: this.data,
            code: this.code,
            devMessage: this.devMessage
        }
    }
}

export { ApiModel }