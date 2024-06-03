const END_POINT = {
  AUTH: {
    LOGIN: '/api/user/sign-in',
    GET_ME: '/api/user/get-me',
    REGISTER: '/api/user/sign-up',
  },
  PRODUCT: {
    CREATE: '/api/product/create',
    UPDATE: '/api/product/update', // +'/:id'
    DELETE: '/api/product/delete', // +'/:id'
    DELETE_MANY: '/api/product/delete-many',
    GET_ALL: '/api/product/get-all',
  },
};

export default END_POINT;
