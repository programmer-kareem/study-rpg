//initialisation 

//defining variables
let isUserSignedIn = false;
let userLevel = 1;
let userXP = 0;
let levelMaxXP = 100*userLevel;
let defaultPfp = "/assets/img/user_pfp.png"
let userPfp = defaultPfp;
let userName = "Ayatullah";

//setting up ui
function loadApp() {
  // Tab to edit
  document.querySelector('.user-name').innerText=userName;
  document.querySelector('.user-level').innerText=`Level ${userLevel}`;
  
}
loadApp()
//alert(level_max_xp)
