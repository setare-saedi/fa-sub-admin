import React from 'react';
import './App.css';
import routes from './routes.jsx';
import { useRoutes } from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider.jsx';
import Sidebar from "./components/sidebar/Sidebar";
import { useAuth } from "./hooks/AuthProvider";

function App() {
  let router = useRoutes(routes)
  const auth = useAuth();
  console.log(auth
    , 'auth');
  console.log(router, 'router');
  return (
    <div>
      <AuthProvider>
        <div className=" grid grid-cols-12 gap-4">
          {/* sidebar */}
          {
            router.props.match.route.path != '/' ?
              <div className=" col-span-2 relative">
                <Sidebar />
              </div>
              :
              <div >
              </div>
          }
          {/* content */}
          <div className=" col-span-10  mt-3 ml-6">

            {
              router
            }
          </div>

        </div >

      </AuthProvider>
    </div>
  );
}

export default App;
