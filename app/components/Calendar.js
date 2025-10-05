"use client";

import { useEffect, useState, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [clickedDay, setClickedDay] = useState(null);
  const [calendarFrozen, setCalendarFrozen] = useState(false);
  const [days, setDays] = useState([]);

  // refs to disable pointer events on navigation icons and days when frozen
  const navPrevRef = useRef(null);
  const navNextRef = useRef(null);

  useEffect(() => {
    generateCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, clickedDay, calendarFrozen]);

  const generateCalendar = () => {
    let date = new Date(year, month, 1);
    let dayone = date.getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let monthlastdate = new Date(year, month, 0).getDate();

    const newDays = [];

    // Previous month's tail days
    for (let i = dayone; i > 0; i--) {
      newDays.push({ day: monthlastdate - i + 1, inactive: true });
    }

    // Current month days
    for (let i = 1; i <= lastdate; i++) {
      newDays.push({
        day: i,
        inactive: false,
        isToday:
          i === today.getDate() && month === today.getMonth() && year === today.getFullYear(),
        isClicked: i === clickedDay,
      });
    }

    // Next month's leading days to fill the week
    for (let i = dayend; i < 6; i++) {
      newDays.push({ day: i - dayend + 1, inactive: true });
    }

    setDays(newDays);
  };

  const onDayClick = (dayObj) => {
    if (calendarFrozen) return;
    if (dayObj.inactive) return;
    setClickedDay(dayObj.day);
  };

  const onPrevMonth = () => {
    if (calendarFrozen) return;
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setMonth(newMonth);
    setYear(newYear);
    setClickedDay(null);
  };

  const onNextMonth = () => {
    if (calendarFrozen) return;
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setMonth(newMonth);
    setYear(newYear);
    setClickedDay(null);
  };

  const onDone = () => {
    if (clickedDay === null) {
      alert("Please select a day first!");
      return;
    }
    setCalendarFrozen(true);
    console.log(`Selected date: ${months[month]} ${clickedDay}, ${year}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edecec] p-4">
      <div className="calendar-container bg-[#484747] w-80 rounded-lg shadow-lg text-white select-none">
        <header className="flex items-center justify-between px-5 pt-4 pb-2">
          <p className="font-medium text-lg">
            {months[month]} {year}
          </p>
          <div className="flex space-x-1">
            <button
              ref={navPrevRef}
              onClick={onPrevMonth}
              disabled={calendarFrozen}
              className="h-8 w-8 flex items-center justify-center rounded-full text-[#aeabab] hover:bg-gray-200 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous Month"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>

            <button
              ref={navNextRef}
              onClick={onNextMonth}
              disabled={calendarFrozen}
              className="h-8 w-8 flex items-center justify-center rounded-full text-[#aeabab] hover:bg-gray-200 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next Month"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="calendar-body p-2">
          <ul className="flex text-center text-[#ddd] font-semibold text-xs">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <li key={d} className="w-1/7 py-1">
                {d}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap text-center">
            {days.map((d, i) => {
              const baseClasses = "w-1/7 h-8 leading-8 text-sm relative cursor-pointer box-border";
              let classes = baseClasses;
              if (d.inactive) {
                classes += " text-[#aaa] cursor-default";
              } else {
                classes += " text-[#ccc]";
              }
              if (d.isToday) {
                classes += " text-white";
              }
              if (d.isClicked) {
                classes +=
                  " bg-transparent outline-2 outline-dotted outline-[#38f3b1] rounded-full z-10";
              }

              return (
                <li key={i} className={classes} onClick={() => onDayClick(d)}>
                  {/* Circle behind active day */}
                  {!d.inactive && d.isToday && !d.isClicked && (
                    <span className="absolute top-1/2 left-1/2 w-7 h-7 rounded-full bg-[#6964ff] -translate-x-1/2 -translate-y-1/2 -z-10"></span>
                  )}
                  {d.day}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="px-5 pb-5 pt-2">
          <button
            onClick={onDone}
            disabled={calendarFrozen}
            className="w-full bg-[#cfddd0] text-black py-3 rounded-lg text-base font-medium hover:bg-[#8ba08d] hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
