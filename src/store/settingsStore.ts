import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SystemSettings, UserManagement } from '../types/settings';
import { asaasApi } from '../lib/asaas';

interface SettingsState {
  systemSettings: SystemSettings;
  userManagement: UserManagement;
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;
  updateApiStatus: () => Promise<void>;
  addUser: (user: Omit<UserManagement['users'][0], 'id' | 'createdAt'>) => void;
  changePassword: (userId: string, newPassword: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      systemSettings: {
        companyName: 'RadioCast',
        primaryColor: '#193993',
        secondaryColor: '#ff8100',
        logo: null,
        apiConfig: {
          apiName: 'Asaas',
          apiKey: '',
          apiStatus: 'not_tested'
        }
      },
      userManagement: {
        users: []
      },
      updateSystemSettings: (settings) => set(state => ({
        systemSettings: { ...state.systemSettings, ...settings }
      })),
      updateApiStatus: async () => {
        try {
          // Test Asaas API connection
          await asaasApi.get('/customers', { params: { limit: 1 } });
          set(state => ({
            systemSettings: {
              ...state.systemSettings,
              apiConfig: {
                ...state.systemSettings.apiConfig,
                apiStatus: 'connected'
              }
            }
          }));
        } catch (error) {
          set(state => ({
            systemSettings: {
              ...state.systemSettings,
              apiConfig: {
                ...state.systemSettings.apiConfig,
                apiStatus: 'error'
              }
            }
          }));
        }
      },
      addUser: (userData) => set(state => {
        const newUser = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date()
        };
        return {
          userManagement: {
            users: [...state.userManagement.users, newUser]
          }
        };
      }),
      changePassword: (userId, newPassword) => {
        // Placeholder for password change logic
        console.log(`Changing password for user ${userId}`);
      }
    }),
    {
      name: 'system-settings-storage',
      version: 1
    }
  )
);
