import { useEffect, useState } from 'react';
import { VendorProvider } from '../../../contexts/vendor-context';
import { Vendor, VendorOrder, VendorPayout, VendorShipment, VendorNotification } from '../types/vendor';
import { PaginatedApiResponse } from '../types/responses';

export const useVendors = () => {
  const vendorService = VendorProvider();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await vendorService.getVendors();
        setVendors(response.data.results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch vendors');
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [vendorService]);

  return { vendors, loading, error };
};

export const useVendor = (id: string) => {
  const vendorService = useVendorService();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendor = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await vendorService.getVendor(id);
        setVendor(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch vendor');
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id, vendorService]);

  return { vendor, loading, error };
};

export const useVendorOrders = (id: string) => {
  const vendorService = useVendorService();
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await vendorService.getVendorOrders(id);
        setOrders(response.data.results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch vendor orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [id, vendorService]);

  return { orders, loading, error };
};

export const useVendorActions = () => {
  const vendorService = useVendorService();

  const followVendor = async (id: string) => {
    await vendorService.followVendor(id);
  };

  const unfollowVendor = async (id: string) => {
    await vendorService.unfollowVendor(id);
  };

  return { followVendor, unfollowVendor };
};

export const useVendorNotifications = (id: string) => {
  const vendorService = useVendorService();
  const [notifications, setNotifications] = useState<VendorNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await vendorService.getVendorNotifications(id);
        setNotifications(response.data.results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [id, vendorService]);

  return { notifications, loading, error };
};

export const useVendorPayouts = (id: string) => {
  const vendorService = useVendorService();
  const [payouts, setPayouts] = useState<VendorPayout[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayouts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await vendorService.getVendorPayouts(id);
        setPayouts(response.data.results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch payouts');
      } finally {
        setLoading(false);
      }
    };
    fetchPayouts();
  }, [id, vendorService]);

  return { payouts, loading, error };
};

export const useVendorShipments = (id: string) => {
  const vendorService = useVendorService();
  const [shipments, setShipments] = useState<VendorShipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await vendorService.getVendorShipments(id);
        setShipments(response.data.results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch shipments');
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, [id, vendorService]);

  return { shipments, loading, error };
};
