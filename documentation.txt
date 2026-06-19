units
Layout width: %
Spacing: px
Border radius: px
Icons: px
Font: rem / px
Full screen: vh
Avoid: em

Core UI Colors:

Background → #0B0F1A
Cards → #121826
Accent → #A855F7
Text → #F3F4F6

Subject Colors:

Maths → Purple
Physics → Green
Chemistry → Blue
Programming → Orange
Biology → Lime
History → Yellow

XP Gradient:

background: linear-gradient(
   to right,
   #A855F7,
   #C084FC
);

Glow Hover:

box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);

Timer:
outer div + inner div

Shape:
border-radius:50%

Circle:
equal width & height

Progress effect:
conic-gradient()

Centering:
display:flex

Ring color:
#A855F7

Track color:
#2A3147

local Storage:

Save data:
localStorage.setItem()

Load data:
localStorage.getItem()

No saved value:
returns null

Used for:
theme
XP
streak
settings

icons
⚛  Physics
∑  Maths
∆  Geometry
π  Mathematics
√  Algebra
∞  Advanced Maths


best
⚛ Physics
∑ Maths
⚗ Chemistry
⌬ Programming
☘ Biology
⚔ History
✦ Others






common css doubts
//css
Center Element

position: fixed;

top: 50%;
left: 50%;

transform: translate(-50%, -50%);

Reason:
top/left puts top-left corner at center.
translate moves element back by half its own size.
Space selector:
.parent child

Direct child selector:
.parent > child

:first-child with space:
targets nested first children too

Prefer:
specific classes
instead of deep child selectors

pqdding like elements order 
1 value:
all sides

2 values:
vertical horizontal

3 values:
top horizontal bottom

4 values:
top right bottom left

Order:
TRBL
Top Right Bottom Left
clockwise
padding: top right bottom left;
padding: 0 8px;
=
padding: 0 8px 0 8px;

padding-inline:
left + right

padding-block:
top + bottom

Preferred:
padding: vertical horizontal





pseudo classes
CSS Pseudo Classes Cheat Sheet

User Interaction
Hover
button:hover

Mouse over element.

---

Active

button:active

While clicking.

---

Focus

input:focus

Selected input.

---

Focus Visible

button:focus-visible

Focus via keyboard navigation.

---

Focus Within

.form:focus-within

Parent selected if any child gets focus.

---

Form States

Checked

input:checked

Checkbox or radio selected.

---

Disabled

button:disabled

Disabled element.

---

Enabled

button:enabled

Enabled element.

---

Required

input:required

Required field.

---

Optional

input:optional

Optional field.

---

Valid

input:valid

Valid input.

---

Invalid

input:invalid

Invalid input.

---

Link States

Link

a:link

Unvisited link.

---

Visited

a:visited

Visited link.

---

Child Selectors

First Child

.parent :first-child

First child.

---

Last Child

.parent :last-child

Last child.

---

Only Child

.parent :only-child

Only child in parent.

---

nth Child

.parent :nth-child(3)

Third child.

---

Even Children

.parent :nth-child(even)

2,4,6,8...

---

Odd Children

.parent :nth-child(odd)

1,3,5,7...

---

nth Last Child

.parent :nth-last-child(2)

Second child from end.

---

Type Based

First Of Type

div:first-of-type

First div.

---

Last Of Type

div:last-of-type

Last div.

---

Only Of Type

div:only-of-type

Only div.

---

nth Of Type

div:nth-of-type(3)

Third div.

---

nth Last Of Type

div:nth-last-of-type(2)

Second div from end.

---

Content States

Empty

div:empty

No content.

---

Root

:root

HTML root element.

---

Negation

Not

button:not(.active)

Everything except active.

---

Matching Multiple

Is

:is(h1,h2,h3)

Matches any listed selector.

---

Where

:where(h1,h2,h3)

Like :is but lower specificity.

---

Has (Very Powerful)

.card:has(img)

Card containing image.

---

Target

Target

#about:target

Element whose id matches URL hash.

Example:

site.com/#about

---

Most Useful In Real Projects

:hover
:active
:focus
:first-child
:last-child
:nth-child()
:not()
:checked
:disabled
:root
:is()
:has()