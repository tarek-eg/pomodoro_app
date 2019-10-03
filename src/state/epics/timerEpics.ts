import { combineEpics, Epic } from "redux-observable";
import { interval } from "rxjs";
import {
  filter,
  mapTo,
  mergeMap,
  switchMap,
  takeUntil,
  flatMap
} from "rxjs/operators";
import { isOfType } from "typesafe-actions";

import { IRootActions, IRootState } from "../index";
import * as timerActions from "../actions/timerActions";
import {
  COUNT_DOWN_ONE_SECOND,
  START_TIMER,
  STOP_TIMER,
  COUNT_DOWN_FINISHED
} from "../actions/constants";
import { notify } from "../../utils/notifications";

const SOUND_EFFECT = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3"
);

type EpicType = Epic<IRootActions, IRootActions, IRootState>;
const { stopTimer, countDownFinished, countDownOneSecond } = timerActions;

export const startTimerEpic: EpicType = action$ =>
  action$.pipe(
    filter(isOfType(START_TIMER)),
    switchMap(() =>
      interval(1000).pipe(
        takeUntil(action$.pipe(filter(isOfType(STOP_TIMER)))),
        mapTo(countDownOneSecond())
      )
    )
  );

export const countDownFinishedEpic: EpicType = (action$, state$) =>
  action$.pipe(
    filter(isOfType(COUNT_DOWN_ONE_SECOND)),
    filter(() => {
      const { timeLeft } = state$.value.timer;

      return timeLeft.minutes === 0 && timeLeft.seconds === 0;
    }),
    mergeMap(() => [stopTimer(), countDownFinished()])
  );

export const alertEpic: EpicType = (action$, state$) => {
  return action$.pipe(
    filter(isOfType(COUNT_DOWN_FINISHED)),
    flatMap(() => {
      return [
        notify("Time's up!", {
          body: `You can take rest now`,
          vibrate: [2000, 2000, 2000],
          sound: SOUND_EFFECT
        })
      ];
    }),
    mergeMap(n => [timerActions.addNotification(n)])
  );
};

export const timerEpics = combineEpics(
  startTimerEpic,
  countDownFinishedEpic,
  alertEpic
);
