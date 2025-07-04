import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./EventForms.module.scss";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Button from "../common/Button";
import SecurityForm from "../SecurityForm";
import { submitEvents } from "../../common/apiQueries";
import { AppContext } from "../../context/appContext";
import { NotificationContext } from "../../context/notificationContext";
import type { EventsParam, FormValues } from "../../types";

interface SecurityFormProps {
  title: string;
  pageType: 'Buy' | 'Sell' | 'Cancel';
  buttonText?: string;
}

const EventsForm = ({title, pageType, buttonText}:SecurityFormProps) => {
  const { register, handleSubmit } = useForm();
  const [securityList, setSecurityList] = useState(1);
  const [submitStatus, setSubmitStatus] = useState(false);
  const appContext = useContext(AppContext);
  const notificationContext = useContext(NotificationContext);
  const eventDataMutation = useMutation({
    mutationFn: submitEvents,
  });
  const handleAddSecurity = () => {
    if (securityList >= 10) {
    notificationContext?.pushNotification({
        id: "security-limit",
        message: "You can only add up to 10 securities.",
        type: "info",
      });   
      return;
    }
    setSecurityList(securityList + 1);
  };

  const handleDeleteSecurity = () => {
    /* istanbul ignore next @preserve */
    if (securityList <= 1) {
        notificationContext?.pushNotification({
            id: "security-limit",
            message: "You must have at least one security.",
            type: "info",
        });
      return;
    }
    /* istanbul ignore next @preserve */
    setSecurityList(securityList - 1);
  };
  
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const securityDataList: EventsParam[] = [];
    setSubmitStatus(true);
    for (let i: number = 1; i <= securityList; i++) {
      const securityData: EventsParam = {
        ID: i,
        Action: pageType,
        Account: data[`security-${i}-account`],
        Security: data[`security-${i}-security`],
        ...(pageType !== "Cancel" && { Quantity: Number(data[`security-${i}-quantity`])}),
        /* istanbul ignore next */
        ...(pageType === "Cancel" && { EventID: Number(data[`security-${i}-eventId`] )})
      };
      securityDataList.push(securityData);
    }
    eventDataMutation.mutate({ Events: securityDataList });
  };

  useEffect(() => {
    if (eventDataMutation.isSuccess && submitStatus && !eventDataMutation.isIdle) {
      /* istanbul ignore else @preserve */
      if (appContext.updateContext && notificationContext) {
        appContext.updateContext(eventDataMutation.data.Positions);
        notificationContext.pushNotification({
          id: "event-success",
          message: "Securities Created / Updated Successfully",
          type: "success",
        });
      }
      setSubmitStatus(false);
      setSecurityList(1);
    }
    else if (eventDataMutation.isError && notificationContext && submitStatus) {
        notificationContext.pushNotification({
          id: "event-error",
          message: "Failed to Create / Update Securities",
          type: "error",
        });
        setSubmitStatus(false);
    }
    // Reset the security list to 1 when the component mounts
  }, [eventDataMutation, appContext, notificationContext, submitStatus]);

  const getSecurityForms = useCallback(() => {
    const securityForms: React.ReactElement[] = [];
    for (let i = 1; i <= securityList; i++) {
      securityForms.push(
        <SecurityForm formId={`security-${i}`} key={i} register={register} pageType={pageType} />
      );
    }
    return securityForms;
  }, [securityList, register, pageType]);
  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="events-form">
        <section className={styles.securityForm}>{getSecurityForms()}</section>
        <section>
          <Button
            type="button"
            option="link"
            text="+Add More"
            onClick={handleAddSecurity}
            data-testid="add-security-button"
          />
          <Button
            type="button"
            option="link"
            text="-Remove"
            disabled={securityList <= 1}
            onClick={handleDeleteSecurity}
            data-testid="remove-security-button"
          />
          <Button
            type="submit"
            text={buttonText || "Submit"}
            disabled={eventDataMutation.isPending}
            data-testid="submit-button"
          />
        </section>
      </form>
    </div>
  );
};

export default EventsForm;
