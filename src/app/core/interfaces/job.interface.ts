import { IPosition } from "./position.interface";

export interface IJob {
  id: number,
  companyName: string,
  companyWebPage: string,
  description: string,
  positions:IPosition []
}
