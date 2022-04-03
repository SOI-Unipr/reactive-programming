import {interval, map, take} from "rxjs";

/**
 * Given an observable of the events occurring to different players, generate an
 * observable that emits the live changes to each player.
 * The 'DELETED' event can be ignored.
 *
 * @param {Observable<PlayerEvent>} events The observable of events emitted for different players
 * @return {Observable<Player>} The observable of players, created and updated according to events
 */
export function applyEvents(events) {
    // TODO
}
