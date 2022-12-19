import {Page} from "../models/Page";

export interface Customer {
  id?: number;
  full_name:string;
  phone:string;
  age: Date;
  education:string;
  nationality:string;
  valid_trade_license:boolean;
  took_entrepreneurship_training:boolean;
  existing_relationships_with_enat_bank:boolean;
  branches:string;

}

export interface CustomerResponse {
  _embedded: {
    customersDTOes: Customer[];
  };
  page: Page;
}
