import PRIORITIES from './priorities';
import dangerouslyBasedOnPromises from './dangerouslyBasedOnPromises';

const tasksPriorities = [];

const schedule = (task, level = PRIORITIES.MEDIUM, resolveRef) => new Promise((resolve) => {
    const originalResolve = resolveRef || resolve;

    if (level === PRIORITIES.HIGH) {
        resolve(task());
        return;
    }

    if (!resolveRef) {
        tasksPriorities.push(level);
    }

    const runTask = () => {
        const index = tasksPriorities.findIndex((l) => level === l);
        tasksPriorities[index] = 10;
        originalResolve(task());
    };

    setTimeout(() => {
        if (tasksPriorities.some((task) => task < level)) {
            schedule(task, level, originalResolve);
        } else {
            runTask();
        }
    });
});

export { PRIORITIES, dangerouslyBasedOnPromises };
export default schedule;
