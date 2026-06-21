//initialisation 

//defining variables
let defaultPfp = "/assets/img/default_pfp.png"
let defaultSubjects = [
{
  name: "Physics",
  subjectID: 1,
  logo: "ph-atom",
},
{
  name: "Mathematics",
  subjectID: 2,
  logo: "ph-calculator",
},
{
  name: "Programming",
  subjectID: 3,
  logo: "ph-code",
},
{
  name: "Others",
  subjectID: 4,
  logo: "ph-book-open",
}];
let user = {
  userName: "Ayatullah",
  
  userXP: 0,
  isUserSignedIn: false,
  userPfp: defaultPfp,
  userStreak: 1,
  subjectsProgress: [
  {
    
    name: defaultSubjects[0].name,
    subjectID: 1,
    logo: defaultSubjects[0].logo,
    studyTime: 0,
    sessionCount: 0
  },
  {
    name: defaultSubjects[1].name,
    subjectID: 2,
    logo: defaultSubjects[1].logo,
    studyTime: 0,
    sessionCount: 0
  },
  {
    name: defaultSubjects[2].name,
    subjectID: 3,
    logo: defaultSubjects[2].logo,
    studyTime: 0,
    sessionCount: 0
  },
  {
    name: defaultSubjects[3].name,
    subjectID: 4,
    logo: defaultSubjects[3].logo,
    studyTime: 0,
    sessionCount: 0
  }],
  userStudyGoal: 240,
  userDaysStudyTime: 0,
  userSessionCount: 0,
  lastSessionDate: null
}


//functions declaration 
//bakchodii
function hourify(min) {
  let hours;
  let minutes;
  let time;
  if (min / 60 > 1 || min % 60 > 1) {
    if (min / 60 > 1) {
      hours = Math.floor(min / 60);
    }
    if (min % 60 > 1) {
      minutes = min % 60;
    }
    time = `${hours} hours and ${minutes} minutes`;
    
  } else {
    time = `${Math.floor(min/60)} Hour and ${min%60} Minute`;
  }
  return time;
}

function shortHourify(min) {
  // change minutes into h:m.
  let time;
  if (Math.floor(min / 60) > 9 || min % 60 > 9) {
    
    time = `${Math.floor(min/60)}:${min%60}`;
  } else {
    time = `0${Math.floor(min/60)}:0${min%60}`
  }
  
  return time;
}
//calculate user's study time
function calcStudyTime() {
 let totalStudyTime =user.subjectsProgress[0].studyTime + user.subjectsProgress[1].studyTime + user.subjectsProgress[2].studyTime + user.subjectsProgress[3].studyTime;
 
 return totalStudyTime;
}
//calculate user's session completed count
function calcSessionCount() {
 let totalSessionCount =user.subjectsProgress[0].sessionCount + user.subjectsProgress[1].sessionCount + user.subjectsProgress[2].sessionCount + user.subjectsProgress[3].sessionCount;
 
 return totalSessionCount;
}
//fungtion to calc max XP level
function calcMaxXp() {
  let levelMaxXP = 100 * calcUserLevel();
  return levelMaxXP;
}
//function to calculate user level
function calcUserLevel() {
let userLevel = Math.floor(user.userXP/100)+1;
return userLevel;
}
//user ui 
function loadUpperNav() {
  // user information setup
  //pfp
  let userPfpBox = document.querySelector(".user-pfp");
  userPfpBox.src = user.userPfp;
  
  //name
  document.querySelector('.user-name').innerText = user.userName;
  
  //level
  document.querySelector('.user-level').innerText = `Level ${calcUserLevel()}`;
  
  //streak color and streak counter
  if (user.userStreak > 20) {
    document.querySelector('.streak-progress-icon').style.color = "#FF7100";
  }
  if (user.userStreak > 100) {
    document.querySelector('.streak-progress-icon').style.color = "#5D2A09";
  }
  document.querySelector('.streak').innerText = user.userStreak;
}

function loadSubjectsData(param) {
  //subject name
  let subjectsName = document.querySelectorAll(".subject-name-box");
  subjectsName.forEach((subName, i) => {
    subName.innerText = user.subjectsProgress[i].name;
    
  });
  //subjects iconsss
  let subjectsIcon = document.querySelectorAll(".subject-icon");
  subjectsIcon.forEach((subIcon, i) => {
    subIcon.classList.add(user.subjectsProgress[i].logo);
  });
  //subject study time
  let subjectsStudyTimeDisplayer = document.querySelectorAll(".subject-time-displayer");
  subjectsStudyTimeDisplayer.forEach((subTime, i) => {
    subTime.innerText = hourify(user.subjectsProgress[i].studyTime);
  });
  
}

function loadProgressBars() {
  //header initialisation 
  let studyGoalTitle = document.querySelector(".study-goal");
  studyGoalTitle.innerText = `${shortHourify(calcStudyTime())} of ${shortHourify(user.userStudyGoal)}`;
  // study goal prohress bar laod
  let studyGoalProgress = document.querySelector(".study-goal-progress");
  studyGoalProgress.style.width = `${[(calcStudyTime()) / user.userStudyGoal] * 100}%`;
  
  //xp progress initialisation
  //level display
  let userXpLevelBox = document.querySelector(".user-level-box");
  userXpLevelBox.innerText = `Level ${calcUserLevel()}`;
  //xp count
    let userXpCountBox = document.querySelector(".xp-count-box");
 userXpCountBox.innerText = ` ${user.userXP} of ${calcMaxXp()} XP`;
  // xp bar progress bar load 
  let xpProgress = document.querySelector(".user-xp-progress");
  xpProgress.style.width = `${[user.userXP / calcMaxXp()] * 100}%`;
}
//function to load lower info panel
function loadInfoPanel() {
  //display study hour
  let studyHourDisplayer = document.querySelector(".study-hour-box");
  studyHourDisplayer.innerText=calcStudyTime();
  //display session counts
  let sessionCountDisplayer = document.querySelector(".session-count-box");
  sessionCountDisplayer.innerText=calcSessionCount()
}