import React from 'react';
import { 
  ShoppingCart, 
  DollarSign, 
  Clock,
  CheckCircle,
  Heart,
  Star,
  Activity
} from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const getStatIcon = (key) => {
    const iconMap = {
      totalOrders: ShoppingCart,
      totalSpent: DollarSign,
      activeOrders: Clock,
      completedOrders: CheckCircle,
      favoriteSuppliers: Heart,
      averageRating: Star
    };
    return iconMap[key] || Activity;
  };

  const getStatColor = (key) => {
    const colorMap = {
      totalSpent: 'text-green-600 bg-green-100',
      totalOrders: 'text-blue-600 bg-blue-100',
      activeOrders: 'text-yellow-600 bg-yellow-100',
      completedOrders: 'text-green-600 bg-green-100',
      favoriteSuppliers: 'text-pink-600 bg-pink-100',
      averageRating: 'text-purple-600 bg-purple-100'
    };
    return colorMap[key] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {Object.entries(stats).map(([key, value]) => {
        const Icon = getStatIcon(key);
        const colorClass = getStatColor(key);
        
        return (
          <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {typeof value === 'number' && key.includes('Spent') 
                    ? `$${value.toLocaleString()}` 
                    : typeof value === 'number' && key.includes('Rating')
                    ? `${value}/5`
                    : value.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-full ${colorClass}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;