import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config/endpoints';
import { Vendor, VendorOrder, VendorPayout, VendorShipment, VendorNotification, VendorLoginRequest } from '../types/vendor';
import { ApiResponse, PaginatedApiResponse } from '../types/responses';

export class VendorService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getVendors(): Promise<ApiResponse<PaginatedApiResponse<Vendor>>> {
    return this.client.get<PaginatedApiResponse<Vendor>>(API_ENDPOINTS.VENDORS.LIST);
  }

  async getVendor(id: string): Promise<ApiResponse<Vendor>> {
    return this.client.get<Vendor>(API_ENDPOINTS.VENDORS.DETAIL(id));
  }

  async followVendor(id: string): Promise<ApiResponse<void>> {
    return this.client.post<void>(`${API_ENDPOINTS.VENDORS.DETAIL(id)}/follow`, {});
  }

  async unfollowVendor(id: string): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`${API_ENDPOINTS.VENDORS.DETAIL(id)}/follow`);
  }

  async getVendorOrders(id: string): Promise<ApiResponse<PaginatedApiResponse<VendorOrder>>> {
    return this.client.get<PaginatedApiResponse<VendorOrder>>(`${API_ENDPOINTS.VENDORS.DETAIL(id)}/orders`);
  }

  async getVendorPayouts(id: string): Promise<ApiResponse<PaginatedApiResponse<VendorPayout>>> {
    return this.client.get<PaginatedApiResponse<VendorPayout>>(`${API_ENDPOINTS.VENDORS.DETAIL(id)}/payouts`);
  }

  async getVendorShipments(id: string): Promise<ApiResponse<PaginatedApiResponse<VendorShipment>>> {
    return this.client.get<PaginatedApiResponse<VendorShipment>>(`${API_ENDPOINTS.VENDORS.DETAIL(id)}/shipments`);
  }

  async getVendorNotifications(id: string): Promise<ApiResponse<PaginatedApiResponse<VendorNotification>>> {
    return this.client.get<PaginatedApiResponse<VendorNotification>>(`${API_ENDPOINTS.VENDORS.DETAIL(id)}/notifications`);
  }

  async loginVendor(credentials: VendorLoginRequest): Promise<ApiResponse<Vendor>> {
    console.log('Logging in vendor with credentials:', credentials);
    return this.client.post<Vendor>(API_ENDPOINTS.VENDORS.LOGIN, credentials);
  }
}