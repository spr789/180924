import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Vendor } from '../types/vendor';
import { ApiResponse, PaginatedResponse } from '../types/responses';

export class VendorService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getVendors(): Promise<ApiResponse<PaginatedResponse<Vendor>>> {
    return this.client.get<PaginatedResponse<Vendor>>(API_ENDPOINTS.VENDORS.LIST);
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
}