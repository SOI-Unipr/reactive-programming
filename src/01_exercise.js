import {interval, map, Observable, take} from "rxjs";

/**
 * Emits the given events every given ms.
 * @param {number} period The interval emission period
 * @param {PlayerEvent[]} events A list of events regarding one single player
 * @return {Observable<PlayerEvent>} An observable series of events.
 */
export function emitPlayerEvents(period, events) {
    return interval(period).pipe(
        take(events.length),
        map(i => events[i])
    );
}
