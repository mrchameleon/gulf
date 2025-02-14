const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// console.log(`Viewport width: ${viewportWidth}px`);
// console.log(`Viewport height: ${viewportHeight}px`);

// taken at zoom level 8
const gulf_lat = 25.2220721;
const gulf_lng = -90.064935;

// percent to cover w/ zoom level 8?
const APPROX_CENTER_LAT_POS = 46;
const APPROX_CENTER_LNG_POS = 46;

var overlay = document.createElement("div"); overlay.style.position = "fixed"; overlay.style.top = "0"; overlay.style.left = "0"; overlay.style.width = "100%"; overlay.style.height = "100%"; overlay.style.backgroundColor = "rgba(33, 34, 33, 0.0)"; overlay.style.zIndex = "100"; overlay.style.pointerEvents = "none"; document.body.appendChild(overlay);
var para = document.createElement("p");


var centered_tmp = "https://www.google.com/maps/@25.2220721,-90.064935,8z?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoASAFQAw%3D%3D";
if (window.location != centered_tmp) {
  window.location.replace(centered_tmp);
} else {
  overlay_init();
}


function overlay_init() {
  para.style.backgroundColor = "#72d4e8";
  para.style.width = "84px";
  //window.location.url = centered_tmp;
  para.style.position = "relative";

  // var mid_lat = viewportHeight / 2;
  // var mid_lng = viewportWidth / 2;

  // need a better formula to get starting position based on users current pos/center
  // lat, lng, zoom and
  para.style.left = APPROX_CENTER_LAT_POS + "%";
  para.style.top = APPROX_CENTER_LNG_POS + "%";
  para.style.verticalAlign = "center";
  para.style.marginLeft = "100% auto";
  para.style.marginRight = "100% auto";
  para.style.padding = "10px";
  para.style.margin = "4px";
  para.style.border = "1px solid black";
  para.style.color = "black";
  para.style.fontSize = "1.5em"
  para.style.textShadow = "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;";
  para.innerText = "Gulf of Mexico";
  overlay.appendChild(para);
}


const observeUrlChange = () => {
  let oldLoc = document.location.href;
  const body = document.querySelector('body');
  
  const observer = new MutationObserver(mutations => {
    if (oldLoc !== document.location.href) {
      oldLoc = document.location.href;
      console.log("oldHref: " + oldLoc)

      var newLoc = document.location.href;
      console.log("newHref: " + newLoc)
      var newLocFmt = newLoc.replace("https://www.google.com/maps/", "");
      newLocFmt = newLocFmt.substring(0, newLocFmt.indexOf("?entry="));
      var tmp = newLocFmt.split(",");
      var lat = Number(tmp[0].replace("@", ""));
      var lng = Number(tmp[1].replace("@", ""));
      var z = tmp[2].replace("z", "");
      
      //console.log("zoom level:", z);
      
      var left_pct = Number(para.style.left.replace("%",""));
      var top_pct = Number(para.style.top.replace("%",""));
  
      console.log(left_pct);
      console.log(top_pct);
      
      console.log("left_pct current", left_pct);
      console.log("top_pct current", top_pct);
      
      
      // try multipler
      // bigger % moves when zoom value is HIGHER
      // lower % moves when zoom value is LOWER.


      if (lat < gulf_lat) {
        console.log("panned south")
        var lat_delta = (gulf_lat - lat);
        console.log("lat_delta: (s)", lat_delta);
        para.style.top = (APPROX_CENTER_LAT_POS - lat_delta) + "%";
        console.log("SET top to ", (APPROX_CENTER_LAT_POS - lat_delta), "%");
        
      } else {
        console.log("panned north")
        var lat_delta = (lat - gulf_lat);
        console.log("lat_delta (n):", lat_delta);
        para.style.top = (APPROX_CENTER_LAT_POS + lat_delta) + "%";
        console.log("SET top to ", (APPROX_CENTER_LAT_POS + lat_delta), "%");
      }
  
      if (lng < gulf_lng) {
        console.log("panned west")
        var lng_delta = (Math.abs(lng) - Math.abs(gulf_lng));
        console.log("lng_delta (w)", lng_delta);
        para.style.left = (APPROX_CENTER_LNG_POS + lng_delta) + "%";
        console.log("SET left to ", (APPROX_CENTER_LNG_POS + lng_delta), "%");
      } else {
        console.log("panned east")
        var lng_delta = (Math.abs(gulf_lng) - Math.abs(lng)) ;
        console.log("lng_delta (e))", lng_delta);
        para.style.left = (APPROX_CENTER_LNG_POS - lng_delta) + "%";
        console.log("SET left to ", (APPROX_CENTER_LNG_POS - lng_delta), "%");
      }


    }
  


  });
  observer.observe(body, { childList: true, subtree: true });
};

//window.onload = observeUrlChange;
observeUrlChange();