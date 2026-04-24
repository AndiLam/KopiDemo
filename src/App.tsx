import React, { Suspense, useEffect, useState } from 'react'; // Tambah useEffect & useState
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Preferences } from '@capacitor/preferences'; // Import Preferences

// Pages (React.lazy tetap sama)
const Login = React.lazy(() => import('./pages/auth/Login'));
const Tabs = React.lazy(() => import('./pages/tabs/Tabs'));

import '@ionic/react/css/core.css';

/* Basic CSS */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

/* Theme */
import './theme/variables.css';

setupIonicReact();

const ElegantLoader = () => (
  <div className="elegant-loader-container">
    <div className="elegant-spinner"></div>
    <div className="loader-text">IMS APP</div>
  </div>
);

const App: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Ambil data dari storage native HP
      const { value } = await Preferences.get({ key: 'isLoggedIn' });
      
      if (value === 'true') {
        setInitialRoute('/tabs/home');
      } else {
        setInitialRoute('/login');
      }
    };

    checkLoginStatus();
  }, []);

  // Jika initialRoute masih null, tampilkan loader utama
  if (initialRoute === null) {
    return <ElegantLoader />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <Suspense fallback={<ElegantLoader />}>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route path="/tabs" component={Tabs} />

            {/* Redirect awal berdasarkan hasil checkLoginStatus */}
            <Route exact path="/">
              <Redirect to={initialRoute} />
            </Route>
          </IonRouterOutlet>
        </Suspense>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;