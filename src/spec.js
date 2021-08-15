import schedule from '.';
import PRIORITIES from './priorities';

let commands = [];

describe('Schedulify', () => {
    beforeEach(() => {
        commands = [];
    });

    describe('when scheduling without level', () => {
        beforeEach(() => {
            schedule(() => commands.push(1));
            schedule(() => commands.push(2));
            schedule(() => commands.push(3));
        });

        it('should append the command one after another', () => {
            expect(commands).toEqual([1, 2, 3]);
        });
    });

    describe('when scheduling with high levels', () => {
        beforeEach(() => {
            schedule(() => commands.push(1), PRIORITIES.HIGH);
            schedule(() => commands.push(2), PRIORITIES.HIGH);
            schedule(() => commands.push(3), PRIORITIES.HIGH);
        });

        it('should append the command one after another', () => {
            expect(commands).toEqual([1, 2, 3]);
        });
    });

    describe('when scheduling multiple levels', () => {
        beforeEach((done) => {
            Promise.all([
                schedule(() => commands.push(1), PRIORITIES.VERY_LOW),
                schedule(() => commands.push(2), PRIORITIES.LOW),
                schedule(() => commands.push(3), PRIORITIES.MEDIUM),
                schedule(() => commands.push(4), PRIORITIES.HIGH)
            ]).then(() => done());
        });

        it('should run the command with respect for their priority', () => {
            expect(commands).toEqual([4, 3, 2, 1]);
        });
    });

    describe('when scheduling multiple levels within nested scheduled tasks', () => {
        beforeEach((done) => {
            Promise.all([
                schedule(() => commands.push(1), PRIORITIES.VERY_LOW),
                schedule(() => {
                    commands.push(2);
                    schedule(() => commands.push(4), PRIORITIES.LOW);
                }, PRIORITIES.LOW),
                schedule(() => commands.push(3), PRIORITIES.MEDIUM)
            ]).then(() => done());
        });

        it('should run the command with respect for their priority', () => {
            expect(commands).toEqual([3, 2, 4, 1]);
        });
    });
});
