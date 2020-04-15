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
    //формируем календарь, добавляем классы для визуализации в зависимости от дня недели и текущей даты
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
    let activeItem = carouselContainer.querySelector('.current-active'); //текущая дата в календаре
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
    //вычисляем необходимое количество элементов и сдвигаем календарь, чтобы текущая дата всегда попадала в зону видимости
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
    let currentMonth = currentDate.getMonth();    
    let currentDay = currentDate.getDate();              
    let calendarContainer = document.getElementsByClassName("translations_main-block-calendar")[0]; 
    let calendarContainerContent = document.getElementsByClassName("translations_main-block-calendar-content")[0];     
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
    //если выбранная дата совпадает с текущей, добавляем слово "сегодня"
    if ( date == currentDay ) {
        today = 'сегодня, ';
    }
    //формируем строку заголовка виджета
    selectedDateCode += today + day + ', '+ date + '&nbsp;' + month + ' ' + currentYear +' года';
    selectedDate.innerHTML = selectedDateCode;    
    
    //убираем пункты расписания мероприятий
    let calendarItems = document.querySelectorAll('.translations_main-block-calendar-item');
    for (var i = 0; i < calendarItems.length; i++ ) {           
        calendarItems[i].parentNode.removeChild(calendarItems[i]);
    }

    //собираем дату выбранного элемента
    let selectedDateString = date + "." + (currentMonth+1) + "." + currentYear;

//закомментированные строки относятся к AJAX-запросу
//   let jsonPath = "./js/timetable.json";   
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', jsonPath, true);

//   xhr.onreadystatechange = function () {
//        if(xhr.readyState !== 4){ return;}
//        if(xhr.status !== 200){
//            console.log('Error', xhr.status, xhr.statusText);
//        } else {
//            let result = JSON.parse(xhr.responseText);

            //AJAX запрос заменен на массив timetable из файла timetable.js
            let result = timetable;        

            //сравниваем даты с массивом и ищем выбранную
            for (var i = 0; i < result.length; i++ ) {  
                if (selectedDateString == result[i].date) {

                    let requiredSubject = result[i].subject;    
                    let requiredSubjectCode = '';
    
                    //получаем, разбираем и выводим все доступные для данной даты мероприятия
                    for (var j = 0; j < requiredSubject.length; j++ ) { 
                        
                        let time = requiredSubject[j].time; 
                        let title = requiredSubject[j].title;
                        let href = requiredSubject[j].href;                        
                        let text = requiredSubject[j].text;  
                        let commentators = requiredSubject[j].commentators;  
                        let commentatorsCode = '';                                                                                                                          
                        let medals = requiredSubject[j].medals; 
                        let rf = requiredSubject[j].rf;                         
                        let tv = requiredSubject[j].tv; 
                        let iconsCode = '';  
                        let onAirClass = ''; 
                        let onAirCode = '';    
                        let startTime = time.split(':');                                               

                        //делаем иммитацию проверки на эфир, если выбран текущий день и текущее время попадает в интервал +2 часа от начала мероприятия, то добавляем кнопки "в эфире"
                        if ( ( date == currentDay ) && ( ( (currentDate.getHours() == +startTime[0]) && (currentDate.getMinutes() >= +startTime[1]) ) || ( (currentDate.getHours() > +startTime[0]) && (currentDate.getHours() < +startTime[0]+2) ) || ( (currentDate.getHours() == +startTime[0]+2) && (currentDate.getMinutes() <= +startTime[1]) ) ) ) {
                            console.log(+startTime[0]+1);
                            console.log(currentDate.getHours());
                            onAirClass = ' item-on-air';
                            onAirCode = '<div class="translations_main-block-calendar-buttons"><a href="#"><span class="white-player-icon">Смотреть</span></a><span class="on-air">Сейчас в эфире</span></div>';
                        }

                        requiredSubjectCode += '<div class="translations_main-block-calendar-item' + onAirClass + '"><div class="translations_main-block-calendar-link"><span class="translations_main-block-calendar-sublink"><span class="translations_main-block-calendar-date">' + time + '</span><a href="' + href + '">' + title + '</a></span><span class="translations_main-block-calendar-icons">';

                        //добавляем нужные иконки
                        if (medals == true) {
                            iconsCode += '<span class="medals"></span>';
                        }
                        if (rf == true) {
                            iconsCode += '<span class="flag-rf"></span>';
                        }

                        if (tv == true) {
                            iconsCode += '<span class="tv-1tv"></span>';
                        }
                        
                        requiredSubjectCode += iconsCode + '</span></div><p>' + text + '</p><div class="translations_main-block-calendar-commentator">';

                        //получаем список комментаторов, а также ссылки на их страницы
                        for (var k = 0; k < commentators.length; k++ ) { 
                            commentatorsCode += '<a href="' + commentators[k].commentatorHref + '">'+ commentators[k].commentatorName +'</a>, ';
                        }
                        
                        //убираем последнюю ненужную запятую после последнего комментатора
                        commentatorsCode = commentatorsCode.replace(/\,\s$/ig, ''); 

                        requiredSubjectCode += commentatorsCode + '</div>' + onAirCode + '</div>';

                    }

                    calendarContainerContent.innerHTML += requiredSubjectCode;

                }
            }

//закомментированные строки относятся к AJAX-запросу
//        }
//   };
 
//   xhr.send();     
    
}

document.addEventListener("DOMContentLoaded", function() { 
    calendarInit();
    carouselInit();
    let clickCounter = 0;  
    let currentDate = new Date();      
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
    elementsForClick[currentDate.getDate()-1].click();
});






