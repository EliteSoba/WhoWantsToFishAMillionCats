# Who wants to fish a million cats
### EliteSoba

A simple adaptation of https://catfishing.net that pulls the most common user answers
and presents them in multiple choice format. In the event of a question not having enough
common user answers, it just skips that question for now.

Uses data from days 32 to 594.

Uses a hacked together combination of webpack, React, Typescript, and Tailwind

#### TODO:
- Add attributions
- ~~Determine better behavior for a question not having enough responses~~
- Filter very similar wrong answers somehow, and more variety
  - Solved somewhat by also including very similar correct answers
  - Can still probably increase the string distance a bit, and also maybe better weighting
  - Fake bad answers? I can probably do some vowel replacement for wrong answers
- ~~More variety in correct answers~~
- ~~Link to article when there's no image~~
- Remember the other thing I wanted to do related to answers
- ~~Actual end screen~~pretty good
- Day picker
- Mixing random days
- ~~Better way of harvesting and managing day data~~
  - The day separation is great but makes mixing of data more difficult
  - Another option is a giant file that I read and update, instead of doing a file scan
- Actually cleaning up this mess
  - css :(
- ~~I should do something about all the SVGs~~good enough
- Keyboard controls, or remove the tooltips
- ~~Figure out how my tailwind setup is working~~
- I really want to use react router here with urls and whatnot
  - Okay this really sucks without a server because my only real option is a hacky 404 behavior
  - I probably should still do a StaticRouter
- I also kinda wanna practice react native
