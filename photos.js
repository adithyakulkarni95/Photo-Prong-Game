var stop1 = false;
var photos = [];
var message;


var resumeAction = function () {
	
	stop1 = !stop1;
	if (stop1 == true)
	{	
		message.innerHTML += "Animation Stopped<br>"
		clearspeed()
	}
	else
	{
		message.innerHTML += "Animation Started<br>"
		setspeed()
	}
}


var setspeed = function () {

	var id = 1001;

	Array.from(document.getElementById("photos").children).forEach(element => {
		var time = Math.random() * 8 + 2;
		var photo = 
		{
			id: id,
			htmlElement: element,
			dt: time,
			vx: Math.random() - 2, 
			vy: Math.random() - 2,
			interval: null
		}
		
		photo.interval = setInterval(function () { start(photo) }, time);
		photos.push(photo);
		id++;
	});
}

function start(photodetails) 
{
    // debugger;
	
	var court = document.getElementById("court");
	var left = court.offsetLeft;
	var top = court.offsetTop;
	var right = court.offsetLeft + 1000;
	var down = court.offsetTop + 600;

	// move photodetails
	var photo1 = photodetails.htmlElement.offsetTop + photodetails.vy;
	var photo2 = photo1 + photodetails.htmlElement.height;
	var photo3 = photodetails.htmlElement.offsetLeft + photodetails.vx;
	var photo4 = photo3 + photodetails.htmlElement.width;

	photodetails.htmlElement.style.top = photo1 + 'px';
	photodetails.htmlElement.style.left = photo3 + 'px';


	if (photo2 >= down)
	{
		photodetails.vy = -photodetails.vy;
		photodetails.htmlElement.style.top = down - photodetails.htmlElement.height - 2 + 'px';
	}
		
	else if (photo1 <= top) 
	{	
		photodetails.vy = -photodetails.vy;
		photodetails.htmlElement.style.top = top + 1 + 'px';

	}

	if (photo4 >= right)
	{
		photodetails.vx = -photodetails.vx;
		photodetails.htmlElement.style.left = right - photodetails.htmlElement.width - 2 + 'px';
	}

	else if (photo3 <= left)
	{
		photodetails.vx = -photodetails.vx;
		photodetails.htmlElement.style.left = left + 1 + 'px';
	}
	//debugger;		
	CollisionCheck(photodetails)
}


function CollisionCheck(photodetails)
{
	photos.forEach(element => 
		{			
			if (element.id != photodetails.id)
			{
				if (!( photodetails.htmlElement.getBoundingClientRect().right < element.htmlElement.getBoundingClientRect().left ||photodetails.htmlElement.getBoundingClientRect().left > element.htmlElement.getBoundingClientRect().right))
				{
					if (!(photodetails.htmlElement.getBoundingClientRect().top > element.htmlElement.getBoundingClientRect().bottom || photodetails.htmlElement.getBoundingClientRect().bottom < element.htmlElement.getBoundingClientRect().top))
					{	
						var vertical = element.vy;
						var horizontal = element.vx;

						element.vy = photodetails.vy;
						photodetails.vy = vertical;
					
						element.vx = photodetails.vx;
						photodetails.vx = horizontal;

						if (photodetails.htmlElement.getBoundingClientRect().left < element.htmlElement.getBoundingClientRect().right && photodetails.htmlElement.getBoundingClientRect().right > element.htmlElement.getBoundingClientRect().right) 
						{
							photodetails.htmlElement.style.left = element.htmlElement.getBoundingClientRect().right + 3 + 'px';
						}			
					}
				}
			}
		});
}

var clearspeed = function () {
	
	photos.forEach(element => {
		clearInterval(element.interval);
	});
}

var initialize = function () {
	message = document.getElementById("message");
	message.innerHTML += 'Animation Started <br>'
	setspeed();
}