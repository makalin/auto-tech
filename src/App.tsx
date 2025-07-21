import React, { useState, useEffect } from 'react';
import { Search, Settings, Wrench, Book, Calculator, AlertTriangle, FileText, Palette, Bell, Car } from 'lucide-react';

interface CarModel {
  id: string;
  name: string;
  year: string;
  type: string;
}

interface CarPart {
  id: string;
  name: string;
  position: { x: number; y: number };
  description: string;
  partNumber: string;
  maintenanceInterval: string;
  price: string;
}

interface MaintenanceRecord {
  id: string;
  date: string;
  mileage: string;
  service: string;
  cost: string;
  notes: string;
}

interface DiagnosticCode {
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  solution: string;
}

interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string;
    bgSecondary: string;
    border: string;
    text: string;
    textSecondary: string;
    accent: string;
    accentSecondary: string;
    success: string;
    warning: string;
    error: string;
  };
}

const themes: Theme[] = [
  {
    id: 'terminal',
    name: 'Terminal Green',
    colors: {
      bg: 'bg-gray-900',
      bgSecondary: 'bg-gray-800',
      border: 'border-green-400',
      text: 'text-green-400',
      textSecondary: 'text-green-300',
      accent: 'text-amber-400',
      accentSecondary: 'text-amber-300',
      success: 'text-green-400',
      warning: 'text-yellow-400',
      error: 'text-red-400'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: {
      bg: 'bg-slate-900',
      bgSecondary: 'bg-slate-800',
      border: 'border-cyan-400',
      text: 'text-cyan-400',
      textSecondary: 'text-cyan-300',
      accent: 'text-orange-400',
      accentSecondary: 'text-orange-300',
      success: 'text-emerald-400',
      warning: 'text-amber-400',
      error: 'text-red-400'
    }
  },
  {
    id: 'amber',
    name: 'Amber CRT',
    colors: {
      bg: 'bg-stone-900',
      bgSecondary: 'bg-stone-800',
      border: 'border-amber-500',
      text: 'text-amber-400',
      textSecondary: 'text-amber-300',
      accent: 'text-orange-400',
      accentSecondary: 'text-orange-300',
      success: 'text-lime-400',
      warning: 'text-yellow-400',
      error: 'text-red-400'
    }
  },
  {
    id: 'matrix',
    name: 'Matrix',
    colors: {
      bg: 'bg-black',
      bgSecondary: 'bg-gray-900',
      border: 'border-lime-400',
      text: 'text-lime-400',
      textSecondary: 'text-lime-300',
      accent: 'text-green-400',
      accentSecondary: 'text-green-300',
      success: 'text-emerald-400',
      warning: 'text-yellow-400',
      error: 'text-red-400'
    }
  },
  {
    id: 'retro',
    name: 'Retro Blue',
    colors: {
      bg: 'bg-indigo-950',
      bgSecondary: 'bg-indigo-900',
      border: 'border-blue-400',
      text: 'text-blue-300',
      textSecondary: 'text-blue-200',
      accent: 'text-violet-400',
      accentSecondary: 'text-violet-300',
      success: 'text-emerald-400',
      warning: 'text-amber-400',
      error: 'text-red-400'
    }
  }
];

const carModels: CarModel[] = [
  { id: 'prelude', name: 'Honda Prelude', year: '1992-1996', type: 'Sport Coupe' },
  { id: 'cj5', name: 'Jeep CJ5', year: '1972-1983', type: 'Off-Road Vehicle' }
];

const carParts: Record<string, CarPart[]> = {
  prelude: [
    { id: 'engine', name: 'H22A1 Engine', position: { x: 50, y: 35 }, description: '2.2L VTEC Engine', partNumber: 'H22A1-001', maintenanceInterval: '3,000 miles', price: '$2,500' },
    { id: 'transmission', name: 'Manual Transmission', position: { x: 45, y: 55 }, description: '5-Speed Manual', partNumber: 'MT-H22-001', maintenanceInterval: '30,000 miles', price: '$800' },
    { id: 'brakes-front', name: 'Front Brake System', position: { x: 30, y: 25 }, description: 'Disc Brake Assembly', partNumber: 'FB-PRE-001', maintenanceInterval: '12,000 miles', price: '$150' },
    { id: 'brakes-rear', name: 'Rear Brake System', position: { x: 30, y: 75 }, description: 'Disc Brake Assembly', partNumber: 'RB-PRE-001', maintenanceInterval: '12,000 miles', price: '$120' },
    { id: 'suspension-front', name: 'Front Suspension', position: { x: 25, y: 30 }, description: 'MacPherson Strut', partNumber: 'FS-PRE-001', maintenanceInterval: '60,000 miles', price: '$300' },
    { id: 'suspension-rear', name: 'Rear Suspension', position: { x: 25, y: 70 }, description: 'Double Wishbone', partNumber: 'RS-PRE-001', maintenanceInterval: '60,000 miles', price: '$350' },
    { id: 'ecu', name: 'Engine Control Unit', position: { x: 60, y: 40 }, description: 'OBD1 ECU', partNumber: 'ECU-H22-001', maintenanceInterval: 'As needed', price: '$400' },
    { id: 'alternator', name: 'Alternator', position: { x: 55, y: 30 }, description: '90A Alternator', partNumber: 'ALT-PRE-001', maintenanceInterval: '100,000 miles', price: '$180' }
  ],
  cj5: [
    { id: 'engine', name: 'AMC 304 V8', position: { x: 50, y: 40 }, description: '5.0L V8 Engine', partNumber: 'AMC304-001', maintenanceInterval: '3,000 miles', price: '$3,200' },
    { id: 'transmission', name: '3-Speed Manual', position: { x: 45, y: 60 }, description: 'T-150 Manual', partNumber: 'T150-001', maintenanceInterval: '30,000 miles', price: '$600' },
    { id: 'transfer-case', name: 'Transfer Case', position: { x: 40, y: 65 }, description: 'Dana 20', partNumber: 'D20-001', maintenanceInterval: '30,000 miles', price: '$400' },
    { id: 'axle-front', name: 'Front Axle', position: { x: 20, y: 30 }, description: 'Dana 30 Front', partNumber: 'D30F-001', maintenanceInterval: '50,000 miles', price: '$800' },
    { id: 'axle-rear', name: 'Rear Axle', position: { x: 20, y: 70 }, description: 'Dana 44 Rear', partNumber: 'D44R-001', maintenanceInterval: '50,000 miles', price: '$900' },
    { id: 'rollbar', name: 'Roll Bar', position: { x: 50, y: 20 }, description: 'Factory Roll Bar', partNumber: 'RB-CJ5-001', maintenanceInterval: 'Inspect Annually', price: '$250' },
    { id: 'carburetor', name: 'Carburetor', position: { x: 55, y: 35 }, description: '2-Barrel Carburetor', partNumber: 'CARB-304-001', maintenanceInterval: '12,000 miles', price: '$320' },
    { id: 'distributor', name: 'Distributor', position: { x: 45, y: 35 }, description: 'Points Distributor', partNumber: 'DIST-304-001', maintenanceInterval: '6,000 miles', price: '$150' }
  ]
};

const maintenanceSchedules: Record<string, Array<{ interval: string; tasks: string[] }>> = {
  prelude: [
    { interval: '3,000 miles', tasks: ['Engine oil change', 'Oil filter replacement', 'Check fluid levels'] },
    { interval: '6,000 miles', tasks: ['Tire rotation', 'Check brake pads', 'Inspect belts'] },
    { interval: '12,000 miles', tasks: ['Brake inspection', 'Replace air filter', 'Check spark plugs'] },
    { interval: '30,000 miles', tasks: ['Transmission service', 'Coolant flush', 'Replace timing belt'] },
    { interval: '60,000 miles', tasks: ['Major service', 'Replace suspension components', 'Valve adjustment'] }
  ],
  cj5: [
    { interval: '3,000 miles', tasks: ['Engine oil change', 'Oil filter replacement', 'Grease all fittings'] },
    { interval: '6,000 miles', tasks: ['Tire rotation', 'Check brake shoes', 'Inspect u-joints'] },
    { interval: '12,000 miles', tasks: ['Brake adjustment', 'Replace air filter', 'Check points and plugs'] },
    { interval: '30,000 miles', tasks: ['Transmission/Transfer case service', 'Differential service', 'Replace carburetor filter'] },
    { interval: '50,000 miles', tasks: ['Major service', 'Rebuild carburetor', 'Inspect frame for rust'] }
  ]
};

const diagnosticCodes: Record<string, DiagnosticCode[]> = {
  prelude: [
    { code: 'P0301', description: 'Cylinder 1 Misfire', severity: 'high', solution: 'Check spark plug, ignition coil, or fuel injector' },
    { code: 'P0420', description: 'Catalyst System Efficiency', severity: 'medium', solution: 'Replace catalytic converter or oxygen sensor' },
    { code: 'P0505', description: 'Idle Air Control', severity: 'low', solution: 'Clean or replace IAC valve' },
    { code: 'P1259', description: 'VTEC System Malfunction', severity: 'high', solution: 'Check VTEC solenoid and oil pressure' }
  ],
  cj5: [
    { code: 'E001', description: 'Carburetor Float Stuck', severity: 'medium', solution: 'Clean carburetor float chamber' },
    { code: 'E002', description: 'Points Gap Incorrect', severity: 'high', solution: 'Adjust points gap to 0.016"' },
    { code: 'E003', description: 'Timing Off', severity: 'high', solution: 'Set timing to 5° BTDC' },
    { code: 'E004', description: 'Choke Not Operating', severity: 'low', solution: 'Check choke cable and linkage' }
  ]
};

const maintenanceRecords: Record<string, MaintenanceRecord[]> = {
  prelude: [
    { id: '1', date: '2024-01-15', mileage: '145,230', service: 'Oil Change & Filter', cost: '$45', notes: 'Used 5W-30 synthetic' },
    { id: '2', date: '2024-02-20', mileage: '147,890', service: 'Brake Pad Replacement', cost: '$180', notes: 'Front pads only' },
    { id: '3', date: '2024-03-10', mileage: '149,120', service: 'Timing Belt Service', cost: '$650', notes: 'Replaced belt, tensioner, water pump' }
  ],
  cj5: [
    { id: '1', date: '2024-01-08', mileage: '89,450', service: 'Carburetor Rebuild', cost: '$280', notes: 'Complete rebuild with new gaskets' },
    { id: '2', date: '2024-02-12', mileage: '90,120', service: 'U-Joint Replacement', cost: '$95', notes: 'Rear driveshaft u-joints' },
    { id: '3', date: '2024-03-05', mileage: '91,200', service: 'Differential Service', cost: '$120', notes: 'Front and rear diff oil change' }
  ]
};

// Add interface for VIN API response
interface VinResult {
  Variable: string;
  Value: string | null;
}

function App() {
  const [selectedModel, setSelectedModel] = useState<string>('prelude');
  const [selectedPart, setSelectedPart] = useState<CarPart | null>(null);
  const [activeTab, setActiveTab] = useState<'parts' | 'maintenance' | 'manual' | 'diagnostics' | 'calculator' | 'records'>('parts');
  const [searchTerm, setSearchTerm] = useState('');
  const [calculatorValues, setCalculatorValues] = useState({
    displacement: '',
    bore: '',
    stroke: '',
    combustionChamber: ''
  });
  const [currentTheme, setCurrentTheme] = useState<string>('terminal');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [currentMileage] = useState('');

  // VIN decoder stub
  const [vin, setVin] = useState('');
  const [vinResult, setVinResult] = useState<VinResult[] | null>(null);
  const handleVinDecode = async () => {
    setVinResult(null);
    if (!vin || vin.length < 5) {
      setNotification('Please enter a valid VIN.');
      return;
    }
    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
      const data = await res.json();
      if (data.Results) {
        setVinResult(data.Results);
        const model = data.Results.find((r: VinResult) => r.Variable === 'Model')?.Value;
        const make = data.Results.find((r: VinResult) => r.Variable === 'Make')?.Value;
        const year = data.Results.find((r: VinResult) => r.Variable === 'Model Year')?.Value;
        // Try to match with carModels
        const match = carModels.find(m => m.name.toLowerCase().includes((model||'').toLowerCase()) && m.year.includes(year));
        if (match) {
          setNotification(`VIN decoded: ${year} ${make} ${model}. Click to select.`);
          // Optionally, allow auto-select
          // setSelectedModel(match.id);
        } else {
          setNotification(`VIN decoded: ${year} ${make} ${model}. No exact match in database.`);
        }
      } else {
        setNotification('VIN decode failed.');
      }
    } catch {
      setNotification('VIN decode failed.');
    }
  };
  // Notification placeholder
  const [notification, setNotification] = useState<string | null>(null);

  // Add state for each calculator
  const [fuelDistance, setFuelDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');
  const [costTotal, setCostTotal] = useState('');
  const [costDistance, setCostDistance] = useState('');
  const [tireWidth, setTireWidth] = useState('');
  const [tireAspect, setTireAspect] = useState('');
  const [tireDiameter, setTireDiameter] = useState('');
  const [oilLast, setOilLast] = useState('');
  const [oilCurrent, setOilCurrent] = useState('');
  const [oilInterval, setOilInterval] = useState('');
  // Calculator logic
  const mpg = fuelDistance && fuelUsed && !isNaN(parseFloat(fuelDistance)) && !isNaN(parseFloat(fuelUsed)) && parseFloat(fuelUsed) > 0
    ? (parseFloat(fuelDistance) / parseFloat(fuelUsed)).toFixed(2)
    : '';
  const lPer100km = fuelDistance && fuelUsed && !isNaN(parseFloat(fuelDistance)) && !isNaN(parseFloat(fuelUsed)) && parseFloat(fuelDistance) > 0
    ? (100 * parseFloat(fuelUsed) / parseFloat(fuelDistance)).toFixed(2)
    : '';
  const costPerMile = costTotal && costDistance && !isNaN(parseFloat(costTotal)) && !isNaN(parseFloat(costDistance)) && parseFloat(costDistance) > 0
    ? (parseFloat(costTotal) / parseFloat(costDistance)).toFixed(2)
    : '';
  const costPerKm = costTotal && costDistance && !isNaN(parseFloat(costTotal)) && !isNaN(parseFloat(costDistance)) && parseFloat(costDistance) > 0
    ? (parseFloat(costTotal) / (parseFloat(costDistance) * 1.60934)).toFixed(2)
    : '';
  const tireOverallDiameter = tireWidth && tireAspect && tireDiameter && !isNaN(parseFloat(tireWidth)) && !isNaN(parseFloat(tireAspect)) && !isNaN(parseFloat(tireDiameter))
    ? (((parseFloat(tireWidth) * (parseFloat(tireAspect) / 100) * 2) / 25.4) + parseFloat(tireDiameter)).toFixed(2)
    : '';
  const tireCircumference = tireOverallDiameter && !isNaN(parseFloat(tireOverallDiameter))
    ? (parseFloat(tireOverallDiameter) * Math.PI).toFixed(2)
    : '';
  const oilNext = oilLast && oilInterval && !isNaN(parseFloat(oilLast)) && !isNaN(parseFloat(oilInterval))
    ? (parseFloat(oilLast) + parseFloat(oilInterval)).toString()
    : '';
  const oilMilesLeft = oilCurrent && oilNext && !isNaN(parseFloat(oilCurrent)) && !isNaN(parseFloat(oilNext))
    ? (parseFloat(oilNext) - parseFloat(oilCurrent)).toString()
    : '';

  const theme = themes.find(t => t.id === currentTheme) || themes[0];
  const currentParts = carParts[selectedModel] || [];
  const currentMaintenance = maintenanceSchedules[selectedModel] || [];
  const currentDiagnostics = diagnosticCodes[selectedModel] || [];
  const currentRecords = maintenanceRecords[selectedModel] || [];

  const filteredParts = currentParts.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.partNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateCompressionRatio = () => {
    const { displacement, bore, stroke, combustionChamber } = calculatorValues;
    if (!displacement || !bore || !stroke || !combustionChamber) return 'Enter all values';
    const d = parseFloat(displacement);
    const b = parseFloat(bore);
    const s = parseFloat(stroke);
    const cc = parseFloat(combustionChamber);
    if (isNaN(d) || isNaN(b) || isNaN(s) || isNaN(cc) || cc <= 0) return 'Invalid input';
    const cylinderVolume = (Math.PI * Math.pow(b / 2, 2) * s) / 1000;
    const compressionRatio = (cylinderVolume + cc) / cc;
    return compressionRatio.toFixed(1) + ':1';
  };

  useEffect(() => {
    // Check for overdue or soon-due maintenance
    const current = parseInt(currentMileage) || 0;
    const schedule = maintenanceSchedules[selectedModel] || [];
    let soonDue = null;
    for (const item of schedule) {
      const interval = parseInt(item.interval.replace(/[^\d]/g, ''));
      if (!interval) continue;
      const nextService = Math.ceil(current / interval) * interval;
      const remaining = nextService - current;
      if (remaining <= 500 && remaining > 0) {
        soonDue = `Maintenance due in ${remaining} miles: ${item.tasks.join(', ')}`;
        break;
      } else if (remaining <= 0) {
        soonDue = `OVERDUE maintenance: ${item.tasks.join(', ')}`;
        break;
      }
    }
    if (soonDue) setNotification(soonDue);
    else setNotification(null);
  }, [selectedModel, currentMileage, maintenanceRecords]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className={`min-h-screen ${theme.colors.bg} ${theme.colors.text} font-mono`}>
      {/* Notification Banner */}
      {notification && (
        <div className={`fixed top-0 left-0 w-full z-50 p-4 text-center ${theme.colors.warning} bg-black bg-opacity-80`}> 
          <Bell className="inline mr-2" />{notification}
          <button onClick={() => setNotification(null)} className="ml-4 text-lg">✕</button>
        </div>
      )}
      {/* Retro Header */}
      <div className={`${theme.colors.bgSecondary} border-b-2 ${theme.colors.border} p-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`text-2xl font-bold ${theme.colors.accent}`}>
              ◄ AUTO-TECH SYSTEM v2.1 ►
            </div>
            <div className={`text-sm ${theme.colors.textSecondary}`}>
              [ AUTOMOTIVE DATABASE & MAINTENANCE TERMINAL ]
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className={`flex items-center space-x-2 px-3 py-2 border ${theme.colors.border} hover:${theme.colors.bgSecondary} transition-all`}
              >
                <Palette className="h-4 w-4" />
                <span className="text-sm">THEME</span>
              </button>
              
              {showThemeSelector && (
                <div className={`absolute right-0 top-full mt-2 ${theme.colors.bgSecondary} border ${theme.colors.border} shadow-lg z-50 min-w-48`}>
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setCurrentTheme(t.id);
                        setShowThemeSelector(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-all ${
                        currentTheme === t.id 
                          ? `${theme.colors.accent} bg-opacity-20` 
                          : `hover:${theme.colors.bgSecondary} hover:bg-opacity-50`
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <div className={theme.colors.accent}>STATUS:</div>
              <div className={`${theme.colors.accentSecondary} animate-pulse`}>● ONLINE</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen min-h-screen">
        {/* Left Sidebar - Model Selection & Info */}
        <div className={`w-80 ${theme.colors.bgSecondary} border-r-2 ${theme.colors.border} p-4 overflow-y-auto h-full`}>
          <div className="mb-6">
            <div className={`text-lg font-bold ${theme.colors.accent} mb-3`}>[ VEHICLE SELECTION ]</div>
            <div className="space-y-2">
              {carModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id);
                    setSelectedPart(null);
                  }}
                  className={`w-full p-3 text-left border transition-all duration-200 ${
                    selectedModel === model.id
                      ? `${theme.colors.border} ${theme.colors.accent} bg-opacity-20`
                      : `${theme.colors.border} hover:${theme.colors.border} hover:bg-opacity-10`
                  }`}
                >
                  <div className="font-bold">{model.name}</div>
                  <div className="text-sm opacity-80">{model.year} • {model.type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className={`text-lg font-bold ${theme.colors.accent} mb-3`}>[ PART SEARCH ]</div>
            <div className="relative">
              <Search className={`absolute left-3 top-3 h-4 w-4 ${theme.colors.textSecondary}`} />
              <input
                type="text"
                placeholder="Search parts or part numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 p-3 ${theme.colors.bg} border ${theme.colors.border} ${theme.colors.text} placeholder-opacity-60 focus:${theme.colors.border} focus:ring-1 focus:ring-opacity-50 focus:outline-none`}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-4">
            <div className={`grid grid-cols-3 gap-1 border ${theme.colors.border}`}>
              {[
                { key: 'parts', label: 'PARTS', icon: Settings },
                { key: 'maintenance', label: 'MAINT', icon: Wrench },
                { key: 'manual', label: 'MANUAL', icon: Book },
                { key: 'diagnostics', label: 'DIAG', icon: AlertTriangle },
                { key: 'calculator', label: 'CALC', icon: Calculator },
                { key: 'records', label: 'LOGS', icon: FileText }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'parts' | 'maintenance' | 'manual' | 'diagnostics' | 'calculator' | 'records')}
                    className={`flex-1 p-2 flex items-center justify-center space-x-2 transition-all ${
                      activeTab === tab.key
                        ? `${theme.colors.accent} bg-opacity-20 ${theme.colors.border}`
                        : `hover:bg-opacity-10`
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-bold">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'parts' && (
            <div>
              <div className={`text-lg font-bold ${theme.colors.accent} mb-3`}>[ COMPONENTS ]</div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredParts.map(part => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className={`w-full p-3 text-left border transition-all ${
                      selectedPart?.id === part.id
                        ? `${theme.colors.border} ${theme.colors.accent} bg-opacity-20`
                        : `${theme.colors.border} hover:${theme.colors.border} hover:bg-opacity-10`
                    }`}
                  >
                    <div className="font-bold text-sm">{part.name}</div>
                    <div className="text-xs opacity-80">#{part.partNumber}</div>
                    <div className={`text-xs ${theme.colors.accentSecondary}`}>{part.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div>
              <div className={`text-lg font-bold ${theme.colors.accent} mb-3`}>[ MAINTENANCE SCHEDULE ]</div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {currentMaintenance.map((schedule, index) => (
                  <div key={index} className={`border ${theme.colors.border} p-3`}>
                    <div className={`font-bold ${theme.colors.accent} mb-2`}>{schedule.interval}</div>
                    <ul className="text-sm space-y-1">
                      {schedule.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start space-x-2">
                          <span className={`${theme.colors.accentSecondary} mt-1`}>•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div>
              <div className={`text-lg font-bold ${theme.colors.accent} mb-3`}>[ OPERATION MANUAL ]</div>
              <div className="space-y-3 text-sm">
                <div className={`border ${theme.colors.border} p-3`}>
                  <div className={`font-bold ${theme.colors.accent} mb-2`}>Engine Specifications</div>
                  <div className="space-y-1 text-xs">
                    {selectedModel === 'prelude' ? (
                      <>
                        <div>• Displacement: 2.2L (2156cc)</div>
                        <div>• Configuration: 4-cylinder DOHC VTEC</div>
                        <div>• Power: 190 HP @ 6,800 RPM</div>
                        <div>• Torque: 158 lb-ft @ 5,500 RPM</div>
                        <div>• Compression: 10.6:1</div>
                        <div>• Fuel System: PGM-FI</div>
                      </>
                    ) : (
                      <>
                        <div>• Displacement: 5.0L (304 CID)</div>
                        <div>• Configuration: V8 OHV</div>
                        <div>• Power: 150 HP @ 4,200 RPM</div>
                        <div>• Torque: 245 lb-ft @ 2,500 RPM</div>
                        <div>• Compression: 8.4:1</div>
                        <div>• Fuel System: 2-barrel carburetor</div>
                      </>
                    )}
                  </div>
                </div>
                <div className={`border ${theme.colors.border} p-3`}>
                  <div className={`font-bold ${theme.colors.accent} mb-2`}>Fluids & Capacities</div>
                  <div className="space-y-1 text-xs">
                    <div>• Engine Oil: 4.5 qts (with filter)</div>
                    <div>• Coolant: 6.4 qts</div>
                    <div>• Transmission: 2.3 qts</div>
                    <div>• Brake Fluid: DOT 3 or DOT 4</div>
                    <div>• Power Steering: Dexron III</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div>
              <div className={`text-lg font-bold ${theme.colors.accent} mb-3`}>[ DIAGNOSTIC CODES ]</div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {currentDiagnostics.map((diagnostic, index) => (
                  <div key={index} className={`border ${theme.colors.border} p-3`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`font-bold ${theme.colors.accent}`}>{diagnostic.code}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        diagnostic.severity === 'high' ? theme.colors.error :
                        diagnostic.severity === 'medium' ? theme.colors.warning :
                        theme.colors.success
                      }`}>
                        {diagnostic.severity.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-sm mb-2">{diagnostic.description}</div>
                    <div className={`text-xs ${theme.colors.accentSecondary}`}>
                      <strong>Solution:</strong> {diagnostic.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calculator' && (
            <div>
              <div className={`text-lg font-bold ${theme.colors.accent} mb-3`}>[ CALCULATORS ]</div>
              <div className="space-y-4">
                {/* Compression Ratio Calculator (existing) */}
                <div className={`border ${theme.colors.border} p-3`}>
                  <div className={`font-bold ${theme.colors.accent} mb-3`}>Compression Ratio Calculator</div>
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Displacement (L)"
                      value={calculatorValues.displacement}
                      onChange={(e) => setCalculatorValues({...calculatorValues, displacement: e.target.value})}
                      className={`w-full p-2 ${theme.colors.bg} border ${theme.colors.border} ${theme.colors.text} text-sm focus:${theme.colors.border} focus:outline-none`}
                    />
                    <input
                      type="number"
                      placeholder="Bore (mm)"
                      value={calculatorValues.bore}
                      onChange={(e) => setCalculatorValues({...calculatorValues, bore: e.target.value})}
                      className={`w-full p-2 ${theme.colors.bg} border ${theme.colors.border} ${theme.colors.text} text-sm focus:${theme.colors.border} focus:outline-none`}
                    />
                    <input
                      type="number"
                      placeholder="Stroke (mm)"
                      value={calculatorValues.stroke}
                      onChange={(e) => setCalculatorValues({...calculatorValues, stroke: e.target.value})}
                      className={`w-full p-2 ${theme.colors.bg} border ${theme.colors.border} ${theme.colors.text} text-sm focus:${theme.colors.border} focus:outline-none`}
                    />
                    <input
                      type="number"
                      placeholder="Combustion Chamber (cc)"
                      value={calculatorValues.combustionChamber}
                      onChange={(e) => setCalculatorValues({...calculatorValues, combustionChamber: e.target.value})}
                      className={`w-full p-2 ${theme.colors.bg} border ${theme.colors.border} ${theme.colors.text} text-sm focus:${theme.colors.border} focus:outline-none`}
                    />
                    <div className={`${theme.colors.accentSecondary} font-bold`}>
                      Ratio: {calculateCompressionRatio()}
                    </div>
                  </div>
                </div>
                {/* Fuel Efficiency Calculator */}
                <div className={`border ${theme.colors.border} p-3`}>
                  <div className={`font-bold ${theme.colors.accent} mb-3`}>Fuel Efficiency Calculator</div>
                  <div className="flex flex-col md:flex-row md:gap-x-2 space-y-2 md:space-y-0">
                    <input type="number" placeholder="Distance (miles or km)" value={fuelDistance} onChange={e => setFuelDistance(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                    <input type="number" placeholder="Fuel Used (gallons or liters)" value={fuelUsed} onChange={e => setFuelUsed(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                  </div>
                  <div className="mt-2 text-sm">
                    {mpg && <div>MPG: <span className="font-mono">{mpg}</span></div>}
                    {lPer100km && <div>L/100km: <span className="font-mono">{lPer100km}</span></div>}
                  </div>
                </div>
                {/* Cost Per Mile/KM Calculator */}
                <div className={`border ${theme.colors.border} p-3`}>
                  <div className={`font-bold ${theme.colors.accent} mb-3`}>Cost Per Mile/KM Calculator</div>
                  <div className="flex flex-col md:flex-row md:gap-x-2 space-y-2 md:space-y-0">
                    <input type="number" placeholder="Total Cost ($/€)" value={costTotal} onChange={e => setCostTotal(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                    <input type="number" placeholder="Distance (miles)" value={costDistance} onChange={e => setCostDistance(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                  </div>
                  <div className="mt-2 text-sm">
                    {costPerMile && <div>Cost per mile: <span className="font-mono">${costPerMile}</span></div>}
                    {costPerKm && <div>Cost per km: <span className="font-mono">${costPerKm}</span></div>}
                  </div>
                </div>
                {/* Tire Size Calculator */}
                <div className={`border ${theme.colors.border} p-3`}>
                  <div className={`font-bold ${theme.colors.accent} mb-3`}>Tire Size Calculator</div>
                  <div className="flex flex-col md:flex-row md:gap-x-2 space-y-2 md:space-y-0">
                    <input type="number" placeholder="Width (mm)" value={tireWidth} onChange={e => setTireWidth(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                    <input type="number" placeholder="Aspect Ratio (%)" value={tireAspect} onChange={e => setTireAspect(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                    <input type="number" placeholder="Wheel Diameter (in)" value={tireDiameter} onChange={e => setTireDiameter(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                  </div>
                  <div className="mt-2 text-sm">
                    {tireOverallDiameter && <div>Overall Diameter: <span className="font-mono">{tireOverallDiameter} in</span></div>}
                    {tireCircumference && <div>Circumference: <span className="font-mono">{tireCircumference} in</span></div>}
                  </div>
                </div>
                {/* Oil Change Interval Estimator */}
                <div className={`border ${theme.colors.border} p-3`}>
                  <div className={`font-bold ${theme.colors.accent} mb-3`}>Oil Change Interval Estimator</div>
                  <div className="flex flex-col md:flex-row md:gap-x-2 space-y-2 md:space-y-0">
                    <input type="number" placeholder="Last Oil Change Mileage" value={oilLast} onChange={e => setOilLast(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                    <input type="number" placeholder="Current Mileage" value={oilCurrent} onChange={e => setOilCurrent(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                    <input type="number" placeholder="Recommended Interval (miles)" value={oilInterval} onChange={e => setOilInterval(e.target.value)} className="p-2 border rounded bg-black bg-opacity-40 text-white w-40 min-w-0" />
                  </div>
                  <div className="mt-2 text-sm">
                    {oilNext && <div>Next oil change at: <span className="font-mono">{oilNext} mi</span></div>}
                    {oilMilesLeft && <div>{parseFloat(oilMilesLeft) < 0 ? 'OVERDUE!' : `${oilMilesLeft} miles left`}</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div>
              <div className={`text-lg font-bold ${theme.colors.accent} mb-3`}>[ MAINTENANCE RECORDS ]</div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {currentRecords.map(record => (
                  <div key={record.id} className={`border ${theme.colors.border} p-3`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className={`font-bold ${theme.colors.accent}`}>{record.service}</div>
                      <div className={`${theme.colors.accentSecondary} font-bold`}>{record.cost}</div>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>Date: {record.date}</div>
                      <div>Mileage: {record.mileage}</div>
                      <div className={theme.colors.textSecondary}>Notes: {record.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-h-0 w-full">
          {/* VIN Decoder */}
          <div className="p-4 flex items-center space-x-2 border-b border-gray-700">
            <Car className="h-5 w-5" />
            <input
              type="text"
              placeholder="Enter VIN..."
              value={vin}
              onChange={e => setVin(e.target.value)}
              className="p-2 border rounded bg-black bg-opacity-40 text-white w-64"
            />
            <button onClick={handleVinDecode} className="px-3 py-2 bg-green-700 text-white rounded hover:bg-green-800">Decode VIN</button>
          </div>
          {/* VIN Decoder Result */}
          {vinResult && (
            <div className="p-4 text-sm bg-black bg-opacity-40 border-b border-gray-700">
              <div className="font-bold mb-2">VIN Details:</div>
              <ul>
                {vinResult.filter((r: VinResult) => r.Value && r.Value !== 'Not Applicable').slice(0, 10).map((r: VinResult, i: number) => (
                  <li key={i}><span className="font-bold">{r.Variable}:</span> {r.Value}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Car Diagram and Legend area */}
          <div className="flex flex-row items-start flex-grow">
            <div className={`relative w-[32rem] h-[32rem] m-2 flex-shrink-0 ${theme.colors.bgSecondary} border-2 ${theme.colors.border} rounded-lg shadow-2xl`}>
              {/* Car Outline */}
              <div className={`absolute inset-4 border-2 ${theme.colors.border} ${selectedModel === 'prelude' ? 'rounded-lg' : 'rounded-sm'} ${theme.colors.bgSecondary} bg-opacity-50`}>
                {/* Parts as clickable dots */}
                {currentParts.map(part => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className={`absolute w-4 h-4 rounded-full border-2 transition-all duration-200 transform hover:scale-125 z-10 ${
                      selectedPart?.id === part.id
                        ? `${theme.colors.accent.replace('text-', 'bg-')} ${theme.colors.border.replace('border-', 'border-')} animate-pulse shadow-lg`
                        : `${theme.colors.accentSecondary.replace('text-', 'bg-')} ${theme.colors.border.replace('border-', 'border-')} hover:${theme.colors.accent.replace('text-', 'bg-')} hover:shadow-lg`
                    }`}
                    style={{
                      left: `${part.position.x}%`,
                      top: `${part.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
                {/* Car details overlay */}
                <div className={`absolute inset-2 border ${theme.colors.border} border-opacity-30`}>
                  <div className={`text-xs ${theme.colors.textSecondary} absolute top-1 left-1`}>FRONT</div>
                  <div className={`text-xs ${theme.colors.textSecondary} absolute bottom-1 right-1`}>REAR</div>
                </div>
              </div>
              {/* Legend */}
              <div className={`absolute bottom-4 left-4 ${theme.colors.bgSecondary} bg-opacity-90 border ${theme.colors.border} p-4 max-w-xs backdrop-blur-sm`}>
                <div className={`text-sm font-bold ${theme.colors.accent} mb-2`}>[ LEGEND ]</div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${theme.colors.accentSecondary.replace('text-', 'bg-')} rounded-full`}></div>
                    <span>Available Components</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${theme.colors.accent.replace('text-', 'bg-')} rounded-full animate-pulse`}></div>
                    <span>Selected Component</span>
                  </div>
                  <div className={`mt-2 ${theme.colors.textSecondary}`}>Click on dots to view component details</div>
                </div>
              </div>
            </div>
            {/* Car Photo Box */}
            <div className={`relative w-[32rem] h-[32rem] m-2 flex-shrink-0 flex items-center justify-center ${theme.colors.bgSecondary} border-2 ${theme.colors.border} rounded-lg shadow-2xl`}>
              {/* Placeholder for car photo */}
              <div className="flex flex-col items-center justify-center w-full h-full">
                {/* You can replace this with an <img src=... /> if you have a photo */}
                <div className={`text-lg font-bold ${theme.colors.accent} mb-2`}>[ CAR PHOTO ]</div>
                <div className={`w-96 h-72 bg-black bg-opacity-40 border-2 border-dashed ${theme.colors.border} flex items-center justify-center`}>
                  <span className={`text-sm ${theme.colors.textSecondary}`}>Car Photo Here</span>
                </div>
              </div>
            </div>
            {/* Spacer to fill remaining space */}
            <div className="flex-grow" />
          </div>
          {/* Bottom Info Panel (footer) */}
          {selectedPart && (
            <div className={`fixed left-0 bottom-0 w-full z-40 ${theme.colors.bgSecondary} border-t-2 ${theme.colors.border} py-4`}>
              <div className={`h-full border ${theme.colors.border} p-4 overflow-y-auto max-w-screen-2xl mx-auto`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`text-xl font-bold ${theme.colors.accent}`}>{selectedPart.name}</div>
                    <div className={`text-sm ${theme.colors.textSecondary}`}>{selectedPart.description}</div>
                  </div>
                  <button
                    onClick={() => setSelectedPart(null)}
                    className={`${theme.colors.error} hover:opacity-75 text-xl font-bold transition-colors`}
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className={`${theme.colors.accent} font-bold mb-1`}>PART NUMBER</div>
                    <div className="font-mono">{selectedPart.partNumber}</div>
                  </div>
                  <div>
                    <div className={`${theme.colors.accent} font-bold mb-1`}>MAINTENANCE</div>
                    <div>{selectedPart.maintenanceInterval}</div>
                  </div>
                  <div>
                    <div className={`${theme.colors.accent} font-bold mb-1`}>PRICE ESTIMATE</div>
                    <div className={`${theme.colors.accentSecondary} font-bold`}>{selectedPart.price}</div>
                  </div>
                  <div>
                    <div className={`${theme.colors.accent} font-bold mb-1`}>STATUS</div>
                    <div className={theme.colors.success}>● AVAILABLE</div>
                  </div>
                </div>
                <div className={`mt-4 pt-4 border-t ${theme.colors.border}`}>
                  <div className={`${theme.colors.accent} font-bold mb-2`}>TECHNICAL NOTES</div>
                  <div className={`text-xs ${theme.colors.textSecondary}`}>
                    Consult service manual for proper installation procedures. Use OEM or equivalent parts only.
                    Check torque specifications before assembly. Verify part compatibility with your specific vehicle model and year.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;