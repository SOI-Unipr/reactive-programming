import {Game, Player, PlayerEvent} from "../src/models.js";

/**
 * Builds some games.
 * @returns {Game[]} A list of games
 */
export function mkGames() {
    return [
        new Game('Monopoli', 'TABLETOP', 1800, [10, 90]),
        new Game('Fifa', 'CONSOLE', 1990, [10, 60]),
        new Game('D&D', 'TABLETOP', 1970, [15, 90]),
        new Game('D&D', 'CONSOLE', 1980, [15, 80]),
        new Game('Soccer', 'OUTDOOR', 1800, [2, 40]),
        new Game('Skate', 'OUTDOOR', 1970, [5, 30]),
        new Game('Baseball', 'OUTDOOR', 1900, [5, 50]),
        new Game('Volleyball', 'OUTDOOR', 1800, [5, 60]),
        new Game('Counter Strike', 'CONSOLE', 1998, [10, 60]),
        new Game('Mascarade', 'TABLETOP', 2010, [10, 90]),
        new Game('Dixit', 'TABLETOP', 2000, [10, 90]),
        new Game('Tennis', 'OUTDOOR', 1800, [5, 60]),
        new Game('DoD', 'CONSOLE', 1990, [5, 60]),
        new Game('SimCity', 'CONSOLE', 1990, [5, 60]),
        new Game('Mario Bros', 'CONSOLE', 1980, [5, 60]),
        new Game('Tumblepop', 'CONSOLE', 1980, [5, 60]),
        new Game('Bubble Bobble', 'CONSOLE', 1980, [5, 60]),
        new Game('Basket', 'OUTDOOR', 1900, [5, 60]),
        new Game('Mountain Bike', 'OUTDOOR', 1980, [5, 60]),
        new Game('Carcassonne', 'TABLETOP', 1990, [10, 90]),
        new Game('Terminator', 'CONSOLE', 1995, [5, 60]),
        new Game("Blue's journey", 'CONSOLE', 1980, [5, 60]),
        new Game('Tux', 'CONSOLE', 2000, [5, 60]),
        new Game('Hide&Seek', 'OUTDOOR', 1500, [5, 90]),
        new Game('Pandemic', 'TABLETOP', 2000, [10, 90]),
        new Game('Power Plant', 'TABLETOP', 2000, [10, 90]),
        new Game('Arkham Horror', 'TABLETOP', 2000, [10, 90]),
        new Game('Arkham Horror', 'CONSOLE', 2020, [18, 90]),
        new Game('Munchkin', 'TABLETOP', 2000, [10, 90]),
        new Game('Chess', 'TABLETOP', 1400, [10, 90]),
        new Game('Chess', 'CONSOLE', 1970, [10, 90]),
        new Game('Un Due Tre Stella', 'OUTDOOR', 1800, [10, 50])
    ];
}

/**
 * Builds some players.
 * @returns {Player[]} A list of players
 */
export function mkDummies() {
    const games = mkGames();

    function peek(...indexes) {
        const gs = [];
        for (const i of indexes) {
            const g = games[i % games.length];
            gs.push(g);
        }
        return gs;
    }

    return [
        new Player(100, 'A', 'Z', 4, peek(0, 1, 2, 3, 5, 6)),
        new Player(101, 'B', 'Y', 10, peek(7, 8, 9, 10)),
        new Player(102, 'C', 'X', 20, peek(11, 12)),
        new Player(103, 'D', 'W', 30, peek(0, 13, 17, 19, 23, 29, 31)),
        new Player(104, 'E', 'V', 30, peek(14, 15, 16)),
        new Player(105, 'F', 'U', 10, peek(17, 18, 19, 20, 21, 22, 23)),
        new Player(106, 'G', 'T', 12, peek(24, 25, 26)),
        new Player(107, 'H', 'S', 5, peek(27, 28, 29, 30, 31, 32, 33, 34)),
        new Player(108, 'I', 'R', 99, peek(0, 1, 2, 3, 5, 8, 13, 21, 34)),
        new Player(109, 'J', 'Q', 15, peek(0, 5, 10, 15, 20, 25)),
        new Player(110, 'K', 'P', 20, peek(37, 38, 39, 40, 50)),
        new Player(111, 'L', 'O', 10, peek(41, 42, 43, 44, 45, 46, 47, 48))
    ];
}

/**
 * Creates a set of player events.
 * @param {Player} player A player
 * @return {PlayerEvent[]} An array of player's events from creation to deletion.
 */
export function mkPlayerEvents(player) {
    const lowHalf = player.favouriteGames.slice(0, Math.ceil(player.favouriteGames.length / 2));
    return [
        new PlayerEvent('CREATED', [
            {property: 'id', newValue: player.id},
            {property: 'firstName', newValue: player.firstName},
            {property: 'lastName', newValue: player.lastName},
            {property: 'age', newValue: player.age + 11},
            {property: 'favouriteGames', newValue: []}
        ]),
        new PlayerEvent('UPDATED', [
            {property: 'age', oldValue: player.age + 11, newValue: player.age}
        ]),
        new PlayerEvent('UPDATED', [
            {property: 'favouriteGames', oldValue: [], newValue: lowHalf}
        ]),
        new PlayerEvent('UPDATED', [
            {property: 'favouriteGames', oldValue: lowHalf, newValue: player.favouriteGames}
        ]),
        new PlayerEvent('DELETED', []),
    ];
}
