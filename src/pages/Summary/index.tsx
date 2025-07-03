import React, { useContext, useEffect } from "react";
import styles from "./PositionSummary.module.scss";
import { AppContext } from "../../context/appContext";
import type { PositionSummaryParam } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getPositionSummary } from "../../common/apiQueries";

const PositionSummary: React.FunctionComponent = () => {
  const appContext = useContext(AppContext);
  const { isFetched, data } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositionSummary,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (
      isFetched &&
      data &&
      appContext.updateContext &&
      appContext.positions.length === 0
    ) {
      appContext.updateContext(data.Positions as PositionSummaryParam[]);
    }
  }, [data, appContext, isFetched]);

  const getPositionSummaries = (position: PositionSummaryParam) => {
    return (
      <tr key={`pos-${position.ID}`}>
        <td>{position.Account}</td>
        <td>{position.Security}</td>
        <td>{position.Quantity}</td>
      </tr>
    );
  };

  const PositionData = () => {
    return (
      <>
        {appContext.positions.map((position) => getPositionSummaries(position))}
      </>
    );
  };

  const NoData = () => {
    return (
      <tr>
        <td colSpan={3}>No positions available</td>
      </tr>
    );
  };

  return (
    <section className={styles.summary}>
      <h2>Position Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Security</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {appContext.positions.length === 0 ? <NoData /> : <PositionData />}
        </tbody>
      </table>
    </section>
  );
};

export default PositionSummary;
