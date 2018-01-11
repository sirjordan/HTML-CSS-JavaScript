'use strict'

function extractStringAsDigitArray(str) {
    var digitArr = [];

    for (let i = 0; i < str.split('').length; i++) {
        digitArr.push(parseInt(str[i]));
    }

    return digitArr;
}

function sumDigitArray(arrA, arrB) {
    arrA = arrA.reverse();
    arrB = arrB.reverse();

    var result = [];
    var maxLen = arrA.length > arrB.length ? arrA.length : arrB.length;

    var inMind = 0;
    for (let i = 0; i < maxLen; i++) {
        let sum = (arrA[i] || 0) + (arrB[i] || 0) + inMind;
        let remainder = 0;
        
        if (sum >= 10) {
            remainder = parseInt(sum / 10);
            sum = sum % 10;
        }

        result.push(sum);
        inMind = remainder;
    }

    return result.reverse().join('');
}

var input = ['183',
             '18'];
var numbers = [];
numbers.push(extractStringAsDigitArray(input[0]));
numbers.push(extractStringAsDigitArray(input[1]));

var sum = sumDigitArray(numbers[0], numbers[1]);

console.log(sum);


