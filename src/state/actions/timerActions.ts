import { createStandardAction } from "typesafe-actions";
import { Actions } from "./constants";
import { Time } from "../../time";

export const setTime = createStandardAction(Actions.SET_TIME)<Time>();

export const startTimer = createStandardAction(Actions.START_TIMER)();

export const stopTimer = createStandardAction(Actions.STOP_TIMER)();

export const countDownOneSecond = createStandardAction(
  Actions.COUNT_DOWN_ONE_SECOND
)();

export const countDownFinished = createStandardAction(
  Actions.COUNT_DOWN_FINISHED
)<Time>();

export const addNotification = createStandardAction(Actions.ADD_NOTIFICATION)<
  Notification
>();
