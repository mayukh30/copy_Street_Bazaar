import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({
  size = 'md',
  color = 'blue',
  text = '',
  overlay = false,
  fullScreen = false,
  variant = 'spinner'
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  // Color configurations
  const colorClasses = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    white: 'text-white'
  };

  // Text size based on spinner size
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spinnerClass = `${sizeClasses[size]} ${colorClasses[color]} animate-spin`;
  const textClass = `mt-2 ${textSizeClasses[size]} ${colorClasses[color]} font-medium`;

  // Different spinner variants
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            <div className={`${sizeClasses[size]} ${colorClasses[color]} bg-current rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`${sizeClasses[size]} ${colorClasses[color]} bg-current rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`${sizeClasses[size]} ${colorClasses[color]} bg-current rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} ${colorClasses[color]} bg-current rounded-full animate-pulse`}></div>
        );
      
      case 'bars':
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 ${sizeClasses[size]} ${colorClasses[color]} bg-current animate-pulse`}
                style={{ 
                  animationDelay: `${i * 150}ms`,
                  animationDuration: '1s',
                  height: size === 'xs' ? '16px' : size === 'sm' ? '24px' : size === 'md' ? '32px' : size === 'lg' ? '48px' : '64px'
                }}
              ></div>
            ))}
          </div>
        );
      
      case 'ring':
        return (
          <div className={`${sizeClasses[size]} animate-spin`}>
            <div className={`h-full w-full rounded-full border-2 border-gray-200`}>
              <div className={`h-full w-full rounded-full border-2 border-transparent border-t-current ${colorClasses[color]}`}></div>
            </div>
          </div>
        );
      
      case 'custom':
        return (
          <div className={`${sizeClasses[size]} animate-spin`}>
            <div className={`h-full w-full rounded-full border-4 border-gray-200 border-t-transparent ${colorClasses[color]}`} style={{ borderTopColor: 'currentColor' }}></div>
          </div>
        );
      
      default: // spinner
        return <Loader2 className={spinnerClass} />;
    }
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center">
      {renderSpinner()}
      {text && <p className={textClass}>{text}</p>}
    </div>
  );

  // Full screen loading
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
        {spinnerContent}
      </div>
    );
  }

  // Overlay loading
  if (overlay) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
        {spinnerContent}
      </div>
    );
  }

  // Regular loading
  return spinnerContent;
};

// Additional pre-configured spinner components for common use cases
export const ButtonSpinner = ({ size = 'sm', color = 'white' }) => (
  <LoadingSpinner size={size} color={color} variant="spinner" />
);

export const PageSpinner = ({ text = 'Loading...' }) => (
  <LoadingSpinner 
    size="lg" 
    color="blue" 
    text={text} 
    fullScreen={true} 
  />
);

export const CardSpinner = ({ text = '' }) => (
  <LoadingSpinner 
    size="md" 
    color="blue" 
    text={text} 
    overlay={true} 
  />
);

export const InlineSpinner = ({ size = 'sm', color = 'blue' }) => (
  <LoadingSpinner size={size} color={color} variant="spinner" />
);

// Example usage component (for demonstration)
export const LoadingSpinnerExamples = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Different sizes */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Sizes</h3>
          <div className="space-y-4">
            <LoadingSpinner size="xs" text="Extra Small" />
            <LoadingSpinner size="sm" text="Small" />
            <LoadingSpinner size="md" text="Medium" />
            <LoadingSpinner size="lg" text="Large" />
            <LoadingSpinner size="xl" text="Extra Large" />
          </div>
        </div>

        {/* Different variants */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Variants</h3>
          <div className="space-y-4">
            <LoadingSpinner variant="spinner" text="Spinner" />
            <LoadingSpinner variant="dots" text="Dots" />
            <LoadingSpinner variant="pulse" text="Pulse" />
            <LoadingSpinner variant="bars" text="Bars" />
            <LoadingSpinner variant="ring" text="Ring" />
            <LoadingSpinner variant="custom" text="Custom" />
          </div>
        </div>

        {/* Different colors */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Colors</h3>
          <div className="space-y-4">
            <LoadingSpinner color="blue" text="Blue" />
            <LoadingSpinner color="green" text="Green" />
            <LoadingSpinner color="red" text="Red" />
            <LoadingSpinner color="purple" text="Purple" />
            <LoadingSpinner color="yellow" text="Yellow" />
            <LoadingSpinner color="gray" text="Gray" />
          </div>
        </div>
      </div>

      {/* Pre-configured components */}
      <div className="space-y-4">
        <h3 className="font-semibold">Pre-configured Components</h3>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <ButtonSpinner />
            <span>Button Spinner</span>
          </div>
          <div className="flex items-center space-x-2">
            <InlineSpinner />
            <span>Inline Spinner</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;