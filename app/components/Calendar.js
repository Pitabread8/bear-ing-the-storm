// date intialization
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

//select element in html that follow this property
const day = document.querySelector(".calendar-dates"); 
const currdate = document.querySelector(".calendar-current-date");
const prenexIcons = document.querySelectorAll(".calendar-navigation span");

//array of the different months
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//clicked day state, tracks the day clicked
let clickedDay = null;
let selectedDayElement = null;

// flag to freeze calendar after done
let calendarFrozen = false;

//generate the calender for the current month
const manipulate = () => {
  let dayone = new Date(year, month, 1).getDay();
  let lastdate = new Date(year, month + 1, 0).getDate();
  let dayend = new Date(year, month, lastdate).getDay();
  let monthlastdate = new Date(year, month, 0).getDate();

  let lit = "";
  //build the html list for days of previous month
  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
  }

  //days of current month 
  for (let i = 1; i <= lastdate; i++) {
    let isToday = (i === date.getDate()
      && month === new Date().getMonth()
      && year === new Date().getFullYear()) ? "active" : "";

    //CSS class used to visually mark the day the user clicks
    let highlightClass = (clickedDay === i) ? "highlight" : "";

    lit += `<li class="${isToday} ${highlightClass}" data-day="${i}">${i}</li>`;
  }

  //days of next month to fill the week
  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive">${i - dayend + 1}</li>`;
  }

  currdate.innerText = `${months[month]} ${year}`;
  day.innerHTML = lit;

  if (!calendarFrozen) {
    addClickListenersToDays();
  }
};

function addClickListenersToDays() {
  const allDays = day.querySelectorAll('li:not(.inactive)');
  allDays.forEach(li => {
    li.addEventListener('click', () => {
      if (calendarFrozen) return; // prevent click if frozen

      if (selectedDayElement) {
        selectedDayElement.classList.remove('highlight');
      }

      li.classList.add('highlight');
      selectedDayElement = li;

      clickedDay = parseInt(li.getAttribute('data-day'));

      console.log('Clicked day:', clickedDay);
    });
  });
}

manipulate();

prenexIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    if (calendarFrozen) return; // prevent navigation if frozen

    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      date = new Date();
    }

    clickedDay = null;
    selectedDayElement = null;

    manipulate();
  });
});

// --- DONE BUTTON ---
const doneButton = document.createElement('button');
doneButton.innerText = "Done";
doneButton.style.marginTop = "10px";
doneButton.addEventListener('click', () => {
  if (clickedDay === null) {
    alert("Please select a day first!");
    return;
  }

  calendarFrozen = true; // freeze calendar
  console.log("Selected date:", `${months[month]} ${clickedDay}, ${year}`);

  // Optional: visually disable the calendar
  day.querySelectorAll('li').forEach(li => li.style.pointerEvents = 'none');
  prenexIcons.forEach(icon => icon.style.pointerEvents = 'none');
  doneButton.disabled = true;
});

// attach the button to calendar container
document.querySelector(".calendar-container").appendChild(doneButton);
