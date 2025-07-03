import "./App.scss";
import Navigation from "./components/Navigation";
import AppRoutes from "./Routes";
import AppNavLink from "./components/common/AppNavLink";
import * as React from "react";
import Notification from "./components/Notification";
import { NotificationProvider } from "./context/notificationContext";

const App: React.FunctionComponent = () => {
  return (
    <section className="App" data-testid="app-container">
      <header>
        <h1>Position Books</h1>
        <Navigation type="top">
          <AppNavLink path="/" label="Position Summary" />
          <AppNavLink path="/events" label="Events" />
        </Navigation>
      </header>
      <main>
        <NotificationProvider>
          <Notification />
          <AppRoutes />
        </NotificationProvider>
      </main>
      <footer>All rights reserved &copy; 2025</footer>
    </section>
  );
};

export default App;
