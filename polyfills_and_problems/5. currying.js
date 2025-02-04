// Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. This allows you to partially apply the function to some arguments, creating a new function that can be called with the remaining arguments later.

// How Currying Works:

// In JavaScript, currying is typically achieved by creating nested functions. The outer function takes the first argument and returns an inner function, which takes the second argument, and so on, until all arguments are consumed.

// Here's a simple example to illustrate:

function add(x) {
	return function (y) {
		return x + y;
	};
}

const add5 = add(5); // Partial application, creating a new function with x = 5
console.log(add5(3)); // Outputs: 8

// Benefits of Currying:

// Modularity and Reusability: Currying allows you to create specialized versions of functions by partially applying arguments. These specialized functions can then be reused in different contexts, promoting modularity and reducing code duplication.

// Partial Application: Curried functions enable partial application, where you can fix some arguments upfront and defer the application of others. This is particularly useful in scenarios where you want to reuse a function with certain parameters predefined.

// Function Composition: Currying facilitates function composition, allowing you to combine smaller functions to create more complex ones. By breaking down functions into smaller units, you can compose them together to perform intricate operations.

// // Using Currying in Practice:
// Currying can be especially handy when dealing with functions that require multiple configurations or options. For instance, in libraries like Lodash or Ramda, currying is extensively used to create flexible and composable utility functions.

// Here's an example using currying with a hypothetical multiply function:
function multiply(x) {
	return function (y) {
		return x * y;
	};
}

const multiplyBy2 = multiply(2);
console.log(multiplyBy2(3)); // Outputs: 6




//  Problem 1:
const curry = () => {
	let total = 0;
	return function (num = 0) {
		total += num;
		return total;
	};
};

const sum = curry();
sum(5); // 5
sum(3); // 8
sum(4); // 12
sum(0); // 12




//  Problem 2:
const sumFunc = (...args) => {
	//spread the arguments in storage array
	const storage = [...args];

	//base case
	//if we have reached the limit
	if (storage.length === 0) {
		return 0;
	}

	let temp = (...newArgs) => {
		storage.push(...newArgs);
		if (newArgs.length === 0) {
			return storage.reduce((acc, currVal) => {
				console.log(acc, curr);
				return acc + curr;
			}, 0);
		} else {
			return temp;
		}
	};

	return temp;
};

const total = sumFunc(10)(20)(30)(40)();
console.log(total);




// Problem 4:
const curryingFunc = (func) => {
	// Define a helper function that handles currying
	const helper = (...args) => {
		// If enough arguments are provided, call the original function
		if (args.length >= func.length) {
			return func(...args); // Call the original function with all arguments
		} else {
			// If not enough arguments are provided, return a new function
			const temp = (...newArgs) => {
				return helper(...args, ...newArgs); // Recursively call helper with old and new arguments
			};
			return temp; // Return the new function for further currying
		}
	};

	return helper; // Return the inner function
};

function sum(a, b, c, d, e) {
	return a + b + c + d + e;
}

let curriedSum = curryingFunc(sum);
console.log(curriedSum(1, 2, 3, 4, 5)); // Output: 15
console.log(curriedSum(1)(2, 3)(4, 5)); // Output: 15
console.log(curriedSum(1)(2)(3)(4)(5)); // Output: 15




// Problem 5:
// The valueOf() method of Object instances converts the this value to an object. This method is meant to be overridden by derived objects for custom type conversion logic.
// example: 
function MyNumberType(n) {
	this.number = n;
}

MyNumberType.prototype.valueOf = function () {
	return this.number;
};

const object1 = new MyNumberType(4);

console.log(object1 + 3); // 7


const addFunc = (...args) => {
    let storage = [...args];

    function helper(...newArgs){
        storage.push(...newArgs);
        return helper;
    }

    helper.valueOf = function(){
        return storage.reduce((acc, curr) => acc + curr, 0);
    }

    helper.value = helper.valueOf;
    this.value = helper.valueOf;
    return helper

}



console.log(addFunc(1, 2, 3).value() === 6); //true
console.log(addFunc(1, 2)(3).value() === 6); //true
console.log(addFunc(1)(2)(3).value() === 6); //true
console.log(addFunc(1)(2) + 3); // 6





// Problem 6:
function sum(num) {
	let currentSum = num;

	function add(nextNum) {
		currentSum += nextNum;
		return add; // Return the function for chaining
	}

	add.toString = function () {
		return currentSum;
	};

	return add; // Return the function for chaining
}

console.log(sum(1)(2)(3).toString()); // Output: 6



function add(...args){
    let total = 0;
    
    return function sum(num = 0){
        total += num
        return total
    }

    sum.toString = function(){
        return total
    }

}
console.log(sum(1)(2)(3).toString()); // Output: 6

