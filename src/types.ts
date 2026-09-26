export type UserRole = "admin" | "operations" | "driver" | "customer";
export type ShipmentStatus = "pending" | "confirmed" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "cancelled";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: UserRole;
  active: boolean;
  createdAt: unknown;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  customerId: string;
  customerName: string;
  origin: string;
  destination: string;
  cargoDescription: string;
  weightKg: number;
  status: ShipmentStatus;
  assignedDriverId?: string;
  createdAt: unknown;
  updatedAt: unknown;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  origin: string;
  destination: string;
  cargoDescription: string;
  weightKg: number;
  status: "requested" | "reviewed" | "converted" | "declined";
  createdAt: unknown;
}
