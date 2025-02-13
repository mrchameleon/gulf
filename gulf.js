const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// console.log(`Viewport width: ${viewportWidth}px`);
// console.log(`Viewport height: ${viewportHeight}px`);

const gulf_lat = 26.0;
const gulf_lng = -88.7;


var overlay = document.createElement("div"); overlay.style.position = "fixed"; overlay.style.top = "0"; overlay.style.left = "0"; overlay.style.width = "100%"; overlay.style.height = "100%"; overlay.style.backgroundColor = "rgba(33, 34, 33, 0.0)"; overlay.style.zIndex = "100"; overlay.style.pointerEvents = "none"; document.body.appendChild(overlay);
var para = document.createElement("p");


var centered_tmp = "https://www.google.com/maps/@25.9924091,-91.4927232,5z?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoASAFQAw%3D%3D";
if (window.location != centered_tmp) {
  window.location.replace(centered_tmp);
} else {
  overlay_init();
}


function overlay_init() {
  para.style.backgroundColor = "#65CFE4";
  para.style.width = "84px";
  //window.location.url = centered_tmp;
  para.style.position = "relative";

  // var mid_lat = viewportHeight / 2;
  // var mid_lng = viewportWidth / 2;

  // need a better formula to get starting position based on users current pos/center
  // lat, lng, zoom and
  para.style.left = "48%";
  para.style.top = "50%";
  para.style.verticalAlign = "center";
  para.style.marginLeft = "100% auto";
  para.style.marginRight = "100% auto";
  para.style.padding = "10px";
  para.style.margin = "4px";
  para.style.border = "2px solid black;"
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
      
  
      if (lat < gulf_lat) {
        console.log("panned south")
        var lat_delta = (gulf_lat - lat);
        console.log("lat_delta: (s)", lat_delta);
        para.style.top = (48 - lat_delta) + "%";
        console.log("SET top to ", (48 - lat_delta), "%");
        
      } else {
        console.log("panned north")
        var lat_delta = (lat - gulf_lat);
        console.log("lat_delta (n):", lat_delta);
        para.style.top = (48 + lat_delta) + "%";
        console.log("SET top to ", (48 + lat_delta), "%");
      }
  
      if (lng < gulf_lng) {
        console.log("panned west")
        var lng_delta = (Math.abs(lng) - Math.abs(gulf_lng)) ;
        console.log("lng_delta (w)", lng_delta);
        para.style.left = (50 + lng_delta) + "%";
        console.log("SET left to ", (50 - lng_delta), "%");
      } else {
        console.log("panned east")
        var lng_delta = (Math.abs(gulf_lng) - Math.abs(lng)) ;
        console.log("lng_delta (e))", lng_delta);
        para.style.left = (50 + lng_delta) + "%";
        console.log("SET left to ", (50 - lng_delta), "%");
      }


    }
  


  });
  observer.observe(body, { childList: true, subtree: true });
};

//window.onload = observeUrlChange;
observeUrlChange();