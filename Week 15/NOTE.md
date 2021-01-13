学习笔记

### 初步建立动画和时间线

1. 选着动画方案

- setInterval

```javascript
setInterval(() => {}, 16);

```
**16ms原因**：目前大多数浏览器动画fps值实现在60，计算后大约在16ms刷新一次动画更流畅

问题：由于setInterval不是立即执行，在16ms后添加任务到队列中，有可能出现上一个添加任务未执行，当前任务被添加了，上个任务执行完毕，当前任务立即执行情况，存在不稳定因素.

- setTimeout

```javascript
let tick = () => {
    setTimeout(tick, 16)
}

```

- requestAnimationFrame

```javascript
let tick = () => {
    requestAnimationFrame(tick)
}

```

优点：自适应帧变动，随浏览器帧变化而适配

### gesture


