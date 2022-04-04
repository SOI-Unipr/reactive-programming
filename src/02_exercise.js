import {Observable, scan} from "rxjs";
import {Player} from "./models.js";

/**
 * Given an observable of the events occurring to a single player, generate an
 * observable that emits the entity obtained by applying those changes.
 * The 'DELETED' event can be ignored.
 *
 * @param {Observable<PlayerEvent>} events The observable of events emitted for a single player
 * @return {Observable<Player>} The observable of player's entities, created and updated according to events
 */
export function applyEvents(events) {
    // TODO
}
