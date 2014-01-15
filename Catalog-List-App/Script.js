// Globals
var maxRows = 10;
var studentList = new Array();
var currentPage = 0;

// Initialize the array of students
function CreateStudents(){
    studentList.push(new Student("Pesho", "Petrov", 188, new GradeBook(3, 3,4,5)));
    studentList.push(new Student("Ivan", "Ivanov", 676, new GradeBook(5, 3,4,5)));
    studentList.push(new Student("Dragan", "Moasiujo", 677, new GradeBook(6, 3,4,5)));
    studentList.push(new Student("Ivan", "Kostov", 98, new GradeBook(4, 3,4,5)));
    studentList.push(new Student("Pesho", "Petrov", 188, new GradeBook(3, 3,4,5)));
    studentList.push(new Student("Ivan", "Ivanov", 676, new GradeBook(5, 3,4,5)));
    studentList.push(new Student("Dragan", "Moasiujo", 677, new GradeBook(6, 3,4,5)));
    studentList.push(new Student("Ivan", "Kostov", 98, new GradeBook(4, 3,4,5)));
    studentList.push(new Student("Pesho", "Petrov", 188, new GradeBook(3, 3,4,5)));
    studentList.push(new Student("Ivan", "Ivanov", 676, new GradeBook(5, 3,4,5)));
    
    studentList.push(new Student("Dragan", "Moasiujo", 677, new GradeBook(6, 3,4,5)));
    studentList.push(new Student("Ivan", "Kostov", 98, new GradeBook(4, 3,4,5)));
    studentList.push(new Student("Pesho", "Petrov", 188, new GradeBook(3, 3,4,5)));
    studentList.push(new Student("Ivan", "Ivanov", 676, new GradeBook(5, 3,4,5)));
    studentList.push(new Student("Dragan", "Moasiujo", 677, new GradeBook(6, 3,4,5)));
    studentList.push(new Student("Ivan", "Kostov", 98, new GradeBook(4, 3,4,5)));
    studentList.push(new Student("Dragan", "Moasiujo", 677, new GradeBook(6, 3,4,5)));
    studentList.push(new Student("Ivan", "Kostov", 98, new GradeBook(4, 3,4,5)));
    studentList.push(new Student("Pesho", "Petrov", 188, new GradeBook(3, 3,4,5)));
    studentList.push(new Student("Ivan", "Ivanov", 676, new GradeBook(5, 3,4,5)));
    
    studentList.push(new Student("Dragan", "Moasiujo", 677, new GradeBook(6, 3,4,5)));
    studentList.push(new Student("Ivan", "Kostov", 98, new GradeBook(4, 3,4,5)));
    studentList.push(new Student("Ivan", "Ivanov", 676, new GradeBook(5, 3,4,5)));
    studentList.push(new Student("Dragan", "Moasiujo", 677, new GradeBook(6, 3,4,5)));
    studentList.push(new Student("Ivan", "Kostov", 98, new GradeBook(4, 3,4,5)));
    
    // Initialize the first page
    DisplayPage(currentPage);
}

// Display some page global function
function DisplayPage(pageNo){
    if (pageNo < 0) {
        currentPage = 0;
    };
    
    var end = Math.ceil(studentList.length / maxRows) - 1;  // If reach the last page
    if (pageNo >= end) {
        currentPage = end;
    };    
    
    for (var i=currentPage * maxRows, j = 0; i < studentList.length && j < maxRows; i++, j++) {
      studentList[i].Show(i + 1);
    };
}

// Hide some page before display the next or prevous global function
function Hide (pageNo) {
    if (pageNo < 0) {
        currentPage = 0;
    };
    
    var end = Math.ceil(studentList.length / maxRows) - 1;  // If reach the last page
    if (pageNo >= end) {
        currentPage = end;
    };
    
    for (var i=currentPage * maxRows, j = 0; i < studentList.length && j < maxRows; i++, j++) {
       var row =  document.getElementById(i + 1);
       row.parentNode.removeChild(row);
    };
     
     return false;
};


// GradeBook Object
function GradeBook(english, math, biology, phisics){
    this.english = english;
    this.math = math;
    this.biology = biology;
    this.phisics = phisics;
    
    this.Total =  function(){
        return (english + math + biology + phisics) / 4;
    };
}


// Student Object
function Student(fname, lname, faculty, gradeBookObject){
    this.firstName = fname;
    this.lastName = lname;
    this.facultyNumber = faculty;
    this.gradeBook = gradeBookObject;
    
    this.Show = function(order){
        var location = document.getElementById('myTable');
        
        var tableRow = document.createElement('tr');
        tableRow.id = order;
        
        // Set a row's cells
        var orderNo = tableRow.insertCell(0),
            fnameData = tableRow.insertCell(1),
            lnameData = tableRow.insertCell(2),
            facultyData = tableRow.insertCell(3),
            engl = tableRow.insertCell(4),
            math = tableRow.insertCell(5),
            bio = tableRow.insertCell(6),
            phisics = tableRow.insertCell(7),
            total = tableRow.insertCell(8);
        
        // Set row's content    
        orderNo.innerHTML = order;
        fnameData.innerHTML = this.firstName;
        lnameData.innerHTML = this.lastName;
        facultyData.innerHTML = this.facultyNumber;
        engl.innerHTML = this.gradeBook.english;
        math.innerHTML = this.gradeBook.math;
        bio.innerHTML = this.gradeBook.biology;
        phisics.innerHTML = this.gradeBook.phisics;
        total.innerHTML = this.gradeBook.Total();
        
        // Append the row 
        location.appendChild(tableRow);  
    };
    
}

















