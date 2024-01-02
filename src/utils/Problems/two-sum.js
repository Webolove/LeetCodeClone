import assert from "assert";

const starterCodeTwoSum = `function twoSum(arr, target){
    // Write your code here
};`;

const handlerTwoSum = (fn)=>{
    try{
        const nums = [[2, 7, 11, 15], [2, 3, 4], [3, 3]];
        const target = [9, 6, 6];
        const answer = [[0, 1], [0, 2], [0, 1]];

        for(let i = 0; i < nums.length; ++i){
            // user function results
            // fn is user typed function
            const results = fn(nums[i], target[i]);
            assert.deepStrictEqual(results, answer[i]);
        }
        return true;
    }catch(error){
        throw new Error(error);
    }
}

export const twoSum = {
    id: "two-sum",
    title: "1. Two Sum",
    problemStatement: `<p class='mt-3'>
    Given an array of integers <code>nums</code> and an integer <code>target</code>, return {" "}
    <em>indices of the two numbers such that they add up to</em> <code>target</code>.
</p>
<p class='mt-3'>
    You may assume that each input would have <strong>exactly one solution</strong>, and you
    may not use thesame element twice.
</p>
<p class='mt-3'>You can return the answer in any order.</p>`,
    examples: [
        {
            id: 1,
            inputText: "nums = [2, 7, 11, 15]  target = 9",
            outputText: "[0, 1]",
            explanation: "Because nums[0] + nums[1] == 9. We return [0, 1]",
            img: ``
        },
        {
            id: 2,
            inputText: "nums = [2, 3, 4]  target = 6",
            outputText: "[0, 2]",
            explanation: "Because nums[0] + nums[2] == 6. We return [0, 2]",
            img: ``
        },
        {
            id: 3,
            inputText: "nums = [3, 3]  target = 6",
            outputText: "[0, 1]",
            explanation: ``,
            img: ``
        },
    ],
    constraints: `<li class='mt-2'>
    <code>2 ≤ nums.length ≤ 10</code>
</li>

<li class='mt-2'>
    <code>-10 ≤ nums[i] ≤ 10</code>
</li>
<li cl='mt-2'>
    <code>-10 ≤ target ≤ 10</code>
</li>
<li cl='mt-2 text-sm'>
    <strong>Only one valid answer exists.</strong>
</li>`,
    handlerfunction: handlerTwoSum,
    starterCode: starterCodeTwoSum,
    order: 1,
    StarterFunctionName: "function twoSum("
}