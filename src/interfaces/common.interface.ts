
export interface JSONObject {
  [ key : string]: string | boolean | [];
}

export interface IResponseService {
  code?: number
  data: string | Object | [] | JSONObject
}