import axios from 'axios';

const ASAAS_API_KEY = '$aact_MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6Ojg5ZmZhZjg3LWZjMGYtNDY3Ny04MjgzLTRiMzJmNDQ3NDg0Njo6JGFhY2hfNjc4YzA5NGUtNWYxOC00YTRhLTg5NTgtMTc4ZGNmYmZkMjhl';
const ASAAS_API_URL = 'https://api.asaas.com/v3';

interface AsaasCustomer {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  mobilePhone: string;
}

interface AsaasPayment {
  id: string;
  value: number;
  dueDate: string;
  status: string;
}

export const asaasApi = axios.create({
  baseURL: ASAAS_API_URL,
  headers: {
    'access_token': ASAAS_API_KEY,
    'Content-Type': 'application/json',
    'User-Agent': 'painelcobranças1',
    'Accept': 'application/json'
  },
  timeout: 30000,
  withCredentials: false
});

// Add request interceptor
asaasApi.interceptors.request.use(
  (config) => {
    // Ensure headers are properly set for each request
    if (!config.headers) {
      config.headers = {};
    }
    
    config.headers['access_token'] = ASAAS_API_KEY;
    config.headers['User-Agent'] = 'painelcobranças1';
    
    // Add timestamp to prevent caching
    if (config.params) {
      config.params = { ...config.params, _t: Date.now() };
    } else {
      config.params = { _t: Date.now() };
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
asaasApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject({
        message: error.response.data.message || 'Server error',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({
        message: 'Could not connect to the server. Please check your internet connection.',
        status: 0
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({
        message: error.message || 'An error occurred while processing your request.',
        status: 0
      });
    }
  }
);

export const findCustomerByCPF = async (cpf: string): Promise<AsaasCustomer | null> => {
  try {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // For development testing
    if (process.env.NODE_ENV === 'development' && cleanCPF === '00000000000') {
      return {
        id: 'mock-id',
        name: 'Usuário Teste',
        email: 'teste@example.com',
        cpfCnpj: '00000000000',
        mobilePhone: '11999999999'
      };
    }

    const response = await asaasApi.get('/customers', {
      params: {
        cpfCnpj: cleanCPF
      }
    });

    if (!response.data || !response.data.data) {
      console.error('Invalid response format:', response);
      return null;
    }
    
    const customers = response.data.data;
    return customers && customers.length > 0 ? customers[0] : null;
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      throw new Error(String(error.message));
    }
    throw new Error('Failed to find customer');
  }
};

export const getCustomerPayments = async (customerId: string): Promise<AsaasPayment[]> => {
  try {
    // For development testing
    if (process.env.NODE_ENV === 'development' && customerId === 'mock-id') {
      return [{
        id: 'payment-1',
        value: 99.90,
        dueDate: '2024-03-15',
        status: 'PENDING'
      }];
    }

    const response = await asaasApi.get('/payments', {
      params: {
        customer: customerId
      }
    });

    if (!response.data || !response.data.data) {
      console.error('Invalid response format:', response);
      return [];
    }

    return response.data.data;
  } catch (error) {
    console.error('Failed to get payments:', error);
    return [];
  }
};
