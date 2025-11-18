import React from 'react';
import { Wifi, WifiOff, Volume2, VolumeX, Calendar, ChevronLeft, ChevronRight, Bell, Settings, MessageSquare, Mail } from 'lucide-react';

interface SystemTrayPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// WiFi Panel Component
export const WiFiPanel: React.FC<SystemTrayPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const networks = [
    { name: 'Home Network', strength: 'Excellent', connected: true, secured: true },
    { name: 'Office WiFi', strength: 'Good', connected: false, secured: true },
    { name: 'Guest Network', strength: 'Fair', connected: false, secured: false },
  ];

  return (
    <div
      className="absolute bottom-12 right-2 w-80 max-w-[calc(100vw-16px)] bg-win-dark text-white shadow-2xl border border-gray-700 overflow-hidden z-[200]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 bg-win-dark/95 backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Wifi size={20} className="text-blue-400" />
            <span className="font-medium">Network & Internet</span>
          </div>
        </div>

        {/* Available Networks */}
        <div className="space-y-1 mb-3">
          <div className="text-xs text-gray-400 mb-2 px-1">Available Networks</div>
          {networks.map((network, idx) => (
            <div
              key={idx}
              className={`p-3 rounded hover:bg-white/10 cursor-pointer transition-colors ${
                network.connected ? 'bg-win-blue/20 border border-win-blue/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {network.secured ? <Wifi size={16} /> : <WifiOff size={16} className="text-yellow-500" />}
                  <div>
                    <div className="text-sm">{network.name}</div>
                    <div className="text-xs text-gray-400">{network.strength} • {network.secured ? 'Secured' : 'Open'}</div>
                  </div>
                </div>
                {network.connected && (
                  <span className="text-xs bg-win-blue px-2 py-1 rounded">Connected</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="mt-4 pt-3 border-t border-gray-700 flex flex-col gap-2">
          <button className="text-xs text-blue-400 hover:text-blue-300 text-left px-1">
            Network & Internet settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Volume Panel Component
export const VolumePanel: React.FC<SystemTrayPanelProps> = ({ isOpen, onClose }) => {
  const [volume, setVolume] = React.useState(70);
  const [isMuted, setIsMuted] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="absolute bottom-12 right-2 w-80 max-w-[calc(100vw-16px)] bg-win-dark text-white shadow-2xl border border-gray-700 overflow-hidden z-[200]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 bg-win-dark/95 backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
          <div className="flex items-center gap-3">
            {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-blue-400" />}
            <span className="font-medium">Volume Mixer</span>
          </div>
        </div>

        {/* System Volume */}
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-3 px-1">System Volume</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} />}
            </button>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #0078D7 0%, #0078D7 ${isMuted ? 0 : volume}%, #4a5568 ${isMuted ? 0 : volume}%, #4a5568 100%)`
                }}
              />
              <div className="text-xs text-gray-400 mt-1 text-right">{isMuted ? 0 : volume}%</div>
            </div>
          </div>
        </div>

        {/* App Volume */}
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-3 px-1">Application Volume</div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded hover:bg-white/10">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">
                BR
              </div>
              <div className="flex-1">
                <div className="text-xs mb-1">Browser</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="80"
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded hover:bg-white/10">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-xs font-bold">
                SP
              </div>
              <div className="flex-1">
                <div className="text-xs mb-1">System Sounds</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-700">
          <button className="text-xs text-blue-400 hover:text-blue-300 text-left px-1">
            Sound settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Calendar Panel Component
export const CalendarPanel: React.FC<SystemTrayPanelProps> = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  if (!isOpen) return null;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
  const today = new Date();
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div
      className="absolute bottom-12 right-2 w-80 max-w-[calc(100vw-16px)] bg-win-dark text-white shadow-2xl border border-gray-700 overflow-hidden z-[200]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 bg-win-dark/95 backdrop-blur">
        {/* Date/Time Display */}
        <div className="mb-4 pb-3 border-b border-gray-700">
          <div className="text-2xl font-light">{currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-sm text-gray-400 mt-1">{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
          <div className="flex gap-1">
            <button
              onClick={previousMonth}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="text-xs text-center text-gray-400 py-1">
              {day}
            </div>
          ))}

          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square"></div>
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const isToday = isCurrentMonth && day === today.getDate();
            return (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center text-xs rounded cursor-pointer transition-colors
                  ${isToday
                    ? 'bg-win-blue text-white font-bold'
                    : 'hover:bg-white/10'
                  }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-700">
          <button className="text-xs text-blue-400 hover:text-blue-300 text-left px-1">
            Date & time settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Notification Center Panel Component
export const NotificationPanel: React.FC<SystemTrayPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      icon: Mail,
      title: 'New Message',
      message: 'Check out my portfolio!',
      time: '2 min ago',
      color: 'text-blue-400'
    },
    {
      icon: MessageSquare,
      title: 'System',
      message: 'Welcome to my Windows 10 themed portfolio',
      time: '5 min ago',
      color: 'text-green-400'
    },
  ];

  return (
    <div
      className="absolute bottom-12 right-2 w-80 max-w-[calc(100vw-16px)] bg-win-dark text-white shadow-2xl border border-gray-700 overflow-hidden z-[200]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-win-dark/95 backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-blue-400" />
            <span className="font-medium">Notification Center</span>
          </div>
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <Settings size={16} />
          </button>
        </div>

        {/* Notifications */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="p-2">
              {notifications.map((notif, idx) => (
                <div
                  key={idx}
                  className="p-3 mb-2 bg-white/5 hover:bg-white/10 rounded cursor-pointer transition-colors border border-white/5"
                >
                  <div className="flex items-start gap-3">
                    <notif.icon size={20} className={notif.color} />
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">{notif.title}</div>
                      <div className="text-xs text-gray-400 mb-1">{notif.message}</div>
                      <div className="text-xs text-gray-500">{notif.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <Bell size={48} className="mx-auto mb-3 opacity-30" />
              <div className="text-sm">No new notifications</div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 mb-3">Quick Actions</div>
          <div className="grid grid-cols-4 gap-2">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded flex flex-col items-center gap-1 transition-colors">
              <Wifi size={16} />
              <span className="text-[10px]">WiFi</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded flex flex-col items-center gap-1 transition-colors">
              <Volume2 size={16} />
              <span className="text-[10px]">Volume</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded flex flex-col items-center gap-1 transition-colors">
              <Settings size={16} />
              <span className="text-[10px]">Settings</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded flex flex-col items-center gap-1 transition-colors">
              <Bell size={16} />
              <span className="text-[10px]">Focus</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 text-center">
          <button className="text-xs text-blue-400 hover:text-blue-300">
            Clear all notifications
          </button>
        </div>
      </div>
    </div>
  );
};
