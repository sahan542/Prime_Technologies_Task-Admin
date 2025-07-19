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

  GET_ALL_PRODUCTS: "admin/products/products?page=${currentPage}&limit=8",
  DELETE_PRODUCT_BYID: "admin/products/${productIdToDelete}",
  EDIT_PRODUCT_BYID: "admin/products/${id}/edit",
  GET_PRODUCT_BYID: "admin/products/${id}",
  ADD_NEW_PRODUCT: "admin/products/",





  GET_ALL_USERS: "admin/users?page=${currentPage}&limit=8",
  EXPORT_ALL_USERS: "admin/users/export",
  TOGGLE_ADMIN_STATUS: "admin/users/${id}/admin-status",
  DELETE_USER: "admin/users/${id}",

  GET_ALL_REVIEWS: "admin/reviews?page=${currentPage}&limit=8",
  UPDATE_REVIEW_PUBLIC_STATUS: "admin/reviews/${reviewId}?is_public=${updatedIsPublic}",
  DELETE_REVIEW_BYID: "admin/reviews/${reviewId}",



  STATUS_CHANGE: "lead/update-order-status",
  PAYMENT_STATUS_UPDATE: "admin/orders/${orderId}/payment_status",
};

