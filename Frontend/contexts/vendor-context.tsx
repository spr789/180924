"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { VendorService } from "@/lib/api/services/vendors"; // Import the service
import { Vendor, VendorOrder, VendorPayout, VendorShipment, VendorNotification, VendorLoginRequest } from "@/lib/api/types/vendor";
import { ApiResponse, PaginatedApiResponse } from "@/lib/api/types/responses";

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
  token: string | null;
  vendorToken: string | null;  // Added vendorToken
  setToken: (token: string | null) => void;
  setVendorToken: (token: string | null) => void; // Added setVendorToken
}

const VendorContext = createContext<VendorContextType | null>(null);

export function VendorProvider({ children }: { children: ReactNode }) {
  const vendorService = new VendorService();
  const [token, setToken] = useState<string | null>(null);  // Authentication token
  const [vendorToken, setVendorToken] = useState<string | null>(null);  // Vendor token

  // On initial load, check if there's a token in localStorage
  useEffect(() => {
    const savedVendorToken = localStorage.getItem("vendorToken");
    if (savedVendorToken) {
      setVendorToken(savedVendorToken);
    }
  }, []);

  // Fetch list of vendors
  const { data: vendors, isLoading, error } = useQuery<ApiResponse<PaginatedApiResponse<Vendor>>, Error>({
    queryKey: ["vendors"],
    queryFn: vendorService.getVendors
  });

  // Use mutations for follow and unfollow
  const followVendor = useMutation({
    mutationFn: vendorService.followVendor,
  });

  const unfollowVendor = useMutation({
    mutationFn: vendorService.unfollowVendor,
  });

  // Use mutations for login
  const loginVendor = useMutation({
    mutationFn: vendorService.loginVendor,
    onSuccess: (data) => {
      console.log("Login success:", data); // Check the response for token
      if (data.data.token && data.data.token.access) {  // Check if token exists and has 'access' property
        const vendorAccessToken = data.data.token.access;  
        setVendorToken(vendorAccessToken); // Store token in state
        localStorage.setItem("vendorToken", vendorAccessToken); // Save to localStorage
        console.log("Token saved to localStorage:", vendorAccessToken); // Ensure token is saved
      } else {
        console.error("Token not found in response."); // Log error if token is not found
      }
    },
  });

  // Use queries for vendor orders, payouts, shipments, notifications
  const getVendorOrders = (vendorId: string) => useQuery({
    queryKey: ["vendorOrders", vendorId],
    queryFn: () => vendorService.getVendorOrders(vendorId)
  });

  const getVendorPayouts = (vendorId: string) => useQuery({
    queryKey: ["vendorPayouts", vendorId],
    queryFn: () => vendorService.getVendorPayouts(vendorId)
  });

  const getVendorShipments = (vendorId: string) => useQuery({
    queryKey: ["vendorShipments", vendorId],
    queryFn: () => vendorService.getVendorShipments(vendorId)
  });

  const getVendorNotifications = (vendorId: string) => useQuery({
    queryKey: ["vendorNotifications", vendorId],
    queryFn: () => vendorService.getVendorNotifications(vendorId)
  });

  return (
    <VendorContext.Provider value={{ 
      vendors: vendors ? { ...vendors, data: vendors.data.data } : undefined, 
      isLoading, 
      error: error ? new Error(error.message) : null, 
      loginVendor,
      followVendor, 
      unfollowVendor, 
      getVendorOrders, 
      getVendorPayouts, 
      getVendorShipments, 
      getVendorNotifications,
      token,
      vendorToken,  // Passing the vendor token to context
      setToken, 
      setVendorToken  // Providing setter for vendor token
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
