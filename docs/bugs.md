STUDY RPG - Development Notes

List of bugs to remove / solve

- [x] 1. Remove unnecessary parameters ("ft", "f", "focusType", etc.)
- [x] 2. Timer showing "NaN:NaN:NaN"
- [x] 3. Timer becomes negative after reaching zero
- [ ] 4. "stopCounter()" mixes multiple responsibilities (stop + completion popup)
- [x] 5. Notification popup selectors are incorrect ("information-popup-*" reused)
- [x] 6. "lastTimerDuration" reference should use "timer.lastDuration"
- [x] 7. Missing "break" after "case "timer"" in "stopCounter()"
- [ ] 8. Popup buttons keep getting new ".onclick" assignments (check for future conflicts)
- [ ] 9. Timer completion and manual reset should behave differently
- [ ] 10. Pause icon should always stay synced with counter state
- [ ] 11. Reset should restore timer object values completely
- [ ] 12. Notification popup Continue button selector needs verification
- [ ] 13. Separate completion logic from reset logic
- [ ] 14. Stopwatch completion popup should show elapsed time instead of timer duration
- [ ] 15. pause icon not changing on first click
---

Upcoming Features

Core

- [x] Counter resets when changing focus mode
- [ ] Close popup using Cancel button
- [ ] Close popup using X button
- [ ] Click outside popup to close (optional)
- [ ] Proper Notification popup
- [ ] Proper Confirmation popup

Timer

- [ ] Confirmation popup before resetting unfinished timer
- [ ] 5-second delay before Reset becomes available
- [ ] Show remaining time in confirmation
- [ ] Different message if timer completed naturally
- [ ] Play completion sound
- [ ] Desktop notification (future)

Stopwatch

- [ ] Reset confirmation
- [ ] Completion/session summary popup
- [ ] Save longest session

Pomodoro

- [ ] Setup popup
- [ ] Work session
- [ ] Short break
- [ ] Long break
- [ ] Round counter
- [ ] State management (work/break/long break)
- [ ] Auto switch between sessions
- [ ] Completion notification

UI / UX

- [ ] Better popup animations
- [ ] Disable focus mode switching while running
- [ ] Keyboard shortcuts
- [ ] Responsive layout improvements

Statistics

- [ ] Total focus time
- [ ] Total completed sessions
- [ ] Longest session
- [ ] Daily streak
- [ ] Weekly stats

Future Ideas 😝

- [ ] Motivational messages
- [ ] Confetti on completion
- [ ] Achievement badges
- [ ] XP system
- [ ] Background music / ambient sounds
- [ ] Custom themes
- [ ] Export / Import settings
- 
curremtly working on
1. handle timer completion