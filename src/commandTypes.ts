export type FleetStatus="AVAILABLE"|"ON ROUTE"|"LOADING"|"DELIVERING"|"MAINTENANCE"|"OUT OF SERVICE";
export type DriverStatus="Available"|"Assigned"|"On Trip"|"Off Duty"|"Suspended"|"Inactive";
export interface Vehicle{registrationNumber:string;truckType:string;status:FleetStatus;driverName?:string;currentRoute?:string;mileage?:number;insuranceExpiry?:string;inspectionExpiry?:string}
export interface DriverRecord{name:string;phone?:string;licenseNumber?:string;status:DriverStatus;assignedVehicle?:string;assignedRoute?:string;emergencyContact?:string}
