import Navigation from "../../components/Navigation";
import AppNavLink from "../../components/common/AppNavLink";
import { Outlet } from "react-router";
import styles from "./Events.module.scss"; 
const Events = () => {
  return (
    <section className={styles.events} data-testid="events-page">
      <Navigation type="aside">
        <AppNavLink path="/events" label="Buy Events" isEnd />
        <AppNavLink path="/events/sell" label="Sell Events" isEnd />
        <AppNavLink path="/events/cancel" label="Cancel Events" isEnd />
      </Navigation>
      <section className={styles.eventContent}>
        <Outlet />
      </section>
    </section>
  );
};

export default Events;