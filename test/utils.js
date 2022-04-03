import {materialize} from "rxjs";

/**
 * Consumes an observable and returns the array of emitted data when it completes.
 * Otherwise rejects with the emitted error.
 * @param {Observable<T>} obs An observable
 * @return {Promise<T[]>} A promise that completes with emitted data
 */
export function consume(obs) {
    return new Promise((res, rej) => {
        const data = [];
        obs.pipe(materialize())
            .subscribe(n => {
                switch (n.kind) {
                    case 'N':
                        data.push(n.value);
                        break;
                    case 'E':
                        rej(n.error);
                        break;
                    case 'C':
                        res(data);
                        break;
                }
            });
    });
}
