console.log("test");
const Enum_Weather = {
	Sunny: 0,
	Cloudy: 2,
	Rain: 3,
	Snow: 4,
	HeavySnow:5,
	Typhoon: 6
}
const Enum_Temperature = {
	Normal: 0,
	Hot: 1,
	Cold : 2
}

const Enum_Time = {
	Morning:1,
	Day:0,
	Evening:1,
	Night:2
}
const rei_outfits = {
	0:"rei_normal.png",
	1:"rei_atsui.png", // "atsui" = hot
	2:"rei_kumori.png", // "kumori" = cloudy
	3:"rei_ame.png", // "ame" = rain for those that don't know japanese (I like to flex my minimal knowledge of the language :pensive:)
	4:"rei_samui.png", // "samui" = cold
	5:"rei_yuki.png", // "yuki" = snow
	6:"rei_plug.png"
}

const rei_eyes = {
	0:"normal_eye_00.png",
	1:"kanashi_eye_01.png",
}
const rei_mouth = {
	0:"normal_kuti_00.png",
	1:"kanashi_kuti_00.png"
}
const backgrounds = {
	99:"main_back_emergency.png", // Emergency
	
	0:"main_back_hare.png", // sunny (daytime)
	1:"main_back_yuugure.png", // sunny, (evening)
	2:"main_back_yoru.png", // clear, (nighttime)
		
	3:"main_back_kumori.png", // cloudy (daytime)
	4:"main_back_yuugure_kumori.png", // cloudy (evening)
	5:"main_back_yorukumori.png", // cloudy (nighttime)

	6:"main_back_ame.png", // rainy (daytime)
	7:"main_back_ame_yuugure.png", // rainy (Evening / Twilight)
	8:"main_back_yoruame.png", // rainy (nighttime)
		
}
const Enum_Background_Weather = {
	Sunny:0,
	Cloudy:3,
	Rainy:6,
	Snowy:6
}

const iconTranslationsImage = {
	"partly-cloudy-night": "eva_we22_0001.png",
	"partly-cloudy-day": "eva_we06_0001.png",
	"cloudy": "eva_we02_0001.png",
	"clear-night": "eva_we05_0001.png",
	"clear-day": "eva_we01_0001.png",
	"rain": "eva_we03_0001.png",
	"thunder-rain": "eva_we03_0001.png",
	"thunder-showers-day": "eva_we09_0001.png",
	"thunder-showers-night": "eva_we10_0001.png",
	"fog": "eva_we02_0001.png",
	"snow": "eva_we04_0001.png",
	"showers-day": "eva_we09_0001.png",
	"showers-night": "eva_we10_0001.png",
	"wind": "eva_we13_0001.png"
}
const iconTranslationsWeather = {
	"partly-cloudy-night": Enum_Weather.Cloudy,
	"partly-cloudy-day": Enum_Weather.Cloudy,
	"cloudy": Enum_Weather.Cloudy,
	"clear-night": Enum_Weather.Sunny,
	"clear-day": Enum_Weather.Sunny,
	"rain": Enum_Weather.Rain,
	"thunder-rain": Enum_Weather.Rain,
	"thunder-showers-day": Enum_Weather.Rain,
	"thunder-showers-night": Enum_Weather.Rain,
	"fog": Enum_Weather.Cloudy,
	"snow": Enum_Weather.Snow,
	"showers-day": Enum_Weather.Rain,
	"showers-night": Enum_Weather.Rain,
	"wind": Enum_Weather.Sunny,
}

var img_rei_body = document.getElementById("img_rei_body");
var img_rei_eye = document.getElementById("img_rei_eye");
var img_rei_mouth = document.getElementById("img_rei_mouth");
var img_background = document.getElementById("img_bg");
var img_foreground = document.getElementById("img_fg");

var img_weatherreportbg = document.getElementById("img_gui_weatherbox");


var flex_gui_weatherbox = document.getElementById("flex_gui_weatherbox");


function init_flex_gui_weatherbox()
{
	for (let i = 0; i<7; i++)
	{
		flex_gui_weatherbox.innerHTML += "<div><p1>test</p1><br><img src = \"assets/drawable/eva_we01_0001.png\" alt=\"HTML5\" id = \"icon\"></div>";
	}
}

init_flex_gui_weatherbox()

var weather = Enum_Weather.Sunny;
var temperature = Enum_Temperature.Normal;
var time = Enum_Time.Day;
var currentLocation = null;

updatingData = false;
nextupdateData = 0;

weather_forecast_days = {}
const daysOfWeek = {
	0:"Sun",
	1:"Mon",
	2:"Tue",
	3:"Wed",
	4:"Thu",
	5:"Fri",
	6:"Sat"
}
function update_flex_gui_weatherbox()
{
	const children = flex_gui_weatherbox.children;
	for (let i =0; i < children.length; i++)
	{
		var obj = children[i]
		const d = new Date(weather_forecast_days[i].datetime)
		obj.children[0].textContent = daysOfWeek[d.getDay()]//d.getDay() + "/" + d.getMonth();
		obj.children[2].src = "assets\\drawable\\" + iconTranslationsImage[weather_forecast_days[i].icon];
	}
}

function set_background(bg)
{
	img_background.src = "assets\\drawable\\" + backgrounds[bg]
}
function set_outfit(outfit)
{
	img_rei_body.src = "assets\\drawable\\" + rei_outfits[outfit]
}
function set_eye(eye)
{
	img_rei_eye.src = "assets\\drawable\\" + rei_eyes[eye]
}
function set_mouth(mouth)
{
	img_rei_mouth.src = "assets\\drawable\\" + rei_mouth[mouth]
}
function set_emotion(emote)
{
	set_eye(emote)
	set_mouth(emote)
}


function update_background()
{
	startWeather = Enum_Background_Weather.Sunny;
	if (weather == Enum_Weather.Sunny)
	{
		startWeather = Enum_Background_Weather.Sunny;
	}
	else if (weather == Enum_Weather.Cloudy)
	{
		startWeather= Enum_Background_Weather.Cloudy;
	}
	else if (weather == Enum_Weather.Rain)
	{
		startWeather= Enum_Background_Weather.Rainy;
	}
	else if (weather == Enum_Weather.Snow)
	{
		startWeather= Enum_Background_Weather.Cloudy;
	}
	else if (weather == Enum_Weather.HeavySnow)
	{
		startWeather= Enum_Background_Weather.Rainy;
	}
	else if (weather == Enum_Weather.Typhoon)
	{
		startWeather= Enum_Background_Weather.Rainy;
	}
	console.log("Selected background: " + startWeather + time)
	set_background(startWeather + time);
	
}

function update_rei() // Temporary
{
	if (weather == Enum_Weather.Sunny)
	{
		set_outfit(0);
		set_emotion(0)
		if (temperature == Enum_Temperature.Cold)
		{
			set_outfit(4);
		}
		else if (temperature == Enum_Temperature.Hot)
		{
			set_outfit(1);
		}
	}
	else if (weather == Enum_Weather.Cloudy)
	{
		set_outfit(2);
		set_emotion(0)
		if (temperature == Enum_Temperature.Cold)
		{
			set_outfit(4);
			set_emotion(0)
		}
	}
	else if (weather == Enum_Weather.Rain)
	{
		set_outfit(3);
		set_emotion(1)
	}
	else if (weather == Enum_Weather.Snow)
	{
		set_outfit(5);
		set_emotion(0)
	}
}

function update_time()
{
	var date = new Date();
	hours = date.getHours()
	//console.log("Current time 24/7: " + hours)
	


	if (hours>18)
	{
		time = Enum_Time.Night;
		return;
	}
	if (hours > 16)
	{
		time = Enum_Time.Evening;
		return;
	}
	if (hours>9)
	{
		time = Enum_Time.Day;
		return;
	}
	if (hours>5)
	{
		time = Enum_Time.Morning;
		return;
	}
	return;
}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function weather_forecast_box_set_visible(visible)
{
	var vis = visible ? 'visible' : 'hidden';
	img_gui_weatherbox.style.visible = vis;
	
}
function get_weather(glocation, date1, date2,apikey)
{
	if (apikey == null)
		apikey = "9AG8WWTG27V59J756BUFHYLUE";
	l = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + currentLocation + "?unitGroup=metric&key=9AG8WWTG27V59J756BUFHYLUE&contentType=json"
	httpGetAsync(l, function(responseText)
	{
		console.log(responseText)
		data = JSON.parse(responseText)
		weather_forecast_days = data.days
		day0Data = data.days[0]
		weather = Enum_Weather.Sunny
		//console.log("Check " + day0Data.icon)
		if (iconTranslationsWeather[day0Data.icon])
		{
			//console.log("Set Weather to " + day0Data.icon)
			weather = iconTranslationsWeather[day0Data.icon]
		}
		
		temperature = Enum_Temperature.Normal;
		if (day0Data.tempmin < 8.0)
		{
			temperature = Enum_Temperature.Cold;
		}
		if (day0Data.tempmax < 27.0)
		{
			temperature = Enum_Temperature.Hot;
		}
		updatingData = false;
		update_background();
		update_rei();
		update_flex_gui_weatherbox()

	})
}
function getLocation() {
  if (!navigator.geolocation) {
	  console.log("No geolocation!")
	  return;
  }
  navigator.geolocation.getCurrentPosition(set_location);
}
function set_location(loc)
{
	currentLocation =  loc.coords.latitude.toString() + "," + loc.coords.longitude.toString();
	console.log("Current location " + currentLocation)
}

current_fg_anime_id = 1;
current_fg_anime_id_2 = 0;
function foreground_animate()
{
	if (weather == Enum_Weather.Sunny || weather == Enum_Weather.Cloudy)
	{
		img_foreground.style.visibility = 'hidden';
		return;
	}
	img_foreground.style.visibility = 'visible';
	current_fg_anime_id = current_fg_anime_id + 1
	if (current_fg_anime_id > 2)
	{
		current_fg_anime_id = 1
		current_fg_anime_id_2 = current_fg_anime_id_2 + 1
		if (current_fg_anime_id_2 > 1)
			current_fg_anime_id_2 = 0
	}
	
	var src =  "assets\\drawable\\" + ((weather == Enum_Weather.Rain) ? "rain": "snow") + "_0" + current_fg_anime_id_2 +  "_" + current_fg_anime_id.toString() + ".png"
	img_foreground.src = src;
	
}
function update_stuff()
{
	foreground_animate()
	if (currentLocation == null)
	{
		return;
	}
	if (updatingData)
	{
		return;
	}
	date = new Date();
	if (Date.now() < nextupdateData)
		return;

	updatingData = true;
	nextupdateData = Date.now() + 600000
	console.log("Current time: " + date.now)
	console.log("Next update: " + nextupdateData)
	console.log(Date.now() - nextupdateData)
	//date = new Date();
	update_time();
	get_weather(currentLocation, Date.now(), Date.now()+ 604800000)
}
//update_time();
//getLocation()
getLocation();
update_background();
set_outfit(0);
set_eye(0);
set_mouth(0);


setInterval(update_stuff, 150)