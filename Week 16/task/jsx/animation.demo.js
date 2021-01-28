import { Timeline, Animation } from './animation';

const tl = new Timeline();
tl.add(new Animation(document.getElementById('box1').style, 'transform', 0, 1000, 3000, null, v => `translateX(${v}px)`));
tl.add(new Animation(document.getElementById('box2').style, 'transform', 0, 1000, 4000, null, v => `translateX(${v}px)`));
tl.start();

document.getElementById('pause').addEventListener('click', () => tl.pause());
document.getElementById('resume').addEventListener('click', () => tl.resume());
