import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Joyride,
  ACTIONS,
  EVENTS,
  PORTAL_ELEMENT_ID,
  STATUS,
  type Actions,
  type EventData,
  type Status,
  type Step,
} from "react-joyride";

import { TOURS, type TourId } from "@/tours/registry";

type TourContextValue = {
  startTour: (id: TourId) => void;
  stopTour: () => void;
  isRunning: boolean;
  activeTourId: TourId | null;
};

const TourContext = createContext<TourContextValue | null>(null);

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useTour must be used within TourProvider");
  return ctx;
}

export default function TourProvider({ children }: { children: ReactNode }) {
  const [activeTourId, setActiveTourId] = useState<TourId | null>(null);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [instanceKey, setInstanceKey] = useState(0);
  const startTokenRef = useRef(0);

  const startTour = useCallback((id: TourId) => {
    const tour = TOURS[id];
    if (!tour) return;
    startTokenRef.current += 1;
    const token = startTokenRef.current;
    setRun(false);
    setActiveTourId(id);
    setSteps(tour.steps);
    setStepIndex(0);
    setInstanceKey((k) => k + 1);
    requestAnimationFrame(() => {
      if (startTokenRef.current !== token) return;
      setRun(true);
    });
  }, []);

  const stopTour = useCallback(() => {
    startTokenRef.current += 1;
    setRun(false);
    setActiveTourId(null);
    setSteps([]);
    setStepIndex(0);
    setInstanceKey((k) => k + 1);

    requestAnimationFrame(() => {
      if (typeof document === "undefined") return;
      const portal = document.getElementById(PORTAL_ELEMENT_ID);
      if (portal) portal.remove();
    });
  }, []);

  const onEvent = useCallback(
    (data: EventData) => {
      const status = data.status as Status;
      const action = data.action as Actions;

      if (
        ([STATUS.FINISHED, STATUS.SKIPPED] as Status[]).includes(status) ||
        data.type === EVENTS.TOUR_END
      ) {
        stopTour();
        return;
      }

      // In controlled mode, Joyride doesn't automatically end the tour when the
      // user closes or skips. If we don't stop explicitly, the overlay can remain.
      if (action === ACTIONS.CLOSE || action === ACTIONS.SKIP) {
        stopTour();
        return;
      }

      if (data.type === EVENTS.TARGET_NOT_FOUND) {
        if (typeof data.index === "number" && typeof data.size === "number") {
          if (data.index >= data.size - 1) {
            stopTour();
            return;
          }
        }
        setStepIndex((i) => Math.min(i + 1, Math.max(0, steps.length - 1)));
        return;
      }

      if (data.type === EVENTS.STEP_AFTER) {
        if (
          typeof data.index === "number" &&
          typeof data.size === "number" &&
          data.index >= data.size - 1 &&
          action !== ACTIONS.PREV
        ) {
          stopTour();
          return;
        }

        const delta = action === ACTIONS.PREV ? -1 : 1;
        setStepIndex((i) =>
          Math.min(Math.max(i + delta, 0), Math.max(0, steps.length - 1)),
        );
      }
    },
    [steps.length, stopTour],
  );

  const value = useMemo<TourContextValue>(
    () => ({
      startTour,
      stopTour,
      isRunning: run,
      activeTourId,
    }),
    [activeTourId, run, startTour, stopTour],
  );

  return (
    <TourContext.Provider value={value}>
      {activeTourId && steps.length ? (
        <Joyride
          key={instanceKey}
          run={run}
          stepIndex={stepIndex}
          steps={steps}
          continuous
          scrollToFirstStep={false}
          onEvent={onEvent}
          options={{
            zIndex: 10000,
            targetWaitTimeout: 2000,
            buttons: ["back", "skip", "close", "primary"],
            primaryColor: "#0058be",
            overlayColor: "rgba(0,0,0,0.55)",
            backgroundColor: "#ffffff",
            textColor: "#0b1c30",
          }}
          styles={{
            tooltip: {
              borderRadius: 12,
              boxShadow: "0 16px 60px rgba(0,0,0,0.12)",
            },
            buttonPrimary: {
              backgroundColor: "#0058be",
              borderRadius: 10,
              padding: "10px 14px",
              fontWeight: 700,
            },
            buttonBack: {
              marginRight: 8,
              borderRadius: 10,
              padding: "10px 14px",
              fontWeight: 700,
            },
            buttonSkip: {
              borderRadius: 10,
              padding: "10px 12px",
              fontWeight: 700,
            },
          }}
        />
      ) : null}
      {children}
    </TourContext.Provider>
  );
}

