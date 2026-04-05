export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/auth/jwt/create/',
    REGISTER: '/users/auth/users/',
    REFRESH: '/users/auth/jwt/refresh/',
    ME: '/users/auth/users/me/',
  },
  DATASETS: {
    LIST: '/marketplace/datasets/',
    DETAIL: (id: string) => `/marketplace/datasets/${id}/`,
    UPLOAD: '/marketplace/datasets/upload/',
  },
  TASKS: {
    QUEUE: '/processing/tasks/',
    SUBMIT: (id: string) => `/processing/tasks/${id}/submit/`,
  },
};
