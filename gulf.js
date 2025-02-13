const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

console.log(`Viewport width: ${viewportWidth}px`);
console.log(`Viewport height: ${viewportHeight}px`);

var overlay = document.createElement("div"); overlay.style.position = "fixed"; overlay.style.top = "0"; overlay.style.left = "0"; overlay.style.width = "100%"; overlay.style.height = "100%"; overlay.style.backgroundColor = "rgba(33, 34, 33, 0.0)"; overlay.style.zIndex = "100"; overlay.style.pointerEvents = "none"; document.body.appendChild(overlay);
const para = document.createElement("p");
para.style.backgroundColor = "#000000";
para.style.width = "84px";


para.style.position = "relative";

var mid_lat = viewportHeight / 2;
var mid_lng = viewportWidth / 2;

para.style.left = mid_lng + "px";
para.style.top = mid_lat + "px";

para.style.color = "limegreen";
para.innerText = "GULF OF MEXICO";
overlay.appendChild(para);


var gulf_lat = 26.0;
var gulf_lng = -88.7;

const observeUrlChange = () => {
  let oldLoc = document.location.href;
  const body = document.querySelector('body');
  
  const observer = new MutationObserver(mutations => {
    if (oldLoc !== document.location.href) {
      oldLoc = document.location.href;

      console.log("oldHref: " + oldLoc)

      // determine loc of gulf label relative to user's scroll loc
      // look at zoom level increments -- where label needs to be
      // look at top right/left bottom left/right extremities -- where label needs to be
      // build dict of rough placements based on moving coords as input -> label position as output..

      // lat long corners math TBD 
      // determine position to relocate to

      // relocate label
    }
    var newLoc = document.location.href;
    console.log("newHref: " + newLoc)
    var newLocFmt = newLoc.replace("https://www.google.com/maps/", "");
    newLocFmt = newLocFmt.substring(0, newLocFmt.indexOf("?entry="));
    var tmp = newLocFmt.split(",");
    var lat = Number(tmp[0].replace("@", ""));
    var lng = Number(tmp[1].replace("@", ""));
    var z = tmp[2].replace("z", "");
    
    //console.log("zoom level:", z);
    
    var left_px = Number(para.style.left.replace("px",""));
    var top_px = Number(para.style.top.replace("px",""));

    console.log(left_px);
    console.log(top_px);
    

    console.log("left_px current", lat);
    console.log("top_px current", gulf_lat);
    

    if (lat < gulf_lat) {
      console.log("panned south")
      var lat_dist_moved = gulf_lat - lat;
      var new_top = Number(para.style.top.replace("px","")) + new_top;  // increasing top moves SOUTH?
      console.log("new_top px", new_top);
      para.style.top = new_top + "px";
      
    } else {
      console.log("panned north")
      var lat_dist_moved = gulf_lat - lat;
      var new_top = Number(para.style.top.replace("px", "")) - new_top;  // descreasing top moves NORTH?
      console.log("new_top px", new_top);
      para.style.top = new_top + "px";
    }

    if (lng < gulf_lng) {
      console.log("panned west")
      var lng_dist_moved = Math.abs(lng) - Math.abs(gulf_lng);
      var new_left = Number(para.style.left.replace("px","")) + lng_dist_moved; // increase moves the label EAST?
      console.log("new_left px", new_top);
      para.style.left = new_left + "px";
    } else {
      console.log("panned east")
      var lng_dist_moved = Math.abs(gulf_lng) - Math.abs(lng);
      var new_left = Number(para.style.left.replace("px","")) - new_left;  // dec moves the label WEST?
      console.log("new_left px", new_top);
      para.style.left = new_left + "px";
    }

    // zoom + lookup table here?


  });
  observer.observe(body, { childList: true, subtree: true });
};

//window.onload = observeUrlChange;
observeUrlChange();