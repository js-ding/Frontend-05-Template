import { Component } from './framework.js';

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

        let position = 0;
        this.root.addEventListener('mousedown', evt => {
            const startX = evt.clientX;
            const children = this?.root?.children;

            const move = (evt) => {
                // this.timer && clearInterval(this.timer);
                // this.animateTimer && clearInterval(this.animateTimer);
                const x = evt.clientX - startX;
                const rootWidth = this.root.getBoundingClientRect().width;
                // for (const child of children) {
                //     child.style.transition = 'none';
                //     child.style.transform = `translateX(${-position * rootWidth + x}px)`;
                // }
                const current = position - ((x - x % rootWidth) / rootWidth);

                for (const offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = 'none';
                    children[pos].style.transform = `translateX(${-pos * rootWidth + offset * rootWidth + x % rootWidth}px)`;
                }
            }
            const up = (evt) => {
                const x = evt.clientX - startX;
                const rootWidth = this.root.getBoundingClientRect().width;

                // 这就是优雅代码
                position = position - Math.round(x / rootWidth);
                // position = Math.abs(x) > (rootWidth / 2) ? (x > 0 ? position - 1 : position + 1) : position;

                // for (const child of children) {
                //     child.style.transition = '';
                //     child.style.transform = `translateX(${-position * rootWidth}px)`;
                // }
                for (const offset of [0, - Math.sign(Math.round(x / rootWidth) - x + (rootWidth / 2) * Math.sign(x))]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = '';
                    children[pos].style.transform = `translateX(${-pos * rootWidth + offset * rootWidth}px)`;
                }
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
                // autoPlay();
            }

            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        })

        // const autoPlay = () => {
        //     let currentIndex = 0;
        //     this.timer = setInterval(() => {
        //         const children = this?.root?.children;
        //         let nextIndex = (currentIndex + 1) % children.length;
        //         let current = children[currentIndex];
        //         const next = children[nextIndex];

        //         // 准备好下一个
        //         next.style.transition = 'none';
        //         next.style.transform = `translateX(${-100 * nextIndex + 100}%)`;

        //         // 开始一次轮播
        //         this.animateTimer = setTimeout(() => {
        //             current.style.transform = `translateX(${-100 * (currentIndex + 1)}%)`;
        //             next.style.transition = '';
        //             next.style.transform = `translateX(${-100 * nextIndex}%)`;

        //             currentIndex = nextIndex;
        //         }, 16);
        //     }, 4000);
        // }

        // autoPlay();

        return this.root;
    }

    mountTo(parent) {
        parent.appendChild(this.render());
    }
}
