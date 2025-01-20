/**
 * O(n)
 */
function sum_to_n_a(n: number): number {
  let sum = 0;

  let i = 1;
  for (i; i <= n; i++) {
    sum += i;
  }

  return sum;
}

console.log('////////////////////////\nResult of function 1:');

console.log(sum_to_n_a(4))
console.log(sum_to_n_a(5))
console.log(sum_to_n_a(3))
console.log(sum_to_n_a(15))
console.log(sum_to_n_a(100))

/**
 * O(n / 2) ->>>> O(n)
 */
function sum_to_n_b(n: number): number {
  let sum = 0;

  let i = 1;
  let j = n;
  const mid = Math.floor(n / 2);
  for (; i <= mid && j >= mid; i++, j--) {
    sum += i + j;
  }

  if (n % 2 !== 0) sum += mid + 1;

  return sum;
}

console.log('////////////////////////\nResult of function 2:');
console.log(sum_to_n_b(4))
console.log(sum_to_n_b(5))
console.log(sum_to_n_b(3))
console.log(sum_to_n_b(15))
console.log(sum_to_n_b(100))

/**
 * O(1)
 */
function sum_to_n_c(n: number): number {
  return (n * (n + 1)) / 2;
}

console.log('////////////////////////\nResult of function 3:');
console.log(sum_to_n_c(4))
console.log(sum_to_n_c(5))
console.log(sum_to_n_c(3))
console.log(sum_to_n_c(15))
console.log(sum_to_n_c(100))
