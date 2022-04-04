import {expect} from 'chai';
import {describe, it} from "mocha";
import {emitPlayerEvents} from '../src/01_exercise.js';
import {mkDummies, mkPlayerEvents} from "./mocks.js";
import {consume} from "./utils.js";

describe('Emitting player events', () => {
    const players = mkDummies();

    it('should produce pre-defined events', async () => {
        const player = players[0];
        const events = mkPlayerEvents(player);
        const obs = emitPlayerEvents(300, events);
        const actualEvents = await consume(obs);
        expect(actualEvents).to.have.length(5);
        expect(actualEvents.map(e => e.type)).to.be.deep.eq(['CREATED', 'UPDATED', 'UPDATED', 'UPDATED', 'DELETED']);
    });

});
