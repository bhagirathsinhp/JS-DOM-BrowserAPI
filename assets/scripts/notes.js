// Back to the DOM & More Browser APIs



// 1. Module Introduction...

// We will work in deep with DOM - we'll learn about working with their coordinates, their sizes, attaching data to them and what else the browser offers when working with them.

// We'll learn about:
/* 
Attaching Data to Elements
Working with Element Coordinates & Sizes
Working with Templates & Dynamic Scripts
Navigator, location & window.history
*/


---------------------------------------------------------------------------------------------------------------


// 2. USing "dataset" with DATA- attribute...

// We start with attaching data to DOM elements.
// In this project we got a tooltip which on clicking displays a tooltip with DUMMY text.
// We want appropriate texts to be displayed when clicking more info button on each projects.

// We know we are managing the HTML - which may be sent to us prerendered and from the client side on a server - making it something without the tooltip data.
// Max here added data-extra-info in the HTML. 

// The special attribute here is DATA-. 
// We can give this attribute any name like = data-some-text OR data-whatever
// This is a special attribute we can give to our element to attach any kinda data to them.
// We can add as many data attributes to an element.

// How can we read from that attribute?
// We have a special property in JS = dataset.
// We reach out to the DOM Node itself.
const projectElement = document.getElementById(this.id);
// Now to read from this.
projectElement.dataset
// This .dataset is what helps us reach the data-.
// DATA- attributes are all merged together in a dataset property.
// We console log it to see what's inside of them.
console.log(projectElement.dataset);

// But we need to adjust somethings first.
// THIS.ID refers to the this.id property in the constructor - and in more info event listener - we attach showmoreinfohandler() = so we gotta bind THIS to it.
// Cause then it would refer the same thing inside of showmoreinfohandler.
// With this we click on more info button and we can see it consoled in.

// We can see that the data is logged in - and it's name is automatically changed from extra-info to extraInfo.

// We can add our own content.
// We get reach out to the element and then with dataset we add dynamically a new property. And set it to the data we want.
projectElement.dataset.someInfo = 'Test';
// We can see that besides extraInfo, someInfo will be added to it too...

// Now we wanna read from the tooltip the data we have.
// We create a new const tooltip with the extraInfo dataset property.
// We then forward tooltip to the new Tooltip class as a 2nd arg to the constructor.

showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    // projectElement.dataset.someInfo = "Test";

    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, tooltipText);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

// Then we pass in the appropriate arg to the constructor.
// In create() we set that text content to this.text.
class Tooltip extends Component {
  constructor(closeNotifierFunction, text) {
    super();
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = this.text;
    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}
// We see the texts in document.


------------------------------------------------------------------------------------------------------------


// 3. Getting Element Box Dimensions...

// The Tooltip is in the wrong position.
// We want it to be displayed below the moreInfo button.
// We will learn about positioning facts in this lectures.
// How to position items? This happens with CSS and how browser renders the page.
// We will also need to understand how to get exact coordinates, exact calculated width and so on.
// We will use JS to find the positions and stuff..

// We detour here a bit to learn about sizes and stuff - we have a folder which we have on number 3. Sizes HTML, we will extract on our main notes folder.
// We places sizes.html next to index.html and sizes.css next to app.css.
// We will also create dummy sizes.js just for no errors.

// We open sizes.html on web.
// This is a dummy setup to practice sizes and position and so on.
// It's notes will be written here.

// We select the main-box id of the box displayed on the webpage by opening Inspector and selecting the main-box.
// Now there's a special method to access the selected element on the console which dev tools offer - $0 = this will help us get access to the selected element.

// We use a method which gives us some useful info about the box here.
// The method is $0.getBoundingClientRect().
// We can run this for any element of the page.

// The method gives info on couple of coordinates and sizes.
// To understand these values we need to understand that the browser renders a web page in 2D values.

// X & Y coordinates.
// X-axis from the left to right.
// Y-axis from the top to bottom.
// It's not like the traditional coordinate system where y-axis goes from bottom to top or x-axis goes from left to right at the bottom.
// Instead it's on the top left where the X-axis starts.

// This coordinate system thinks in pixel.
// Therefore on the top left corner we would have the coordinates 0 for X and 0 for Y.
// On the top right corner - Y = 0, X = Width of our screen or the width of document.
// On bottom-left - X = 0, Y = Height of the document.
// On bottom-right - X = Width of the document, Y = Hieght of our document.

// If we see X,Y in the console = 100,100.
// It says - the box here has it's position on 100 pixel down from the top-left corner and 100 pixel away from the left.
// We have this positioning cause in styles.css of this HTML, we set the margin of the body to 100px.

// We can see top & left value - they are same as X & Y.
// Width and height are associated with width and height of the box.
// The bottom and right value - the pixels the box is away from the bottom and this goes same for the right.

// We can dive in more specialized properties.


------------------------------------------------------------------------------------------------------


// 4.  Working with Element Sizes & Positions...

// We get more specialized data.
// We have - offsetTop for eg.
// It gives us the distance of topmost point to top of the coordinate or to the start of the coordinate system.
// OffsetTop - is always relative to our document start and not to the viewport - it doesn't change upon scrolling.
// Other example is offsetLeft = this is same as offsettop with left into consideration.

// We also have clientTop & clientLeft.
// As offset gives us the outer positioning of the box in coordinate system - the client property gives us the inner positioning.
// The top & left client tells us how far it is from our topmost & left to our left and topmost point to the content of the box.
// Content of the box is the entire box without any borders and potential scroll bars rendered in.

// We have a border of the box - 15px which we see in the clientTop and clientLeft value in the console.

// We can get offsetWidth and offsetHeight which are the entire width and height of the box including all borders and scrollbars.
// We have clientHeight & clientWidth - which are of the inner set in the box without borders and scrollbars.
// The width is 300 inside the box minus the border size into 2 = 30px = 270px cause we have border on left and top.

// Also - the content in the box is scrollable.
// We can get some interesting data regarding Scrolling.
$0.scrollHeight // With this we get the entire height including that of the content which is not visible till we scroll.
$0.scrollTop
// This gives the info on how much we scroll in the content box.
// For eg: we scroll to the middle - and use the scrollTop property, then it will give the number of the scrolled value. 
// If we scroll to the bottom and use the property = it will show the value of 240px.

// For entire document width - we got 2 options : 
// window.innerWidth & window.innerHeight = will give us width and height we have inside of the window without dev tool, without URL bars and those things on the top of the browser.
// The problem with this is if we have the visible scroll bar - which is common in Windows OS.
// Then this will include scroll bar - which will set more width and height.

// Therefore we can use the another method :
// First we go to document using below property..
document.documentElement.clientWidth
document.documentElement.clientHeight
// These values are more reliable cause they will give us the real width and height that is available..


// WE CAN GET ALL THESE PROPERTIES ON MDN - HTML ELEMENTS.

// WE ALSO HAVE THE PDF TO SUMMARIZE THIS LECTURE AND SHOW IMAGE REPRESENTATION OF IT.


--------------------------------------------------------------------------------------------------------


// 5. The DOM & Prototypes

// This lecture is about understanding MDN - Element, HTML Element docs we find there.

// Every HTML Element is inheriting from Element.
// Every Element prototype is inheriting from Node.
// Every Node prototype is inheriting from EventTarget.

// The extra properties on the MDN page for HTMLElements are present. For eg - HTMLInputElement has HTMLElement prototype. (there are various properties like it..)
// Through it we have access to everything from HTMLElement - Element - Node - EventTarget.


------------------------------------------------------------------------------------------------------


// 6. Positioning the Tooltip...


// Now we go back to our index.html document.
// We want to position our tooltip on below the more info buttons.
// We will position it with the help of the tools that we learned about.
// To position that tooltip we need to know where the host element is - the element that is responsible for showing that tooltip.
// It's in project item where we click on more info.

// On tooltip we add a new arg on constructor.
// We pass in hostElementId.
// We pass it in super() of the constructor.
// There's the hostElementId in base class which we expect. 
// We use it to select that hostelementid on document to store it in a property which we can access in our subclass.
class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }
}

// In tooltip we passed hostelementid in super(). Therefore we get access to our hostelement property.

// In create() before the event listener we will console - hostElement.getBoundClientRect() to see the host element positioning.

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = this.text;
    console.log(this.hostElement.getBoundingClientRect())
    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

// Now we get the hostElementId for the constructor from where we created the new Tooltip instance. 
// So we pass in the value for it in the ProjectItem.
// We forward the id of the project with this.id...

const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, tooltipText, this.id);

// So when we click on more info we get the coordinate of our project DOM node.
// We will get the positioning coordinates of the projects that we click on.
// The tooltip is also created below the project that we clicked on more info of.
// It's based on the logic that we passed in base component.
// We will change the positioning of it as it doesn't look proper.

// We take a look at the positioning info that we get from console.
// These values are the calculated values by the browser.

// We will position the hostElement inside the create().
// We will use the help of properties that we learned before.

// We will create a new const with leftposition.
// We will use offsetleft - this is the distance of the start of our page to the leftmost coordinate of our element.
// We also fetch the top coordinates to exactly know our X & Y positions.
// Now we also need the height to position the tooltip at the bottom of the element and not on the topleft corner.
// We use clientheight - the height of the content.
// We could've also got the offsetHeight to get the full height including borders but here we have no borders.
create() {
  const tooltipElement = document.createElement("div");
  tooltipElement.className = "card";
  tooltipElement.textContent = this.text;
  // console.log(this.hostElement.getBoundingClientRect());

  const hostElPosLeft = this.hostElement.offsetLeft;
  const hostElPosTop = this.hostElement.offsetTop;
  const hostElHeight = this.hostElement.clientHeight;

  tooltipElement.addEventListener("click", this.closeTooltip);
  this.element = tooltipElement;
}

// With this info we will try to position of our tooltip.
// We will calculate X & Y position for tooltip.

// I wrote 20 = it refers to the pixels.  
// As our coordinate system starts on top left corner - we push the elements further down.
// The coordinate system go from top left to bottom right basically - that's how the browser lays out the web page.
// So in const y we add the height to go down the page.
// We deduct 10 from y to not go down the entire height but only with - 10.
const x = hostElPosLeft + 20;
const y = hostElPosTop + hostElHeight - 10;

// Let's try out these coordinate for rendering tooltip.

// To position element:
// We don't do this - tooltipElement.offsetHeight = x or y or something.
// OffsetHeight and properties like these are read-only values.
// We position elements with the same method as we do in CSS.
// So we will access the style and add the value to it.
// IMPORTANT: But in CSS we add pixels to the values. Here we also do it but with ''.
tooltipElement.style.left = x + 'px';
tooltipElement.style.top = y + 'px';

// We won't see any difference.
// It's cause due to the way CSS works.
// We can't just change the CSS from JS, we will need to set another property before changing positions.

tooltipElement.style.position = 'absolute';
// Then only we can change the positions that we set.
// We can position element acc. to absolute coordinate system on the screen.
// Otherwise it's always positions relative in the document flow.

// Now we can see the box with proper rendered position....
// But when we scroll to the bottom project in active projects we can see the box will appear out of the project field.

// Both the tooltip on the projects stays static on the page when we scroll from up to down.
// Scroll distance is the problem here.

// When we set the height and left and so on values, these coordinates ignore whether the element is being scrolled or not.
// To include the scrolling info. - we need to find out how far we scroll the content in the box.

// We get our scrolling..
const parentElementScrolling = this.hostElement.parentElement.scrollTop;
// We get access to the parent element rather than only the projects cause scrolling is in the list which is parent element.

// We then deduct this parentElementScrolling from Y.
// We adjust the actual position by amount of scrolling we did basically.

const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

// Thus the when we scroll, and click more info the tooltip will appear just below the moreinfo button.
// But the tooltip won't stick.
// We will dive into it as it will take up event listeners in events module..


--------------------------------------------------------------------------------------------------


// 7. Handling Scrolling....

// We will learn about scrolling features which will let us acticely scroll the user somewhere.
// As we add an active project to the finished, we can just see the part of it.
// We wanna see the whole as we want the box to automatically scroll to the bottom where the project was added.

// There are various methods for this.
// We will use some with references in Dev Tools.

// In the dev tools, in inspector we select the ul of finished project.
// Then as we learned before we can access it with - $0.

$0.scrollTo();
// This function takes 2 coordinates x & y where we can define how much we want to scroll to the left or right - or how much we wanna scroll to top or bottom.
// Here we can't scroll left to right so we will set x = 0;
// We can scroll y axis...

$0.scrollTo(0, 50);
// When hitting enter we will automatically scroll to the bottom with 50px..
// But if we repeat this command, it will only scroll to 50px, it won't add 50px to the current scroll - absolute scroll.
// And if we add any high value, it will go down as far as possible.

// We can scroll relatively.
// We will set the scrollBy() and as we use this command more we will add more scrolling pixels.
$0.scrollBy(0, 40);
// The scroll will go down 40. But if we use this again.
$0.scrollBy(0, 60);
// This 60px will be added to 40 and will scroll accordingly and scroll down 60px more.

// As we can get the coordinates of any element with JS, we can insert the coordinates of that element in these functions and can automatically get scrolled t that element.

// Now if we wanna make a specific element visible with scrolling - there's an easier way.

// Let's take the element from project list class.
// And when we move it, we want to make sure it's visible as it's scrolled there.

// In DOMHelper where we moved the element, we will call...
element.scrollIntoView(); // this function will make sure the element which is added on to any of the projects will be scrolled into view.
// And we can also add smooth transition cause by default it's auto which jumps on the element.
element.scrollIntoView({behavior: 'smooth'});

// In the scrollTo and scrollBy we can pass in an alternative object.
$0.scrollTo({top: 50, behavior: 'smooth'});
// Here we could also set left but we didn't need it but we can also set the behavior.

// Same is available to scrollBy.


--------------------------------------------------------------------------------------------------


// 8. Working with <template> Tags...

// We come back to working with content.
// Now up till this point - we added some HTML code externally using innerHTML.
// Like in this app, we can add it to the tooltip which just takes some text as text content.
// We change it...
// tooltipElement.textContent = this.text; from this to..
tooltipElement.innerHTML = `
  <h2>More Info</h2>
  <p>${this.text}</p>
`;
// In the page we can see More info added to the tooltip.
// But we are working on this app as JS dev where we got the HTML page from server or client side.
// We will work with team where there are people with HTML work.
// We don't want all this HTML code in JS.

// This here is simple code but if we had longer HTML code, it would get cumbersome.

// We have a solution for it.
// We can use special HTML tag in HTML page to setup - to be used HTML code which we don't wanna render right from the start but we wanna eventually use in our JS code.

// TEMPLATE tag.
// We will add in our html body.
// It's content by default isn't rendered but is part of the DOM.
// So we can query it and use it in JS.
// We can add id to the template - tooltip here.

<template>
  <h2>More Info</h2>
  <p></p>
</template>
// We moved the code from JS to here in HTML code.
// The ${} won't work here so we won't add it now but will add it via JS.
// In JS we can use this template..
// In create() we access it...

// We then get access to the template element.
const tooltipTemplate = document.getElementById('tooltip');
// We utilize the tooltipTemplate.
const tooltipBody = document.importNode(tooltipTemplate.content, true)
// We used importNode() and passed in our template.content - this will give us the content of our template tag - h2 and p..
// This will create a new node based on the content.
// We set true to it so we do a deep import.

// Now we got that body available, which we can add to our tooltip element.
// But before doing that we should adjust the p tag in there.

tooltipBody.querySelector('p').textContent = this.text;
tooltipElement.append(tooltipBody);
// This took more lines than before but this is used when we have longer HTML code.


--------------------------------------------------------------------------------------------


// 9. Loading Scripts Dynamically...

// We can create and run a script with JS.  
// In app.js we go to App class - init() method. 
// In there we can create a script in JS.
// We will create a new const - someScript.
// We will create a new element with script tag.
// And yes, we have script tags in HTML.

const someScript = document.createElement('script');

// Now someScript is script tag in which we will enter some text.
// Then we add it to the document's head...

someScript.textContent = 'alert("Hi There");'
document.head.append(someScript);
// So we made sure when init() is run, our new script should run too.
// And in the page we see it...

// Now we would think if we want to execute some script code we can do it inside the app.js, why this?
// Well, we use this for some external script...

// It's more interesting where we have some script file which we wanna download at certain time.
// So it's where we wanna control when the browser loads the script from inside our JS code.

// Let's say we have another script in our folder.
// analytics.js - with simple code in there.
// Now we have some app where we want this script to run after something happens.
// We don't add it to the HTML.
// For eg - we want it to run after user clicked the button or something like that...

// For this we will add a new static method in App class...
// We will add a new script to the document - and add source SRC of that script to it. 
// We add src as we do in HTML page.
// Then we also set defer to true so that the script is only loaded after all HTML parsing has been done...
// We append it.

static startAnalytics(){
  const analyticsScript = document.createElement('script');
  analyticsScript.src = 'assets/scripts/analytics.js'
  analyticsScript.defer = true;
  document.head.append(analyticsScript)
}

// Now we want our method to run whenever it's called - for eg we can run it when a button is clicked..
// Here we will keep it simple can call it in init().
// If we wanna add this script whenever a button is clicked - we just need to make sure we don't add this same script multiple times.

// This scipt may seem to be running as the page is refreshed but it's cause we called it in init().
// This script is nonetheless added dynamically and will run at a certain point in time when we want it.
// To see this example...

// We will create a new footer with a button with id = 'start-analytics-btn'.
// Then we will access this id from init().
<footer>
  <button id='start-analytics-btn'>Start Analytics</button>
</footer>

// Then in init():
document.getElementById('start-analytics-btn');
// Then add event listener to this btn..
document.getElementById('start-analytics-btn').addEventListener('click', this.startAnalytics);

// Now we save it and won't see our sending analytics in console but will see only when we click that button.

// In dev tool we go into network tab and in there we see all the files that are loaded.
// We refresh the page and can see that the analytic file isn't loaded...
// It will be loaded when we click on start analytics button.

// IMP NOTE - we should be careful when dynamically adding a script - and especially be careful when it comes to dynamically rendering user created scripts cause that opens us up to some attacks and we will look at it in the Security module where we learn about attacks like cross-site attacks where a malicious code is injected in our code.

// So when we add some script dynamically, we make sure we don't do it based on some user entered content or at least validate that content and sanitize it before we execute it.


---------------------------------------------------------------------------------


// 10. Setting Timers & Intervals...

// There are some features which exposes to us in JS that allow us to influence user experience - it's setting timer (2 types of timers we can set in our code.)

// Instead of starting our analytics when user clicks the button, we want it to start after 3 seconds of the page being loaded.
// We do it with setTimeout() method..
// Under the hood this method exist in window object...

setTimeout();
// It takes 3 args (We talk about 3rd way down). 
// 1 - a function which will execute when the timer expires.
// This could be anonymous function - both arrow or normal, or ofcourse we can point at a function here - startAnalytics.
// 2 - it will take a number of timer. 
// Here - 3000 - which is in ms.
// This means it will execute the timer for 3 secs.

setTimeout(this.startAnalytics, 3000);

// This is an example for some asynchronous code execution in JS - a topic we haven't really had a look at.
// This timer won't pause all the script execution - we will be able to click all buttons and so on.
// Instead this is registered by browser in background - where browser looks into it and see that when the timer expires the function should be called.

// We can pass 3rd arg which will be [ ] of arguments which we might wanna pass in to that function when it executes.

// This timer runs once.
// Sometimes we wanna have timer which runs on an interval = like after every 3 secs or 6...
// We will do it in analytics.js...

// In there instead of console logging when script's loaded - we set a timer cause we might want to send analytics data to our server every 2 secs...

// Check analytics.js for code...

// For that we use...
setInterval();
// Here we pass in anonymous function - the function could be of any type.

setInterval(() => {
  console.log('Sending Analytics Data....')
}, 2000);
// We add 2000 for ms as it will be executed every 2 secs.
// There's 3rd arg - [] of args. Which will be fed into the function we execute.
// Now we set and reload - for first 3 secs nothing happens but after that on every 2 secs - that function gets executed...

// We can also stop a timer or interval - we can do that...
// We change our button from before to stop analytics.
// This should stop the timer or if we already are on interval - clicking the button should stop that...
// After setting the timer - we will add event listener for that button.

// We use anonymous function in the listener - where we stop the timer if it's still running...
document.getElementById("stop-analytics-btn").addEventListener("click", () => {} );

// We will store the timer into an const as it returns an ID.
const timerId = setTimeout(this.startAnalytics, 3000);

// Then with this we run in clearTimeout() in anonymous function..

document.getElementById("stop-analytics-btn").addEventListener("click", () => {
  clearTimeout(timerId);
} );
// So when we reload - we click on stop button before 3 secs expire - we can see there's no sending analytic in console...

// On the other hand - when we reload again and miss 3 secs time and click on stop - it won't stop the interval.
// We will store our interval method in an ID.
// And do the same as we did with timer here...
const intervalId = setInterval(() => {
  console.log("Sending Analytics Data....");
}, 2000);

// Instead of using clear timeout we use clearInterval() - though we can work clear timeout here..
document.getElementById("stop-analytics-btn").addEventListener("click", () => {
  clearInterval(intervalId);
} );

// THESE ARE CRUCIAL FEATURES...


----------------------------------------------------------------------------------------------------


// 11. The "location" and "history" Objects....

// We will take a look in the console about some features that JS provides us apart from timers and stuff..

// If we type windows.location on console - it will display an object with couple of info regarding our page and url.
// Location can be use to navigate the user away.
// For eg - setting it to new url = 
location.href = 'https://academind.com';
// And when we hit enter - we will be passed to that webpage.

// We can also navigate with - 
location.replace() // It's a method in which we pass a url. 
// The difference of this to href is that we can't go back cause it will replace the current page in the browser history.

// Another alternative -
location.assign('') // Same to setting href depending on us setting a property or calling a method.

// Other properties - 
location.host // Which tells us which host this page is running - the domain name..
location.origin // Which is full domain including protocol.
location.pathname // The path name - the part after the domain (after the full domain name /)
// This can be useful to find where we are on the page in JS.

// We also have:
window.history;
// Now location & history kinda works together.
// Location allows us to edit browser history by navigating around or by replacing the page.
// History then allows us to interact with that history.

// For eg:
history.back() // Method to go back.
// If we set any location.href to another page.
// In that console we say - history.back() and we will be back on the main page where we were.
// The example for this is when a page asks us something and if we don't pass the eligibility we are back to the page before.

history.forward() // To go to the page where we came from.
history.length // To inspect the length of the history to find out how many steps the users did in this tab of the browser - so how often you went front and so how ofter you could go back.
history.go(5) // This would let us go back 5 steps.
// It will take user on the page he was on 5 navigations ago.

// BE AWARE - that moving users around is not giving them the best user experience.


------------------------------------------------------------------------------------------


// 12. The "navigator" Object....

// Besides location and history, there's also navigator.
navigator;
// This allows us to interact with browser and OS of our user in a limited way.
// When we expand this - in Max browser = it says mozilla even he is using Chrome.
// More interesting is one specific property in it - which is often used in checking which browser is user is using...
navigator.userAgent;
// We might expect the info of browser the user is using.
// In there in Max - we see mozilla, applewebkit, chrome, safari...
// This looks like that for a particular historic reason.
// Browser vendors in the past used to fake this to make sure that their browser could have access to all features website might be using in their scripts cause in the past browser support was very different for different web features. 
// Hence some programmers used userAgent to find out if the user is using let's say IE(it was way back so...) therefore they wouldn't run a certain script if that browser was used.

// Now as browers evolved - the browser vendors started putting all the names of the browsers so the people building the browsers can influence what shows up.
// Hence browsers faked to be another browser so that they could get full access to whatever the script wanted to do.

// Hence this is not really useful.
// Attached we find link to MDN of how we can parse this.
// A certain way of reading this which will give us more reliable info on which browser the user is using.
// https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator#example_1_browser_detect_and_return_a_string

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent


// But if we really wanna know which browser the user is using - we don't have to rely on userAgent but instead check if couple of features are available cause checking for feature availability - we can narrow down which browsers users are using.

// Other imp features navigator exposes are -
navigator.clipboard; // This will give access to clipboard API which will allow us to add something to the clipboard.
// Allow us to paste something into some input field for eg.

// This below gives us the access to geolocation which allows us to locate our user with getCurrentPosition()
navigator.geolocation.getCurrentPosition()
// getCurrentPosition() - to get user location by passing in a function which executes once the location is fetched.
// In there we can console log data - which will get us automatically as a arg.
navigator.geolocation.getCurrentPosition((data) => {console.log(data)})
// Then if we enter - browser shows us the message to allow to access the location.
// Eventually we will get that position object with coordinates.

// There's more in navigator.
// It is better to play with those with help of MDN.


-----------------------------------------------------------------------------------------------------


// 13. Working with Dates...

// Global constructor function which helps us deal with dates.
Date // object.

// We can create new date object like -
new Date();
// It will give us current date.

// Now we can store it in a const - where we can get couple of methods.
const date = new Date();
date.getDate() // To get the current date.
date.getDay() // To get the current day.
date.getTime() // This will get the time from the beginning - which is January 1st 1970.
// The time will be in ms.

// There are bunch more methods regarding date.

// We can pass in arg in date()
const date2 = new Date('07/11/2019')
// JS will try to parse it best it could.
// The date will be - Jul 11 2019.

// Connected resource will let us dig deeper.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

// We can count the differences with these dates methods. For eg - we want the difference between date and date2.
date - date2;
// In console if we press enter = we see the value in ms.
// Now if we divide it by 1000 to turn it into secs. Then divide it by 60 to get the minutes.
// Then divide it again by 60 to get hours and then with 24 to get days.


---------------------------------------------------------------------------------------------------


// 14. The "Error" Object & Constructor Function...

// Built-in method - constructor funtion.
new Error();
// We can pass in a string maybe which will be our error message - and then when we create such error object we can throw it..
throw new Error('Something wrong here...');

// We learned about throw - we can throw anything - such as an object or a string, for eg:
throw 'An error!';
// When we type this in console, we see - Uncaught An error!

// But we might wanna consider this dedicated error function.
// When we hit enter on the new error object - we get our message which is put into message property of Error object.
// We also get a stact trace which basically tells us where this error was thrown.
// In this case it is console - that's why it's anonymous but if we use it in our code - it will stat the file name and number..

// Thus, this method can give us more info.
// And as this is an object we can add stuff to it.
const customError = new Error('Something went wrong...')
// We can add other properties to this object.
customError.message 
customError.stack
customError.name // We can change it
// We can add error code:
customError.code = 404;

// We can console dir that customError to get a full view of the object which was created under the hood.


-------------------------------------------------------------------------------------------------


// WRAP UP....
/* 

DOM getBoundingClientRect(): https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

More on location Object: https://developer.mozilla.org/en-US/docs/Web/API/Location

More on window Object: https://developer.mozilla.org/en-US/docs/Web/API/Window

More on navigator Object: https://developer.mozilla.org/en-US/docs/Web/API/Navigator

*/