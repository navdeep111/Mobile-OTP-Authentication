// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Context from '../context/AppContext';

// export default function Dashboard() {
//   const { mobileNumber } = useContext(Context);
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//         <button
//           onClick={() => navigate('/logout')}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </header>
      
//       <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700">Welcome, {mobileNumber}</h2>
//           <p className="text-gray-500 mt-2">Manage your account and settings here.</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold">Recent Activity</h3>
//           <p className="text-gray-500 mt-2">No recent activity found.</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold">Settings</h3>
//           <p className="text-gray-500 mt-2">Update your preferences and security settings.</p>
//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/AppContext';

export default function Dashboard() {
  const { mobileNumber } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear authentication token
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>
      
      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Welcome, {mobileNumber}</h2>
          <p className="text-gray-500 mt-2">Manage your account and settings here.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <p className="text-gray-500 mt-2">No recent activity found.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p className="text-gray-500 mt-2">Update your preferences and security settings.</p>
        </div>
      </main>
    </div>
  );
}
