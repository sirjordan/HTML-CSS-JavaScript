'use strict'

function Person(firstName, lastName, age) {
	return {
		firstName: firstName,
		lastName: lastName,
		age: age,
		toString: function () {
			return this.firstName + ' ' + this.lastName + '(age' + this.age + ')';
		}
	}
};

function group(persons, prop) {
	let grouped = {};

	for (let i = 0; i < persons.length; i++) {
		let person = persons[i];

		if (!grouped[person[prop]]) {
			grouped[person[prop]] = [];
		}

		grouped[person[prop]].push(person);
	}

	return grouped;
}

function print(grouped) {
	for (let key in grouped) {
		if (grouped.hasOwnProperty(key)) {
			let groupMembers = grouped[key];
			let groupToString = '';

			for (let i = 0; i < groupMembers.length; i++) {
				groupToString += groupMembers[i].toString();
				if (i < groupMembers.length - 1) {
					groupToString += ', ';
				}
			}

			console.log('Group ' + key + ' : [' + groupToString + ']')
		}
	}
}

(function () {
	var people = [];

	people.push(new Person("Scott", "Guthrie", 38));
	people.push(new Person("Scott", "Johns", 36));
	people.push(new Person("Scott", "Hanselman", 39));
	people.push(new Person("Jesse", "Johns", 57));
	people.push(new Person("John", "Skeet", 38));

	var byName = group(people, 'firstName');
	var byAge = group(people, 'age');

	print(byName);
	print(byAge);
})();




