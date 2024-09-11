  // transform Seconds in display Time
  function displayTime(sec){
    let h, m, s = 0;

    s = sec % 60;
    m = ((sec - s)/ 60) % 60;
    h = ((((sec - s)/ 60) - m) / 60) % 100;

    if (h < 10) {h = "0" + h;}
    if (m < 10) {m = "0" + m;}
    if (s < 10) {s = "0" +s;}
    return (h + ":" + m + ":" + s);
  }

  function displayShortTimeFormat(sec){
    let newTime = "";
    let h, m, s = 0;

    s = sec % 60;
    m = ((sec - s)/ 60) % 60;
    h = ((((sec - s)/ 60) - m) / 60) % 100;

    // Check if there are hours and round minutes up if there are seconds
    if (s != 0) {m++;}
    if (h === 0) {
      newTime = m + " min";
    } else {
      newTime = h + " hours " + m + " min";
    }

    return (newTime);
  }


  function roundToMinutes(sec){
    return Math.ceil(sec / 60);
  }

  export {displayTime, displayShortTimeFormat, roundToMinutes};