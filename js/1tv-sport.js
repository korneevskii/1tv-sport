function calendarInit() {
    let calendarContainer = document.getElementsByClassName("translations_main-block-calendar")[0]; 
    let oneHour = 1000 * 60 * 60; 
    let oneDay = oneHour * 24; 
    let currentDate = new Date();  
    let currentYear = currentDate.getFullYear();    
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
    let currentDayNumber = currentDate.getDay();   
    let firstDayDate = new Date(currentYear, currentMonth, 1);
    let nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
    let lastDay = Math.ceil((nextMonthDate.getTime() - firstDayDate.getTime() - oneHour)/oneDay);
    let firstDayNumber = firstDayDate.getDay();    
    let monthArray = new Array ("января","февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");    
    let dayArray = new Array ("вс","пн","вт","ср","чт","пт","сб");
    let dayArrayExtended = new Array ("воскресенье","понедельник","вторник","среду","четверг","пятницу","субботу");   
    let dayCounter = firstDayNumber;
    let carouselContainer = document.getElementsByClassName("translations_main-block-calendar-carousel")[0];    
    let carousel = carouselContainer.querySelector('.translations_main-block-calendar-carousel-items');     
    let carouselCode = '';
    let additionalClasses = '';
    let selectedDate = calendarContainer.querySelector('.selected-date');   
    let selectedDateCode = '';
    for (i=1; i <= lastDay; i++) {         
        if (dayCounter >= dayArray.length )  {
            dayCounter = 0;
        }  
        if ( (i != currentDay) && ( (dayCounter == 0) || (dayCounter == 6) ) ) {
            additionalClasses = ' red-item';
        }            
        else if ( (i == currentDay) && ( (dayCounter == 0) || (dayCounter == 6) ) ) {
            additionalClasses = ' current-red-item current-active';
        }
        else if ( (i == currentDay) ) {
            additionalClasses = ' current-item current-active';
        }
        else {
            additionalClasses = '';
        }
        carouselCode += '<div class="translations_main-block-calendar-carousel-item'+additionalClasses+'"><div class="calendar-date">'+i+'</div><div class="calendar-month">'+monthArray[currentMonth]+'</div><div class="calendar-day">'+dayArray[dayCounter]+'</div></div>';        
        dayCounter++;        
    }
    carouselCode += '<div class="translations_main-block-calendar-carousel-item last-hidden-item"></div>'; 
    carousel.innerHTML = carouselCode;
    selectedDateCode += 'сегодня, ' + dayArrayExtended[currentDayNumber] + ', '+ currentDay + ' ' + monthArray[currentMonth] + ' ' + currentYear +' года';
    selectedDate.innerHTML = selectedDateCode;
}

function carouselInit() {
    let position = 0;
    let width = 84;
    let carouselContainer = document.getElementsByClassName("translations_main-block-calendar-carousel")[0];    
    let carousel = carouselContainer.querySelector('.translations_main-block-calendar-carousel-items');
    let carouselItems = carouselContainer.querySelectorAll('.translations_main-block-calendar-carousel-item');  
    let carouselWidth = carousel.offsetWidth; 
    let count = Math.round(carouselWidth / width);
    let activeItem = carouselContainer.querySelector('.current-active');
    let idOfActiveItem = 0;
    carouselContainer.querySelector('.carousel-back').onclick = function() {
      position += width;
      position = Math.min(0,position)
      carousel.style.marginLeft = position + 'px';
    };
    carouselContainer.querySelector('.carousel-front').onclick = function() {
      position -= width;
      position = Math.max(-width * (carouselItems.length - count), position);
      carousel.style.marginLeft = position + 'px';
    };
    for (i=0; i < carouselItems.length; i++) {   
        if (carouselItems[i] == activeItem ) {
            idOfActiveItem = i;
        }
    }    
    position = -width * (idOfActiveItem - 1);
    position = Math.max(-width * (carouselItems.length - count), position);
    carousel.style.marginLeft = position + 'px';    
}

function dateInit() {
    let currentDate = new Date();  
    let currentYear = currentDate.getFullYear(); 
    let currentDay = currentDate.getDate();              
    let calendarContainer = document.getElementsByClassName("translations_main-block-calendar")[0]; 
    let selectedDate = calendarContainer.querySelector('.selected-date');   
    let selectedDateCode = '';
    let today = '';
    let date = this.querySelector('.calendar-date').textContent;
    let month = this.querySelector('.calendar-month').textContent;
    let day = this.querySelector('.calendar-day').textContent;
    switch (day) {
        case 'вс':
            day = 'воскресенье';
            break;
        case 'пн':
            day = 'понедельник';
            break;
        case 'вт':
            day = 'вторник';
            break;
        case 'ср':
            day = 'среду';
            break;
        case 'чт':
            day = 'четверг';
            break;
        case 'пт':
            day = 'пятницу';
            break;
        case 'сб':
            day = 'субботу';
            break;                                                            
    }
    if ( date == currentDay ) {
        today = 'сегодня, ';
    }
    selectedDateCode += today + day + ', '+ date + '&nbsp;' + month + ' ' + currentYear +' года';
    selectedDate.innerHTML = selectedDateCode;    
}

document.addEventListener("DOMContentLoaded", function() { 
    calendarInit();
    carouselInit();
    let clickCounter = 0;    
    document.querySelector('.broadcasting_more-button').onclick = function(event) {       
        clickCounter++;
        console.log(clickCounter);
        let cardsRow;
        let cardsContainer = document.querySelector('.broadcasting-cards');
        switch (clickCounter) {
            case 1:
                cardsRow = document.querySelectorAll('.broadcasting-cards_main-cards')[0];
                break;
            case 2:
                cardsRow = document.querySelectorAll('.broadcasting-cards_second-cards')[0];
                break;
            case 3:
                cardsRow = document.querySelectorAll('.broadcasting-cards_third-cards')[0];
                break;
            default:
                cardsRow = document.querySelectorAll('.broadcasting-cards_main-cards')[0];
          }
        cardsContainer.appendChild(cardsRow.cloneNode(true));
        event.preventDefault();
        if (clickCounter >= 3) {
            clickCounter = 0;
        } 
    };
    var elementsForClick = document.querySelectorAll('.translations_main-block-calendar-carousel-item');
    for (var i = 0; i < elementsForClick.length; i++) {
        elementsForClick[i].onclick = dateInit;
    }
});






