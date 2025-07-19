export const API_ENDPOINTS = {
  LOGING: "auth/login",
  REGISTER: "auth/signup",
  RESET_PASSWORD_REQUEST: "auth/reset-password-request",
  RESET_OTP: "auth/request-otp",
  VERIFY_PHONE_NUMBER: "auth/verify-mobile",
  RESET_PASSWORD: "auth/reset-password",
  CREATE_ORDER: "lead/create-order",
  DELETE_ORDER: "admin/orders/${orderId}",
  GET_AUTH: "auth/auth-data",
  GET_CLIENT_ORDERS: "lead/get-all-client-orders-paginated",
  GET_ADMIN_ORDERS: "admin/orders?page=${currentPage}&limit=8",
  STATUS_CHANGE: "lead/update-order-status",
  PAYMENT_STATUS_UPDATE: "admin/orders/${orderId}/payment_status",
};

