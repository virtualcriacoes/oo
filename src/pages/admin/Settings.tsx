import React, { useState, useRef } from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { ChromePicker } from 'react-color';
import { 
  Save, 
  Upload, 
  Key, 
  CheckCircle, 
  XCircle, 
  UserPlus, 
  Lock 
} from 'lucide-react';

function Settings() {
  const { 
    systemSettings, 
    updateSystemSettings, 
    updateApiStatus 
  } = useSettingsStore();
  
  const [logoPreview, setLogoPreview] = useState<string | null>(systemSettings.logo);
  const [primaryColor, setPrimaryColor] = useState(systemSettings.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(systemSettings.secondaryColor);
  const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false);
  const [showSecondaryColorPicker, setShowSecondaryColorPicker] = useState(false);
  
  const [apiKey, setApiKey] = useState(systemSettings.apiConfig.apiKey);
  const [apiName, setApiName] = useState(systemSettings.apiConfig.apiName);
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user'
  });
  
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoPreview(base64String);
        updateSystemSettings({ logo: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    updateSystemSettings({
      primaryColor,
      secondaryColor,
      companyName: systemSettings.companyName,
      apiConfig: {
        apiKey,
        apiName,
        apiStatus: systemSettings.apiConfig.apiStatus
      }
    });
  };

  const handleTestApiConnection = () => {
    updateApiStatus();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Configurações do Sistema</h1>
      
      {/* Logo Upload */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Logo da Empresa</h2>
        <div className="flex items-center space-x-4">
          {logoPreview && (
            <img 
              src={logoPreview} 
              alt="Logo Preview" 
              className="w-32 h-32 object-contain border rounded"
            />
          )}
          <button 
            onClick={() => logoInputRef.current?.click()}
            className="bg-primary text-white px-4 py-2 rounded flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Carregar Logo</span>
          </button>
          <input 
            type="file" 
            ref={logoInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Color Configuration */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Cores do Sistema</h2>
        <div className="flex space-x-4">
          <div>
            <label className="block mb-2">Cor Primária</label>
            <div className="flex items-center space-x-2">
              <div 
                onClick={() => setShowPrimaryColorPicker(!showPrimaryColorPicker)}
                className="w-12 h-12 rounded-full cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              />
              <span>{primaryColor}</span>
            </div>
            {showPrimaryColorPicker && (
              <ChromePicker 
                color={primaryColor}
                onChange={(color) => setPrimaryColor(color.hex)}
                onChangeComplete={() => setShowPrimaryColorPicker(false)}
              />
            )}
          </div>
          <div>
            <label className="block mb-2">Cor Secundária</label>
            <div className="flex items-center space-x-2">
              <div 
                onClick={() => setShowSecondaryColorPicker(!showSecondaryColorPicker)}
                className="w-12 h-12 rounded-full cursor-pointer"
                style={{ backgroundColor: secondaryColor }}
              />
              <span>{secondaryColor}</span>
            </div>
            {showSecondaryColorPicker && (
              <ChromePicker 
                color={secondaryColor}
                onChange={(color) => setSecondaryColor(color.hex)}
                onChangeComplete={() => setShowSecondaryColorPicker(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Configuração da API</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Nome da Aplicação API</label>
            <input 
              type="text" 
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Chave da API</label>
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
              />
              <button 
                onClick={handleTestApiConnection}
                className="bg-primary text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <Key className="w-5 h-5" />
                <span>Testar</span>
              </button>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              {systemSettings.apiConfig.apiStatus === 'connected' && (
                <>
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span className="text-green-600">Conexão estabelecida</span>
                </>
              )}
              {systemSettings.apiConfig.apiStatus === 'error' && (
                <>
                  <XCircle className="text-red-500 w-5 h-5" />
                  <span className="text-red-600">Erro na conexão</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSaveSettings}
          className="bg-primary text-white px-6 py-2 rounded flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  );
}

export default Settings;
