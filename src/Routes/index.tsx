import { Route, Routes } from "react-router";
import PositionSummary from "../pages/Summary";
import Events from "../pages/Events";
import BuyEvents from "../pages/Events/Buy";
import SellEvents from "../pages/Events/Sell";
import CancelEvents from "../pages/Events/Cancel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PositionSummary />} />
      <Route path="/events" element={<Events />}>
        <Route index element={<BuyEvents />} />
        <Route path="/events/sell" element={<SellEvents />} />
        <Route path="/events/cancel" element={<CancelEvents />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
