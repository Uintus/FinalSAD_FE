// type of order item
export type OrderItem = {
  product_id: string ;
  quantity: number;
};


// type of order form
export type OrderForm = {
  customer_name: string;
  status: string;
  created_at: string;
  items: OrderItem[];
};

// type of order item
export type OrderItemRequest = {
  product_id: number ;
  quantity: number;
};


// type of order form
export type OrderFormRequest= {
  customer_name: string;
  status: string;
  created_at: string;
  items: OrderItemRequest[];
};
