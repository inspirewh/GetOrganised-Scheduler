
// when I visit this page
//I should see a clock (time) in the header
window.setInterval(function () {
    $('#clock').html(moment().format('ddd MM/DD/YY H:mm:ss a'))
}, 1000);

// i should see 9 am - 5 pm time block (repeating - to create 9 additional rows therefore a loop function [starts at 9 -> 9 = 6 = 18])


//create variable that targets the container

//create function (createTimeBlock)
function createTimeBlock(hour) {
    {/*<div class="row">
    <div class="time.col col -2"> 9AM</div>
    <div class="text.col col -8"> wwww</div>
    <textarea name="" id="" cols="30" rows="3"></textarea>
    <div class="button.col col -8">
    <button class="btn btn-primary">Save</button>
    </div>
    </div>*/}

    //create row
    const row = $('<div>');
    const currentHour = Number(moment().format("H"));
    
    //if time block is in the past give it a 'past' class 
    //past =  hour < current hour
    const isPast = hour < currentHour;

    //if time block is in the future give it a 'future' class 
    //future = hour > current hour
    const isFuture = hour > currentHour;
    
    //if time block is in the present give it a 'present' class 
    //present = current hour === hour
    const isPresent = hour === currentHour;
    
    let rowClass = 'row';
    
    
    if(isPast){
        rowClass = rowClass + ' past';
        
    }
    
    if (isFuture) {
        rowClass = rowClass + ' future';
        
    }
    
    if (isPresent) {
        
        rowClass = rowClass + ' present';
        
    }
    
    
    
    row.attr('class', rowClass);
    
    const timeCol = $('<div>');
    timeCol.attr('class', 'timeCol col-2');
//time col should contain time which is variable "hour"
    timeCol.text(hour + ":00");


    const textAreaCol = $('<div>');
    textAreaCol.attr('class', 'textAreacCol col-8');

    const textArea = $('<textArea>');
    textArea.attr('class', 'textArea rows="3"')
    textAreaCol.append(textArea);

    //with existing data input from local storage - grab items from local storage 
    //val() method is primarily used to get the values of form elements such as input , select and textarea
    const existingNotes = localStorage.getItem(hour)
    textArea.val(existingNotes);



    const buttonCol = $('<div>');
    buttonCol.attr('class', 'button-Col col-2');

    const saveButton = $('<button>');
    saveButton.attr('class', 'btn btn-primary save-button');
    saveButton.text('Save');
    buttonCol.append(saveButton);
    
//put the columns into the row
row.append(timeCol, textAreaCol, buttonCol)
return row;
    
}

const timeBlockContainer = $(".container");

for (let hour = 9; hour < 18; hour++) {
    //variable for the function that adds 9 rows
    const timeBlock = createTimeBlock(hour);
    
    //function that appends container and runs the timblock function adding 9 rows 
    timeBlockContainer.append(timeBlock);
}



$(document).on('click', '.save-button', function(event){
    // when the user clicks on the save button of a particular timeblock
    const buttonClicked = $(event.target);

    const textArea = buttonClicked.parent().prev().children();
    const timeCol = buttonClicked.parent().prev().prev();
    const time = timeCol.text();

   // console.log(textArea);
   // console.log(time);

  //removing the last 3 digits of the hour to use as key in lcal storage)
    const hour = time.slice(0,-3);
    //console.log(hour);

    // grab the user input
    const userInput = textArea.val();
    //console.log(userInput);

    //save the local storage accept value (userInput) and the key which represents hour of timeblock
    localStorage.setItem(hour, userInput);
})