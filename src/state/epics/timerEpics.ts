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
import { Actions } from "../actions/constants";
import { notify } from "../../utils/notifications";

const SOUND_EFFECT = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3"
);

type EpicType = Epic<IRootActions, IRootActions, IRootState>;
const { stopTimer, countDownFinished, countDownOneSecond } = timerActions;

export const startTimerEpic: EpicType = action$ =>
  action$.pipe(
    filter(isOfType(Actions.START_TIMER)),
    switchMap(() =>
      interval(1000).pipe(
        takeUntil(action$.pipe(filter(isOfType(Actions.STOP_TIMER)))),
        mapTo(countDownOneSecond())
      )
    )
  );

export const countDownFinishedEpic: EpicType = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Actions.COUNT_DOWN_ONE_SECOND)),
    filter(() => {
      const {
        timeLeft: { minutes, seconds }
      } = state$.value.timer;

      return minutes === 0 && seconds === 0;
    }),
    mergeMap(() => [
      stopTimer(),
      countDownFinished(state$.value.timer.duration)
    ])
  );

export const alertEpic: EpicType = action$ => {
  return action$.pipe(
    filter(isOfType(Actions.COUNT_DOWN_FINISHED)),
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
