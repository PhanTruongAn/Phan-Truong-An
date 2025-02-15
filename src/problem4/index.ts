function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
// Time complexity: O(n) - Iterates through all numbers from 1 to n
// Space complexity: O(1) - Uses only a single sum variable

function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
// Time complexity: O(1) - Uses only a single mathematical operation
// Space complexity: O(1) - The space used is constant, not changing with n

function sum_to_n_c(n: number): number {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
}
// Time complexity: O(n) - Linear time, recursive calls from n down to 1
// Space complexity: O(n) - Linear space, stack frames for each recursive call
