type PurchaseOrderDetailType = {
  product_id: number;
  product_name: string;
  manufacturer_id: string;
  manufacturer_name: string;
  required_quantity: number;
  trade_price: number;
  trade_discount_percentage: number;
  sales_tax_percentage: number;
  gst_percentage: number;
  uom: string;
  batch_no: string;
  comment: string;
  batch_expiry: Date;
  foc: boolean;
  trade_discount: number;
};
export default PurchaseOrderDetailType;
