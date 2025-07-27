import React from 'react';
import Card from '../../ui/Card';
import CardContent from '../../ui/CardContent';

const colorMap = {
  blue: 'text-blue-600 bg-blue-100',
  green: 'text-green-600 bg-green-100',
  orange: 'text-orange-600 bg-orange-100',
  purple: 'text-purple-600 bg-purple-100',
  red: 'text-red-600 bg-red-100',
  gray: 'text-gray-600 bg-gray-100',
};

const DashboardStatsSupplier = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ title, value, icon: Icon, color = 'gray', trend }, idx) => {
        const colorClasses = colorMap[color] || colorMap.gray;
        const [textColor, bgColor] = colorClasses.split(' ');

        return (
          <Card key={idx} className="p-4 shadow-sm border border-gray-200">
            <CardContent className="flex items-center space-x-4">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bgColor}`}>
                <Icon className={`w-6 h-6 ${textColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-semibold text-gray-900">{value}</p>
                {trend && <p className="text-xs text-gray-400 mt-1">{trend}</p>}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStatsSupplier;
