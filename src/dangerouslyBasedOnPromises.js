import PRIORITIES from './priorities';

const tasksPriorities = [];

const schedule = (task, level = PRIORITIES.MEDIUM, resolveRef) => {
    if (level === PRIORITIES.HIGH) {
        return task();
    }

    if (!resolveRef) {
        tasksPriorities.push(level);
    }

    return Promise.resolve().then(() => new Promise((resolve) => {
        const originalResolve = resolveRef || resolve;

        if (tasksPriorities.some((task) => task < level)) {
            schedule(task, level, originalResolve);
        } else {
            const index = tasksPriorities.findIndex((l) => level === l);
            tasksPriorities[index] = 10;
            originalResolve(task());
        }
    }));
};

export default schedule;
