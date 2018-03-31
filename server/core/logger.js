import debug from 'debug';

export const levels = new Map;

levels.add = function (name, config) {
    config.name = name;
    this.set(name, config);
    return this;
};

levels.add('debug', {
    color: 81,
    level: 10
}).add('info', {
    color: 76,
    level: 20
}).add('warning', {
    color: 149,
    level: 220
}).add('error', {
    color: 161,
    level: 161
}).add('critical', {
    color: 38,
    level: 129
});


export default (name, level) => {
    level = levels.get(level) || levels.get('info');
    const logger = {};
    let db;

    levels.forEach(l => {
        db = debug(`${name} - ${l.name} -`);
        db.color = l.color;
        db.enabled = l.level >= level.level;
        logger[l.name] = db;
    });

    return logger;
};
