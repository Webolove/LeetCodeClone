import assert from "assert";

const search2DMatrixHandler = (fn) => {
    try {
        const tests = [
            {
                matrix: [
                    [1, 3, 5, 7],
                    [10, 11, 16, 20],
                    [23, 30, 34, 60],
                ],
                target: 3,
            },
            {
                matrix: [
                    [1, 3, 5, 7],
                    [10, 11, 16, 20],
                    [23, 30, 34, 60],
                ],
                target: 13,
            },
        ];
        const answers = [true, false];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i].matrix, tests[i].target);
            assert.deepEqual(result, answers[i]);
        }
        return true;
    } catch (error) {
        throw new Error(error);
    }
};

const starterCodeSearch2DMatrixJS = `// Do not edit function name
function searchMatrix(matrix, target) {
  // Write your code here
};`;

export const search2DMatrix = {
    id: "search-in-2d-matrix",
    title: "5. Search in 2D Matrix",
    problemStatement: `
  <p class='mt-3'>Write an efficient algorithm that searches for a value in an <code>m x n</code> matrix. This matrix has the following properties:</p>
    <li class="mt-3">Integers in each row are sorted from left to right.</li>
    <li class="mt-3">The first integer of each row is greater than the last integer of the previous row.</li>
  <p class='mt-3'>Given <code>matrix</code>, an <code>m x n</code> matrix, and <code>target</code>, return <code>true</code> if <code>target</code> is in the matrix, and <code>false</code> otherwise.</p>
  `,
    examples: [
        {
            id: 0,
            inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
            outputText: `true`
        },
        {
            id: 1,
            inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 13`,
            outputText: `false`
        },
        {
            id: 2,
            inputText: `matrix = [[1]], target = 1`,
            outputText: `true`,
        },
    ],
    constraints: `
  <li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 100</code></li>
  <li class='mt-2'><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
  `,
    starterCode: starterCodeSearch2DMatrixJS,
    handlerFunction: search2DMatrixHandler,
    StarterFunctionName: "function searchMatrix",
    order: 5,
};