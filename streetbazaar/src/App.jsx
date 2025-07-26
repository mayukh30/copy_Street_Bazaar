import { useState } from 'react'
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(true);
    const { user } = useContext(AuthContext);
    
    if (!user) {
      return (
        <AuthForm 
          isLogin={isLogin} 
          onToggle={() => setIsLogin(!isLogin)} 
        />
      );
    }
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main>
          {user.type === 'consumer' ? (
            <ConsumerDashboard />
          ) : (
            <SupplierDashboard />
          )}
        </main>
      </div>
    );
}

export default App
