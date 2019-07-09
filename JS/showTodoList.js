function gotoProfile()
{
    window.location = '../html/profile.html';
}

function logout()
{
    sessionStorage.clear();
    window.location='../html/login.html';
}

function gotoHome()
{
    var home=sessionStorage.getItem("homeSession");
    window.location='../index.html';
//home.style.display="none";
}


// function display()
// {
//     let sessionId= sessionStorage.getItem("sessionkey");
//     let userArrayItem=JSON.parse(localStorage.getItem('user'));
//     let todoParticularUserArray=[];
//     let index;
//     var userTable=document.getElementById("tblBody");

//     for(index=0;index<userArrayItem.length;index++)

//     {
//         if((userArrayItem[index].emailAddr)==sessionId)
//         {
//             todoParticularUserArray=userArrayItem[index].todoItem;
            
            
//         }   
//     }

//     if(todoParticularUserArray.length===0)
//     {
//         let newEle=document.createElement("tr");
//         var node=document.createTextNode("no todos");
//         newEle.appendChild(node);
//         userTable.appendChild("tr"); 
//     }

// }

function getTOdoOfParticularUser()
{
    let sessionId= sessionStorage.getItem("sessionkey");
    let userArrayItem=JSON.parse(localStorage.getItem('user'));
    let todoParticularUserArray=[];
    let index;

    for(index=0;index<userArrayItem.length;index++)
    {
        if((userArrayItem[index].emailAddr)==sessionId)
        {
            todoParticularUserArray=userArrayItem[index].todoItem;
            break;
        }   
    }
    return todoParticularUserArray;
}

function getUserId()
{

    let sessionId= sessionStorage.getItem("sessionkey");
    let userArrayItem=JSON.parse(localStorage.getItem('user'));
    let index;
    let userId;

    for(index=0;index<userArrayItem.length;index++)
    {
        if((userArrayItem[index].emailAddr)==sessionId)
        {
            userId=index;
            break;
        }   
    }
    return userId;
}

function showItem()
{
    var userTable = document.getElementById("tblBody");
    let todoParticularUserArray=getTOdoOfParticularUser();
    var userid=getUserId();
    
    if(todoParticularUserArray.length===0)
    {
        let newEle=document.createElement("tr");
        var node=document.createTextNode("no todos");
        newEle.appendChild(node);
        //userTable.appendChild("ne"); 
    }

    else
    {
        for (var counter = 0; counter<todoParticularUserArray.length;counter++) 
        {
            var list=document.createElement("tr");
            var row= "<tr id=row-"+counter+"><td><input type=checkbox name=deleteTodo id=ch-"+todoParticularUserArray[counter].todoNo+"></input></td><td>"+ todoParticularUserArray[counter].todoTitle + "</td><td>" + todoParticularUserArray[counter].todoCategory + "</td><td>"+ todoParticularUserArray[counter].todoDue+"</td><td>" + todoParticularUserArray[counter].remainder+"</td><td>" + todoParticularUserArray[counter].public+"</td><td>" + todoParticularUserArray[counter].desc+"</td><td>"+todoParticularUserArray[counter].status+"</td><td> <input type=button name=editArray value=Edit id=button-"+todoParticularUserArray[counter].todoNo+" onclick=editTodo('"+todoParticularUserArray[counter].todoNo+"');></td></tr>";
            list.innerHTML=row;
            let tableB=document.getElementById("tblBody");
            tableB.appendChild(list);
        }
    }     
}

function changestatus()
{
    let userArrayItem=JSON.parse(localStorage.getItem('user'));
    let sessionId= sessionStorage.getItem("sessionkey");
    let deleteArr=document.getElementsByName("deleteTodo");
    let index;

    for(index=0;index<userArrayItem.length;index++)
    {
        if((userArrayItem[index].emailAddr)==sessionId)
        {
            var particulatIndex=index;
        }   
    }

    var checkedarray=[];
    
    for(let j=0;j<deleteArr.length;j++)
    {
        let todostring=deleteArr[j].id;
        var todoid=todostring.split("-");
        if(document.getElementById("ch-"+todoid[1]).checked == true)
        {
            checkedarray.push(todoid[1]);
        }
    }
    
    for(var counter=(checkedarray.length)-1;counter>=0;counter--)
    {
        for(let j=0;j<userArrayItem[particulatIndex].todoItem.length;j++)
        {
            if(userArrayItem[particulatIndex].todoItem[j].todoNo == checkedarray[counter])
            {
              userArrayItem[particulatIndex].todoItem[j].status="Done";
            }
        }
    }
    
    var stringifyUser=JSON.stringify(userArrayItem);
    localStorage.setItem('user',stringifyUser);
    window.location.reload();
}

function deleteTodo()
{
    let sessionId= sessionStorage.getItem("sessionkey");
    let userArrayItem=JSON.parse(localStorage.getItem('user'));
    let deleteArr=document.getElementsByName("deleteTodo");
    let index;
    var checkedarray=[];

    for(index=0;index<userArrayItem.length;index++)
    {
        if((userArrayItem[index].emailAddr)==sessionId)
        {
            var particulatIndex=index;
        }   
    }

    for(let j=0;j<deleteArr.length;j++)
    {
        let todostring=deleteArr[j].id;
        var todoid=todostring.split("-");
        if(document.getElementById("ch-"+todoid[1]).checked == true)
        {
          checkedarray.push(todoid[1]);
            
        }
    }
    
    for(var counter=(checkedarray.length)-1;counter>=0;counter--)
    {
        for(let j=0;j<userArrayItem[particulatIndex].todoItem.length;j++)
        {
            if(userArrayItem[particulatIndex].todoItem[j].todoNo == checkedarray[counter])
            {
                userArrayItem[particulatIndex].todoItem.splice(j,1);
            }
        }
    }

    var stringifyUser=JSON.stringify(userArrayItem);
    localStorage.setItem('user',stringifyUser);
    window.location.reload();
}

function filterByCat()
{
    let sessionId= sessionStorage.getItem("sessionkey");
    let userArrayItem=JSON.parse(localStorage.getItem('user'));
    let todoParticularUserArray=[];
    let index;
    let particularIndex;
    var tbody=document.getElementById("tblBody");

    for(index=0;index<userArrayItem.length;index++)
    {
        if((userArrayItem[index].emailAddr)==sessionId)
        {
            todoParticularUserArray=userArrayItem[index].todoItem;
            particularIndex=index;
            break;
        }   
    }
    
    if(document.getElementById("listForCategory").value==="bycategory")
    {
        if(todoParticularUserArray.length===0)
        {
            let newEle=document.createElement("tr");
            var node=document.createTextNode("no todos");
            newEle.appendChild(node);
            tbody.appendChild("tr"); 
        }
        else
        {
            let a=document.getElementById("tblBody");
            let deleteChild=a.lastElementChild;
            
            while(deleteChild)
            {
                a.removeChild(deleteChild);
                deleteChild=a.lastElementChild;
            }   
            
            for (var counter = 0; counter<todoParticularUserArray.length;counter++) 
            {
                var list=document.createElement("tr");
                var row= "<tr id=row-"+counter+"><td><input type=checkbox name=deleteTodo id=ch-"+todoParticularUserArray[counter].todoNo+"></input></td><td>"+ todoParticularUserArray[counter].todoTitle + "</td><td>" + todoParticularUserArray[counter].todoCategory + "</td><td>"+ todoParticularUserArray[counter].todoDue+"</td><td>" + todoParticularUserArray[counter].remainder+"</td><td>" + todoParticularUserArray[counter].public+"</td><td>" + todoParticularUserArray[counter].desc+"</td><td>"+todoParticularUserArray[counter].status+"</td><td> <input type=button name=editArray value=Edit id=button-"+todoParticularUserArray[counter].todoNo+" onclick=editTodo("+filteredarray[counter].todoNo+");></td></tr>";
                list.innerHTML=row;
                let tabBody=document.getElementById("tblBody");
                tabBody.appendChild(list);
            }
        }     
    }

    if(document.getElementById("listForCategory").value==="Social")
    {
        var filteredarray=todoParticularUserArray.filter(function(category1){
        return(category1.todoCategory=== "Social")})
        
        let a=document.getElementById("tblBody");
        let deleteChild=a.lastElementChild;
        
        while(deleteChild)
        {
            a.removeChild(deleteChild);
            deleteChild=a.lastElementChild;
        }      
                
        for (var counter = 0; counter<filteredarray.length;counter++) 
        {
            var list=document.createElement("tr");
            var row= "<tr id=row-"+counter+"><td><input type=checkbox name=deleteTodo id=ch-"+filteredarray[counter].todoNo+"></input></td><td>"+ filteredarray[counter].todoTitle + "</td><td>" + filteredarray[counter].todoCategory + "</td><td>"+filteredarray[counter].todoDue+"</td><td>" + filteredarray[counter].remainder+"</td><td>" +filteredarray[counter].public+"</td><td>" + filteredarray[counter].desc+"</td><td><input type=checkbox name=isDoneTodo id=check-"+counter+" onclick=changestatus();></input></td><td>"+filteredarray[counter].status+"</td><td> <input type=button value=Edit name=editArray id=button-"+filteredarray[counter].todoNo+" onclick=editTodo("+filteredarray[counter].todoNo+");></td></tr>";
            list.innerHTML=row;
            let tblBody=document.getElementById("tblBody");
            tblBody.appendChild(list);
        }
    }
    if(document.getElementById("listForCategory").value==="Office")
    {
        var filteredarray=todoParticularUserArray.filter(function(category1){
        return(category1.todoCategory=== "Office")})
        
        let a=document.getElementById("tblBody");
        let deleteChild=a.lastElementChild;
        
        while(deleteChild)
        {
            a.removeChild(deleteChild);
            deleteChild=a.lastElementChild;
        }      
        
        for (var counter = 0; counter<filteredarray.length;counter++) 
        {
            var list=document.createElement("tr");
            var row= "<tr id=row-"+counter+"><td><input type=checkbox name=deleteTodo id=ch-"+filteredarray[counter].todoNo+"></input></td><td>"+ filteredarray[counter].todoTitle + "</td><td>" + filteredarray[counter].todoCategory + "</td><td>"+filteredarray[counter].todoDue+"</td><td>" + filteredarray[counter].remainder+"</td><td>" +filteredarray[counter].public+"</td><td>" + filteredarray[counter].desc+"</td><td>"+filteredarray[counter].status+"</td><td> <input type=button value=Edit name=editArray id=button-"+filteredarray[counter].todoNo+" onclick=editTodo("+filteredarray[counter].todoNo+");></td></tr>";
            list.innerHTML=row;
            let tableHead=document.getElementById("tblBody");
            tableHead.appendChild(list);
        
        }
    }
    
    if(document.getElementById("listForCategory").value==="Personal")
    {
        var filteredarray=todoParticularUserArray.filter(function(category1){
        return(category1.todoCategory=== "Personal")})
        
        let a=document.getElementById("tblBody");
        let deleteChild=a.lastElementChild;
        
        while(deleteChild)
        {
            a.removeChild(deleteChild);
            deleteChild=a.lastElementChild;
        }      
                
        for (var counter = 0; counter<filteredarray.length;counter++) 
        {
            var list=document.createElement("tr");
            var row= "<tr id=row-"+counter+"><td><input type=checkbox name=deleteTodo id=ch-"+filteredarray[counter].todoNo+"></input></td><td>"+ filteredarray[counter].todoTitle + "</td><td>" + filteredarray[counter].todoCategory + "</td><td>"+filteredarray[counter].todoDue+"</td><td>" + filteredarray[counter].remainder+"</td><td>" +filteredarray[counter].public+"</td><td>" + filteredarray[counter].desc+"</td><td>"+filteredarray[counter].status+"</td><td> <input type=button value=Edit  name=editArray id=button-"+filteredarray[counter].todoNo+" onclick=editTodo("+filteredarray[counter].todoNo+");></td></tr>";
            list.innerHTML=row;
            let tableHead=document.getElementById("tblBody");
            tableHead.appendChild(list);
        }
    }
}

function filterByName()
{
    let getTitle=document.getElementById("searchBytitle").value;
    var particularTodo=getTOdoOfParticularUser();
    var titleArray = [];
    let a=document.getElementById("tblBody");
    let deleteChild=a.lastElementChild;
    
    if(particularTodo.length===0)
    {
        let newEle=document.createElement("tr");
        var node=document.createTextNode("no todos");
        newEle.appendChild(node);
        userTable.appendChild("tr"); 
    }
    
    for(var counter=0;counter<particularTodo.length;counter++)
    {
        if(particularTodo[counter].todoTitle==getTitle)
        {
            titleArray.push(particularTodo[counter]);
        }
    }

    while(deleteChild)
    {
        a.removeChild(deleteChild);
        deleteChild=a.lastElementChild;
    }      
                
    for (var counter = 0; counter<titleArray.length;counter++) 
    {
        var list=document.createElement("tr");
        var row= "<tr id=row-"+counter+"><td><input type=checkbox name=deleteTodo id=ch-"+titleArray[counter].todoNo+"></input></td><td>"+ titleArray[counter].todoTitle + "</td><td>" + titleArray[counter].todoCategory + "</td><td>"+titleArray[counter].todoDue+"</td><td>" + titleArray[counter].remainder+"</td><td>" +titleArray[counter].public+"</td><td>" + titleArray[counter].desc+"</td><td>"+titleArray[counter].status+"</td><td> <input type=button name=editArray value=Edit id=button-"+titleArray[counter].todoNo+" onclick=editTodo("+filteredarray[counter].todoNo+");></td></tr>";
        list.innerHTML=row;
        let tableHead=document.getElementById("tblBody");
        tableHead.appendChild(list);
    }
}

function filterByDate()
{
    var startDateTodo= new Date(document.getElementById("startDate").value);
    var endDateTodo=new Date(document.getElementById("endDate").value);
    var partularArray=getTOdoOfParticularUser();
    var userTable=document.getElementById("tblBody");
    let todoParticularUserArray=getTOdoOfParticularUser();

    if(todoParticularUserArray.length===0)
    {
        let newEle=document.createElement("tr");
        var node=document.createTextNode("no todos");
        newEle.appendChild(node);
        userTable.appendChild(newEle); 
    }
    else
    {
        var filteredarray=partularArray.filter(function(todoitem){
        return( new Date(todoitem.todoDue).getTime()>=startDateTodo && new Date(todoitem.todoDue).getTime()<=endDateTodo)})
    
        let a=document.getElementById("tblBody");
        let deleteChild=a.lastElementChild;
        
        while(deleteChild)
        {
            a.removeChild(deleteChild);
            deleteChild=a.lastElementChild;
        }  
        
        for (var counter = 0; counter<filteredarray.length;counter++) 
        {
            var list=document.createElement("tr");
            var row= "<tr id=row-"+counter+"><td><input type=checkbox name=deleteTodo id=ch-"+filteredarray[counter].todoNo+"></input></td><td>"+ filteredarray[counter].todoTitle + "</td><td>" + filteredarray[counter].todoCategory + "</td><td>"+filteredarray[counter].todoDue+"</td><td>" + filteredarray[counter].remainder+"</td><td>" +filteredarray[counter].public+"</td><td>" + filteredarray[counter].desc+"</td><td>"+filteredarray[counter].status+"</td><td> <input type=button value=Edit name=editArray id=button-"+filteredarray[counter].todoNo+" onclick=editTodo("+filteredarray[counter].todoNo+");></td></tr>";
            list.innerHTML=row;
            let tableHead=document.getElementById("tblBody");
            tableHead.appendChild(list);
        }  
    }
}
function editTodo(todoId)
{
    sessionStorage.setItem("todoid",todoId);
    
 window.location = '../html/editTodo.html';
}
       
  

function goToAddPage()
{
    window.location = '../html/todo.html';
}
