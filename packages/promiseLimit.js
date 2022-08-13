// 有限制的并行执行,就是在这个类里面加一个数组,
// 然后把每次运行的任务判断是否达到执行上线,

export default class handleLimitTask {
  constructor(maxCount) {
    this.maxCount = maxCount;
    this.pendingTask = [];
    this.completed = 0;
    this.count = 0;
  }

  run(task) {
    if (this.count < this.maxCount) {
      this.count++;
      task().then(() => {
        this.count--;
        this.completed++;
        if (this.pendingTask.length > 0) {
          this.run(this.pendingTask.shift());
        }
      });
    } else {
      this.pendingTask.push(task);
    }
  }
}
