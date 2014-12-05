speedy-rating.js

@@@@@@@@@@
How To Use
@@@@@@@@@@

Requires: jQuery 1.7+

Options:
    param : default value : all values
-   html_on : '' : {string}
-   html_off : '' : {string}

Define a new Speedy Rating:
	---
	$('.i-am-a-select-box').SpeedyRating();
	---

View index.html for example code.
Any select boxes with a class of "speedy-rating" are automatically applied.

Minimum required select (must have 1 to 5 in option values):
<select>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
</select>


@@@@@@@@@@@@@
Things to Add
@@@@@@@@@@@@@

- allow setting of minimum rating and maximum rating


@@@@@@@
Updates
@@@@@@@

=== v1-2 (stable) ===
- fixed issue with events not firing select update (noticeable on touch devices)

=== v1-1 (stable) ===
- added 'html_on' setting, adds html to each star item
- added 'html_off' setting, adds html to each star item

=== v1-0 (stable) ===
- created