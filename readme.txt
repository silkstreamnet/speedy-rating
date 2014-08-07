speed-rating.js

@@@@@@@@@@
How To Use
@@@@@@@@@@

Options:
   param : default value : all values
// none

View index.html for example code.
Any select boxes with a class of "speedy-rating" is automatically applied.

Minimum required select (must have 1 to 5 in option values):
<select>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
</select>

Define a new Speedy Rating:
	---
	$('.i-am-a-select-box').SpeedyRating();
	---

@@@@@@@@@@@@@
Things to Add
@@@@@@@@@@@@@

- allow setting of minimum rating and maximum rating


@@@@@@@
Updates
@@@@@@@

=== v1-0 (stable) ===
- created