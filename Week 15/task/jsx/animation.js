const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIMATIONS = Symbol('animations');
const START_TIME = Symbol('start-time');
const PAUSE_START = Symbol('pause-start');
const PAUSE_TIME = Symbol('pause-time');

export class Timeline {
    constructor() {
        this.state = 'inited';
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }

    start() {
        if (this.state !== 'inited') return;
        this.state = 'started';
        const startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[TICK] = () => {
            const now = Date.now();
            for (const animation of this[ANIMATIONS]) {
                let t;
                if (this[START_TIME].get(animation) < startTime) {
                    t = now - startTime - this[PAUSE_TIME];
                } else {
                    // 在add时传入一个在start时间线后时间，动画开始就以这个时间点为开始点
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME];
                }
                if (animation.duration < t) {
                    this[ANIMATIONS].delete(animation);
                    // 动画执行达到duration（结束），recive时间给animation.duration
                    t = animation.duration;
                }
                animation.receive(t);
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }

    // set rate() {}
    // get rate() {}

    pause() {
        if (this.state !== 'started') return;
        this.state = 'paused';
        // 记录暂停时时间
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }
    resume() {
        if (this.state !== 'paused') return;
        this.state = 'started';
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[TICK]();
    }
    reset() {
        this.pause();
        this.state = 'inited';
        this[PAUSE_TIME] = 0;
        this[PAUSE_START] = 0;
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        this[TICK_HANDLER] = null;
    }

    add(animation, startTime) {
        if (arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime);
    }
}

export class Animation {
    constructor(object, property, startTime, endTime, duration, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.timingFunction = timingFunction;
        this.template = template;
    }

    receive(time) {
        const range = this.endTime - this.startTime;
        this.object[this.property] = this.template(this.startTime + range * time / this.duration);
    }
}
