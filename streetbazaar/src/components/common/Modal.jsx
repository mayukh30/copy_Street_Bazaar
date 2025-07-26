import React, { useEffect, useRef } from 'react';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

const Modal = ({
  isOpen = false,
  onClose = () => {},
  title = '',
  children,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer,
  icon,
  className = ''
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // Size configurations
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  // Variant configurations
  const variantStyles = {
    default: {
      header: 'border-b border-gray-200',
      icon: null,
      iconColor: ''
    },
    success: {
      header: 'border-b border-green-200 bg-green-50',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    warning: {
      header: 'border-b border-yellow-200 bg-yellow-50',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600'
    },
    error: {
      header: 'border-b border-red-200 bg-red-50',
      icon: AlertCircle,
      iconColor: 'text-red-600'
    },
    info: {
      header: 'border-b border-blue-200 bg-blue-50',
      icon: Info,
      iconColor: 'text-blue-600'
    }
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;
  const IconComponent = icon || currentVariant.icon;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          tabIndex={-1}
          className={`
            relative w-full ${sizeClasses[size]} transform rounded-lg bg-white shadow-xl transition-all
            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton || IconComponent) && (
            <div className={`px-6 py-4 ${currentVariant.header}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {IconComponent && (
                    <IconComponent className={`h-6 w-6 ${currentVariant.iconColor}`} />
                  )}
                  {title && (
                    <h3 className="text-lg font-semibold text-gray-900">
                      {title}
                    </h3>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Pre-configured modal components for common use cases
export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  isLoading = false
}) => {
  const footer = (
    <div className="flex space-x-3 justify-end">
      <button
        onClick={onClose}
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        disabled={isLoading}
        className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          variant === 'error' 
            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        }`}
      >
        {isLoading ? 'Processing...' : confirmText}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      footer={footer}
    >
      <p className="text-gray-600">{message}</p>
    </Modal>
  );
};

export const AlertModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  variant = "info",
  buttonText = "OK"
}) => {
  const footer = (
    <div className="flex justify-end">
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {buttonText}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      footer={footer}
    >
      <p className="text-gray-600">{message}</p>
    </Modal>
  );
};

export const FormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  children, 
  submitText = "Submit",
  cancelText = "Cancel",
  isLoading = false,
  size = "md"
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const footer = (
    <div className="flex space-x-3 justify-end">
      <button
        type="button"
        onClick={onClose}
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        form="modal-form"
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : submitText}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      footer={footer}
    >
      <form id="modal-form" onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  );
};

// Example usage component (for demonstration)
export const ModalExamples = () => {
  const [modals, setModals] = React.useState({
    basic: false,
    confirm: false,
    alert: false,
    form: false,
    success: false,
    warning: false,
    error: false,
    large: false
  });

  const openModal = (type) => {
    setModals(prev => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModals(prev => ({ ...prev, [type]: false }));
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Modal Examples</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => openModal('basic')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Basic Modal
        </button>
        
        <button
          onClick={() => openModal('confirm')}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
        >
          Confirm Modal
        </button>
        
        <button
          onClick={() => openModal('alert')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Alert Modal
        </button>
        
        <button
          onClick={() => openModal('form')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Form Modal
        </button>
        
        <button
          onClick={() => openModal('success')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Success Modal
        </button>
        
        <button
          onClick={() => openModal('warning')}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
        >
          Warning Modal
        </button>
        
        <button
          onClick={() => openModal('error')}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Error Modal
        </button>
        
        <button
          onClick={() => openModal('large')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Large Modal
        </button>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={modals.basic}
        onClose={() => closeModal('basic')}
        title="Basic Modal"
      >
        <p className="text-gray-600">
          This is a basic modal with some content. You can put any content here.
        </p>
      </Modal>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modals.confirm}
        onClose={() => closeModal('confirm')}
        onConfirm={() => {
          alert('Confirmed!');
          closeModal('confirm');
        }}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        variant="error"
        confirmText="Delete"
      />

      {/* Alert Modal */}
      <AlertModal
        isOpen={modals.alert}
        onClose={() => closeModal('alert')}
        title="Success!"
        message="Your action has been completed successfully."
        variant="success"
      />

      {/* Form Modal */}
      <FormModal
        isOpen={modals.form}
        onClose={() => closeModal('form')}
        onSubmit={(e) => {
          e.preventDefault();
          alert('Form submitted!');
          closeModal('form');
        }}
        title="Edit Profile"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </FormModal>

      {/* Variant Modals */}
      <Modal
        isOpen={modals.success}
        onClose={() => closeModal('success')}
        title="Success"
        variant="success"
      >
        <p className="text-gray-600">Operation completed successfully!</p>
      </Modal>

      <Modal
        isOpen={modals.warning}
        onClose={() => closeModal('warning')}
        title="Warning"
        variant="warning"
      >
        <p className="text-gray-600">Please review your changes before proceeding.</p>
      </Modal>

      <Modal
        isOpen={modals.error}
        onClose={() => closeModal('error')}
        title="Error"
        variant="error"
      >
        <p className="text-gray-600">Something went wrong. Please try again.</p>
      </Modal>

      <Modal
        isOpen={modals.large}
        onClose={() => closeModal('large')}
        title="Large Modal"
        size="2xl"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This is a large modal with more content space. You can use this for complex forms,
            detailed information, or any content that needs more room.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold">Section 1</h4>
              <p className="text-sm text-gray-600">Content for section 1</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold">Section 2</h4>
              <p className="text-sm text-gray-600">Content for section 2</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Modal;