import {
    Component
} from './framework.js';
import {
    enableGesture
} from './gesture';
import {
    Timeline,
    Animation
} from './animation';
import { ease } from './ease';

const DURATION = 500;
export class Carousel extends Component {
    constructor() {
        super();

        this.attributes = Object.create(null);
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for (const record of this?.attributes?.src) {
            const child = document.createElement('div');
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        enableGesture(this.root);
        const tl = new Timeline();
        tl.start();

        let position = 0;
        const children = this?.root?.children;

        let t = 0; // 每屏自动播放开始时间
        let ax = 0; // 每屏自动播放到人为触发偏移量
        let timer = null;
        this.root.addEventListener('start', evt => {
            tl.pause();
            clearInterval(timer);
            const process = (Date.now() - t) / DURATION;
            const rootWidth = this.root.getBoundingClientRect().width;
            console.log('process:', process)
            ax = ease(process) * rootWidth - rootWidth;
            console.log('ax:', ax)
        })

        this.root.addEventListener('pan', evt => {
            const x = evt.clientX - evt.startX - ax;
            const rootWidth = this.root.getBoundingClientRect().width;
            const current = position - ((x - x % rootWidth) / rootWidth);

            for (const offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = ((pos % children.length) + children.length) % children.length;

                // children[pos].style.transition = 'none';
                children[pos].style.transform = `translateX(${-pos * rootWidth + offset * rootWidth + x % rootWidth}px)`;
            }
        });

        this.root.addEventListener('end', evt => {
            tl.reset();
            tl.start();
            timer = setInterval(nextPicture, 4000);

            const x = evt.clientX - evt.startX - ax;
            const rootWidth = this.root.getBoundingClientRect().width;

            const current = position - ((x - x % rootWidth) / rootWidth);
            let direction = Math.round((x % rootWidth) / rootWidth); // 动画方向

            if (evt.isFlick) {
                console.log('speed:', evt.speed);
                if (evt.speed < 0) {
                    direction = Math.ceil((x % rootWidth) / rootWidth);
                } else {
                    direction = Math.floor((x % rootWidth) / rootWidth);
                }
            }

            for (const offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = ((pos % children.length) + children.length) % children.length;

                children[pos].style.transition = 'none';
                // children[pos].style.transform = `translateX(${-pos * rootWidth + offset * rootWidth + x % rootWidth}px)`;
                tl.add(new Animation(children[pos].style, 'transform',
                    -pos * rootWidth + offset * rootWidth + x % rootWidth,
                    -pos * rootWidth + offset * rootWidth + direction * rootWidth,
                    DURATION,
                    0,
                    ease,
                    v => `translate(${v}px)`,
                ));
            };

            position = current - direction;
            position = ((position * children.length) + children.length) % children.length;
        });

        const nextPicture = () => {
            const rootWidth = this.root.getBoundingClientRect().width;
            // const children = this?.root?.children;
            let nextIndex = (position + 1) % children.length;
            let current = children[position];
            const next = children[nextIndex];

            t = Date.now();

            tl.add(new Animation(current.style, 'transform',
                -rootWidth * position,
                -rootWidth * position - rootWidth,
                DURATION,
                0,
                ease,
                v => `translate(${v}px)`,
            ));
            tl.add(new Animation(next.style, 'transform',
                -rootWidth * nextIndex + rootWidth,
                -rootWidth * nextIndex,
                DURATION,
                0,
                ease,
                v => `translate(${v}px)`,
            ));

            position = nextIndex;
        };

        timer = setInterval(nextPicture, 4000);

        return this.root;
    }

    mountTo(parent) {
        parent.appendChild(this.render());
    }
}