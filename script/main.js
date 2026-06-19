//initialisation 

//defining variables
let isUserSignedIn = false;
let userLevel = 1;
let userXP = 0;
let levelMaxXP = 100*userLevel;
let defaultPfp = "/assets/img/user_pfp.png"
let userPfp = defaultPfp;
let userName = "Ayatullah";
let userStreak = 2;

//setting up ui
function loadApp() {
  // user information setup
  document.querySelector('.user-name').innerText=userName;
  document.querySelector('.user-level').innerText=`Level ${userLevel}`;
  
  //streak color and streak counter
  if (userStreak>20) {
    document.querySelector('.streak-progress-icon').style.color="#FF7100";
  }
  if (userStreak>100) {
    document.querySelector('.streak-progress-icon').style.color="#5D2A09";
  }
  document.querySelector('.streak').innerText= userStreak;
  
  // timer control panel setup
}

loadApp()
//alert(level_max_xp)
