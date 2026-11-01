import Flight from '../models/flight.js';

class FlightMinHeap {
  constructor() {
    this.heap = [];
  }

  #getParentIndex(i) { return Math.floor((i - 1) / 2); }
  #getLeftChildIndex(i) { return 2 * i + 1; }
  #getRightChildIndex(i) { return 2 * i + 2; }

  #parseDuration(duration) {
    if (typeof duration === 'number') return duration;
    if (!duration) return 0;

    const match = String(duration).match(/(\d+)h\s*(\d+)m/);
    if (match) {
      return Number(match[1]) * 60 + Number(match[2]);
    }

    return 0;
  }

  #getPriority(item) {
    if (Array.isArray(item)) {
      return item.reduce((sum, flight) => sum + this.#parseDuration(flight.duration), 0);
    }
    return this.#parseDuration(item?.duration);
  }

  #swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(flight) {
    this.heap.push(flight);
    this.#heapifyUp();
  }

  #heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0 && this.#getPriority(this.heap[this.#getParentIndex(index)]) > this.#getPriority(this.heap[index])) {
      this.#swap(this.#getParentIndex(index), index);
      index = this.#getParentIndex(index);
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.#heapifyDown();
    return min;
  }

  #heapifyDown() {
    let index = 0;
    while (this.#getLeftChildIndex(index) < this.heap.length) {
      let smallestChildIndex = this.#getLeftChildIndex(index);
      let rightChildIndex = this.#getRightChildIndex(index);

      if (rightChildIndex < this.heap.length &&
          this.#getPriority(this.heap[rightChildIndex]) < this.#getPriority(this.heap[smallestChildIndex])) {
        smallestChildIndex = rightChildIndex;
      }

      if (this.#getPriority(this.heap[index]) <= this.#getPriority(this.heap[smallestChildIndex])) break;

      this.#swap(index, smallestChildIndex);
      index = smallestChildIndex;
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }
}

export default FlightMinHeap;
