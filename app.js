
let income;
let expenses = [];
let budgetValue=[];
const incomelist = document.getElementById('income-list');
const expenselist = document.getElementById('expense-list');
document.getElementById('avbud').innerHTML = 0;
document.getElementById('expense-list').addEventListener('click', removeExpense);
document.getElementById('click').addEventListener('click', getvalues);

clearSession();
getMonth();
// const renderList = ()=>{
//    return income.map((item )=>{
//       ` <li> ${item} </li>`
//    })
// }

function getMonth() {
   var month = new Array();
   month[0] = "January";
   month[1] = "February";
   month[2] = "March";
   month[3] = "April";
   month[4] = "May";
   month[5] = "June";
   month[6] = "July";
   month[7] = "August";
   month[8] = "September";
   month[9] = "October";
   month[10] = "November";
   month[11] = "December";
   var d = new Date();
   var n = month[d.getMonth()];
   var k = d.getFullYear();
   document.getElementById("date").innerHTML = n +'\xa0\xa0'+ k;
}

function clearSession() {
   sessionStorage.clear()
}

function getvalues() {

   const selectedOption = document.getElementById('select').value;
   if (selectedOption == "0") {
      alert("Please select + to enter income an select - for expenses");
   }
   else if (selectedOption == "1") {
      let description = document.getElementById('descrip').value;
      let value = document.getElementById('val').value;
      if (description == '' || value == '') {
         alert('insert values in field');
      }
      else {
         budgetValue.push({ type:'income',description: description, value: value });
         incomelist.innerHTML="";
          budgetValue.forEach(function (bv) {
              if(bv.type=='income'){
               let incomeLists = `
                 <div class='item'>
                     <div class="leftIncome">
                          <span>${bv.description}</span>
                     </div>
                     <div class="rightIncome">
                          <span class='Ivals'>
                          ${"+"+bv.value}
                          </span> 
                     </div>
                 </div>`;
                 incomelist.innerHTML+=incomeLists;
               }
               });
         document.getElementById('descrip').value = '';
         document.getElementById('val').value = '';
         updateIncomeBudget(value);
         a = sessionStorage.getItem('ExpenseBudget');
         if (a!=null) { 
            getValDescription();
         }
      }
   }
   else if (selectedOption == "2") {
      
      document.getElementById("rmBtn").style.visibility = 'visible';
      let description = document.getElementById('descrip').value;
      let value = document.getElementById('val').value;

      if (description == '' || value == '') {

         alert('insert values in field');
      }
      else {           
         budgetValue.push({ type:'expense',description: description, value: value });
         expenselist.innerHTML="";
          budgetValue.forEach(function (bv) {
            if(bv.type=='expense'){
            const f = parseInt(bv.value);
            g = sessionStorage.getItem('IncomeBudget');
            const h = parseInt(g);  
            if(isNaN(h)){
                calculatepercent = 0;           
            }else{
               if(g>f){
                  aa=(f / h) * 100;
                  kk=aa.toFixed(2)
                  calculatepercent = kk
               }else{
                  ca= (f / h) * 100;
                  ka=ca.toFixed(2);
                  calculatepercent='-'+ka;
               }          
            }
            let expenseList = `
               <div class='item'>
                     <div class='leftExpense'>                       
                        <span> ${bv.description}</span>
                     </div>
                     <div class='rightExpense'>     
                                        
                        <span class='Evals'> ${"-"+bv.value} </span>
                        <span class="btnclass">
                          ${calculatepercent + "%" + "\xa0\xa0"}
                        </span>
                         
                        <a class="delete-item secondary-content" onclick=removeExpenses(${bv.value})>
                        <i class="remove icon"></i>
                        </a>
                     </div>
               </div>`;
         expenselist.innerHTML+= expenseList;
         document.getElementById('descrip').value = '';
         document.getElementById('val').value = '';
            }
      });
         updateExpenseBudget(value);
      }
   }
}

function getValDescription() {

   

   document.getElementById('expense-list').innerHTML = "";
   budgetValue.forEach(function (post) {
      if(post.type=='expense'){
         const f = parseInt(post.value);
         g = sessionStorage.getItem('IncomeBudget');
         const h = parseInt(g);
         if(isNaN(h)){
            calculatepercent = 0;
        }else{
         if(g>f){
            aa=(f / h) * 100;
            kk=aa.toFixed(2)
            calculatepercent = kk
         }else{
            ca= (f / h) * 100;
            ka=ca.toFixed(2);
            calculatepercent='-'+ka;
         }    
        }
         let expenseList = `
               <div class='item'>
                     <div class='leftExpense'>                       
                        <span> ${post.description}</span>
                     </div>
                     <div class='rightExpense'>                        
                        <span class='vals'> ${"-"+post.value} </span>
                        <span class="btnclass">
                          ${calculatepercent + "%" + "\xa0\xa0"}
                        </span>
                        <a class="delete-item secondary-content" onclick=removeExpenses(${post.value})>
                        <i class="remove icon"></i>
                        </a>
                     </div>
               </div>`;
         expenselist.innerHTML += expenseList;
         document.getElementById('descrip').value = '';
         document.getElementById('val').value = '';
         }
        // updateExpenseBudget(post.value);
   });
}

function removeExpenses(value) {
   c = sessionStorage.getItem('IncomeBudget');
   const getIncome = parseInt(c);
   d = sessionStorage.getItem('ExpenseBudget');
   const getExpense = parseInt(d);
   const updatedExpenses = getExpense - value;
   sessionStorage.setItem("ExpenseBudget", updatedExpenses);
   h = sessionStorage.getItem('ExpenseBudget');
   if(isNaN(getIncome)){
      calculatepercent = 0;
   }else{
      calculatepercent = (h / getIncome) * 100;
   }
   document.getElementById('expVal').innerHTML =  updatedExpenses+'\xa0\xa0';
   document.getElementById('rmBtn').innerHTML = calculatepercent.toFixed(2) + "%";

   const updBudget = getIncome - updatedExpenses;

   document.getElementById('avbud').innerHTML = updBudget;
}

function removeExpense(e) {
   if (e.target.parentElement.classList.contains('delete-item')) {
      if (confirm('are you sure?')) {
         e.target.parentElement.parentElement.parentElement.remove();
      }
   }
}

function updateExpenseBudget(value) {
   const val = parseInt(value);
   const newExpenseBudget = val;
   if (sessionStorage.getItem('ExpenseBudget') === null) {
      sessionStorage.setItem("ExpenseBudget", newExpenseBudget);
      f = sessionStorage.getItem('IncomeBudget');
      h = sessionStorage.getItem('ExpenseBudget');
      if(!f){
         calculatepercent = 0;         
     }else{
      calculatepercent = (h / f) * 100;   
     }
      document.getElementById('expVal').innerHTML =newExpenseBudget+'\xa0\xa0';
      document.getElementById('rmBtn').innerHTML =calculatepercent.toFixed(2) + "%";
   }
   else {
      tasks = sessionStorage.getItem('ExpenseBudget');
      const sessionvalue = parseInt(tasks);
      updatedExpenseBudget = newExpenseBudget + sessionvalue;
      sessionStorage.setItem("ExpenseBudget", updatedExpenseBudget);
      f = sessionStorage.getItem('IncomeBudget');
      h = sessionStorage.getItem('ExpenseBudget');
      if(!f){
         calculatepercent = 0;         
     }else{
      calculatepercent = (h / f) * 100;      
     }
      document.getElementById('expVal').innerHTML =updatedExpenseBudget+'\xa0\xa0';
      document.getElementById('rmBtn').innerHTML =calculatepercent.toFixed(2) + "%";
   }
   availableBudget();
}

function updateIncomeBudget(value) {
   const val = parseInt(value);
   const newIncomeBudget = val;
   if (sessionStorage.getItem('IncomeBudget') === null) {
      sessionStorage.setItem("IncomeBudget", newIncomeBudget);
      document.getElementById('incVal').innerHTML =newIncomeBudget;
      f = sessionStorage.getItem('IncomeBudget');
      h = sessionStorage.getItem('ExpenseBudget');
      if(!h){
       
         
      }
      else{

         calculatepercent = (h / f) * 100;
         document.getElementById('expVal').innerHTML =h+'\xa0\xa0';
         document.getElementById('rmBtn').innerHTML =calculatepercent.toFixed(2) + "%";
      }
   }
   else {
      tasks = sessionStorage.getItem('IncomeBudget');
      const sessionvalue = parseInt(tasks);
      updatedIncomeBudget = newIncomeBudget + sessionvalue;
      sessionStorage.setItem("IncomeBudget", updatedIncomeBudget);
      f = sessionStorage.getItem('IncomeBudget');
      h = sessionStorage.getItem('ExpenseBudget');
      
      if(!h){
         calculatepercent=0;
     }
     else{
      calculatepercent = (h / f) * 100;
     }
      
      document.getElementById('rmBtn').innerHTML =calculatepercent.toFixed(2) + "%";
      document.getElementById('incVal').innerHTML =updatedIncomeBudget;
   }
   availableBudget();
}

function availableBudget() {
   a = sessionStorage.getItem('IncomeBudget');
   b = sessionStorage.getItem('ExpenseBudget');
   const incomes = parseInt(a === null ? 0 : a);
   const expense = parseInt(b === null ? 0 : b);
   if (incomes == ' ' && expense != ' ') {
      document.getElementById('avbud').innerHTML = "-" + ' ' + expense;
   }
   if (incomes != ' ' && expense == ' ') {
      document.getElementById('avbud').innerHTML = "+" + ' ' + incomes;
   }
   if (incomes != ' ' && expense != ' ') {
      if (incomes > expense) {
         const calculate = incomes - expense;
         console.log("income is grater " + calculate);
         document.getElementById('avbud').innerHTML = "+" + calculate;
      }
      else {
         const calculate = incomes - expense;
         console.log("expense is greater" + calculate);
         document.getElementById('avbud').innerHTML = calculate;
      }
   }
}













