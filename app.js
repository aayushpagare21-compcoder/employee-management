class Employee {

    constructor(empId, empName, empDept, empSalary, empAge) {
        this.empId = empId;
        this.empName = empName;
        this.empDept = empDept;
        this.empSalary = empSalary;
        this.empAge = empAge;
    }
}

class Utility {

    add(employee) {

        let empArray = localStorage.getItem('empArray');

        if (empArray == null) {
            empArray = [];
        }
        else {
            empArray = JSON.parse(empArray);
        }

        empArray.push(employee);

        localStorage.setItem('empArray', JSON.stringify(empArray));

        show();

    }
        
    show() {

        let empArray = localStorage.getItem('empArray');

        if (empArray == null) {
            empArray = [];
        }
        else {
            empArray = JSON.parse(empArray);
        }

        let tableBody = document.getElementById('table-body');

        let uiString = ``;

        empArray.forEach(function (element) {

            uiString += ` 

            <tr> 
                <td>${element.empId} </td>
                <td>${element.empName}</td>
                <td>${element.empDept}</td>
                <td>${element.empSalary}</td>
                <td>${element.empAge}</td>
            </tr>`;
        });

        tableBody.innerHTML = uiString;
    }

    clear() {
        let form = document.getElementById('library-form');
        form.reset();
    }

    validate(employee) {
        if (employee.empName.length < 2 || employee.empId == null) {
            return false;
        }
        return true;
    }

    showMessage(type, message, message2) {

        let msg = document.getElementById('msg');
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${message}<strong> ${message2}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

        setTimeout(function () {
            msg.innerHTML = ``;
        }, 2000);
    }
}

let addBtn = document.getElementById('addBtn');

let u = new Utility();
u.show();

addBtn.addEventListener('click', function (e) {

    let empId = document.getElementById('eid').value;
    let empName = document.getElementById('ename').value;
    let empAge = document.getElementById('eage').value;
    let empSalary = document.getElementById('esal').value;

    let technical = document.getElementById('tech');
    let management = document.getElementById('manage');
    let helper = document.getElementById('help');

    let empDept;

    if (technical.checked) {
        empDept = technical.value;
    }

    else if (management.checked) {
        empDept = management.value
    }

    else if (helper.checked) {
        empDept = helper.value;
    }

    let employee = new Employee(empId, empName, empDept, empSalary, empAge);

    if (u.validate(employee)) {
        u.add(employee);
        u.clear();
        u.showMessage('success', ' SUCCESS', ' FIELD ADDED SUCCESSFULLY');
    } else {
        u.showMessage('danger', ' ERROR', ' CHECK YOUR INPUT');
    }

    e.preventDefault();
});

let deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', function () {

    let deleteVal = document.getElementById('delete-input').value;

    let empArray = localStorage.getItem('empArray');

    if (empArray == null) {
        u.showMessage('danger', 'error', 'Employee Not Found');
    }
    else {
        empArray = JSON.parse(empArray);
    }

    let idx = null;
    empArray.forEach(function (element, index) {

        if (element.empId == deleteVal) {
            idx = index;
        }
    });

    console.log(idx);

    if (idx != null) {
        empArray.splice(idx, 1);
        u.showMessage('success', 'Success', 'Employee Deleted');
    } else {
        u.showMessage('danger', 'error', 'Employee Not Found');
    }

    localStorage.setItem('empArray', JSON.stringify(empArray));
    u.show();
});

let searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', function () {

    let searchVal = document.getElementById('search-value').value;

    let empArray = localStorage.getItem('empArray');

    if (empArray == null) {
        u.showMessage('danger', 'error', 'Employee Not Found');
    }
    else {
        empArray = JSON.parse(empArray);
    }

    let element = null;
    empArray.forEach(function (e) {

        if (e.empId == searchVal) {
            element = e;
        }
    });

    let searchRow = document.getElementById('search-row'); 
    console.log(searchRow);
    
    let uiString = ``; 

    uiString += `<tr> 
                <td>${element.empId} </td>
                <td>${element.empName}</td>
                <td>${element.empDept}</td>
                <td>${element.empSalary}</td>
                <td>${element.empAge}</td> 
                </tr>
                `; 
        searchRow.innerHTML = uiString; 
 });