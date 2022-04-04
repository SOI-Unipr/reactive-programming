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
    return events.pipe(scan(apply, {}));
}

/**
 * Applies an event to the given player.
 * @param {Player} player A player's entity
 * @param {PlayerEvent} event An event occurring to the given player
 * @return {Player} An updated player's entity that reflects the given event
 */
function apply(player, event) {
    switch (event.type) {
        // @formatter:off
        case 'CREATED': return createPlayer(event);
        case 'UPDATED': return updatePlayer(player, event);
        case 'DELETED': return player;
        // @formatter:on
    }
}

/**
 * Creates a new player.
 * @param {PlayerEvent} event An event occurring to the given player
 * @return {Player} A new player
 */
function createPlayer(event) {
    let id = 0, firstName = '', lastName = '', age = 0, favGames = [];
    for (const change of event.changes) {
        switch (change.property) {
            // @formatter:off
            case 'id': id = change.newValue; break;
            case 'firstName': firstName = change.newValue; break;
            case 'lastName': lastName = change.newValue; break;
            case 'age': age = change.newValue; break;
            case 'favouriteGames': favGames = change.newValue; break;
            // @formatter:on
        }
    }
    return new Player(id, firstName, lastName, age, favGames);
}

/**
 * Updates a player.
 * @param {Player} player A player
 * @param {PlayerEvent} event An event occurring to the given player
 * @return {Player} An updated player
 */
function updatePlayer(player, event) {
    let id = player.id,
        firstName = player.firstName,
        lastName = player.lastName,
        age = player.age,
        favGames = player.favouriteGames;
    for (const change of event.changes) {
        switch (change.property) {
            // @formatter:off
            case 'firstName': firstName = change.newValue; break;
            case 'lastName': lastName = change.newValue; break;
            case 'age': age = change.newValue; break;
            case 'favouriteGames': favGames = change.newValue; break;
            // @formatter:on
        }
    }
    return new Player(id, firstName, lastName, age, favGames);
}
