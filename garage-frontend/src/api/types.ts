export interface Box {
  id: number;
  free: boolean;
}

export interface RentInfo {
  clientFullName: string;
  clientAddress: string;
  carId: number;
  brandName: string;
  receiptNumber: string;
  startDate: string;
  endDate: string;
  pricePerDay: string;
}

export interface BoxDetail {
  free: boolean;
  rentInfo?: RentInfo;
  allowedBrands: Brand[];
}

export interface Brand {
  id: number;
  name: string;
}

export interface OccupiedBoxPrice {
  id: number;
  pricePerDay: string;
}

export interface OwnedCar {
  carId: number;
  brandName: string;
  occupyingBox: boolean;
  boxId?: number;
}

export interface ClientWithCars {
  id: number;
  fullName: string;
  address: string;
  ownedCars: OwnedCar[];
}

export interface CarWithEndDate {
  carId: number;
  brandName: string;
  occupyingBox: boolean;
  boxId: number;
  endDate: string;
}

export interface ClientWithCarsEndDate {
  id: number;
  fullName: string;
  address: string;
  ownedCars: CarWithEndDate[];
}

export interface CreateClient {
  firstName: string;
  lastName: string;
  middleName?: string;
  address?: string;
}

export interface CarAvailable {
  id: number;
  brandName: string;
  clientFullName: string;
}

export interface CreateCar {
  brandId: number;
  clientId: number;
}

export interface CreateRent {
  boxId: number;
  carId: number;
  receiptNumber: string;
  startDate: string;
  endDate: string;
  pricePerDay: string;
}
