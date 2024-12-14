"use client";

import { createContext, useContext, ReactNode } from "react";
import { useVendors } from "@/lib/api/hooks/useVendors";
import { Vendor, VendorOrder, VendorPayout, VendorShipment, VendorNotification, VendorLoginRequest } from "@/lib/api/types/vendor";
import { ApiResponse, PaginatedApiResponse } from "@/lib/api/types/responses";
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

interface VendorContextType {
  vendors: ApiResponse<PaginatedApiResponse<Vendor>> | undefined;
  isLoading: boolean;
  error: Error | null;
  loginVendor: UseMutationResult<ApiResponse<Vendor>, Error, VendorLoginRequest>;
  followVendor: UseMutationResult<ApiResponse<void>, Error, string>;
  unfollowVendor: UseMutationResult<ApiResponse<void>, Error, string>;
  getVendorOrders: (vendorId: string) => UseQueryResult<ApiResponse<PaginatedApiResponse<VendorOrder>>, Error>;
  getVendorPayouts: (vendorId: string) => UseQueryResult<ApiResponse<PaginatedApiResponse<VendorPayout>>, Error>;
  getVendorShipments: (vendorId: string) => UseQueryResult<ApiResponse<PaginatedApiResponse<VendorShipment>>, Error>;
  getVendorNotifications: (vendorId: string) => UseQueryResult<ApiResponse<PaginatedApiResponse<VendorNotification>>, Error>;
}

const VendorContext = createContext<VendorContextType | null>(null);

export function VendorProvider({ children }: { children: ReactNode }) {
  const { 
    vendors, 
    isLoading, 
    error, 
    loginVendor,
    followVendor, 
    unfollowVendor, 
    getVendorOrders, 
    getVendorPayouts, 
    getVendorShipments, 
    getVendorNotifications 
  } = useVendors();

  return (
    <VendorContext.Provider value={{ 
      vendors, 
      isLoading, 
      error, 
      loginVendor,
      followVendor, 
      unfollowVendor, 
      getVendorOrders, 
      getVendorPayouts, 
      getVendorShipments, 
      getVendorNotifications 
    }}>
      {children}
    </VendorContext.Provider>
  );
}

export function useVendorContext() {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error("useVendorContext must be used within a VendorProvider");
  }
  return context;
}
