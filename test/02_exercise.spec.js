import {describe, it} from "mocha";
import {expect} from "chai";
import {mkDummies, mkPlayerEvents} from "./mocks.js";
import {emitPlayerEvents} from "../src/01_exercise.js";
import {applyEvents} from "../src/02_exercise.js";
import {consume} from "./utils.js";
import {Player} from "../src/models.js";

function checkPlayer(actual, expected) {
    expect(actual.id).to.be.eq(expected.id);
    expect(actual.firstName).to.be.eq(expected.firstName);
    expect(actual.lastName).to.be.eq(expected.lastName);
    expect(actual.age).to.be.eq(expected.age);
    expect(actual.favouriteGames).to.have.length(expected.favouriteGames.length);

    for (let i = 0; i < actual.favouriteGames.length; i++) {
        const actFav = actual.favouriteGames[i];
        const expFav = expected.favouriteGames[i];
        expect(actFav.name).to.be.eq(expFav.name);
        expect(actFav.type).to.be.eq(expFav.type);
    }
}

describe("Applying a player's events", () => {
    const players = mkDummies();

    it('should emit consistent entities', async () => {
        const player = players[0];
        const events = mkPlayerEvents(player);
        const obs = applyEvents(emitPlayerEvents(300, events));
        const entities = await consume(obs);
        expect(entities).to.have.length(5);
        checkPlayer(entities[0], new Player(player.id, player.firstName, player.lastName, player.age + 11, []));
        checkPlayer(entities[1], new Player(player.id, player.firstName, player.lastName, player.age, []));
        checkPlayer(entities[2], new Player(player.id, player.firstName, player.lastName, player.age, player.favouriteGames.slice(0, Math.ceil(player.favouriteGames.length/2))));
        checkPlayer(entities[3], new Player(player.id, player.firstName, player.lastName, player.age, player.favouriteGames));
        checkPlayer(entities[4], new Player(player.id, player.firstName, player.lastName, player.age, player.favouriteGames));
    });

});
