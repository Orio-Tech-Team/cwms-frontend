export type OrderType = "Normal" | "Advance";
type PurchaseOrderType = {
  vendor_id: number;
  vendor_name: string;
  address: string;
  city: string;
  ntn: string;
  advance_income: string;
  strn: string;
  payment_terms: string;
  expected_delivery_date: string;
  delivery_location: string;
  po_type: string;
  arrival_date: Date;
  order_status: string;
  order_type: OrderType;
  total_amount: number;
  total_discount: number;
  sales_tax: number;
  advance_income_tax: number;
  net_amount: number;
  status: string;
  id: number;
  created_at?: string;
  updated_at?: Date;
  purchase_order_detail?: any[];
};
export default PurchaseOrderType;
