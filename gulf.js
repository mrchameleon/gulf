var overlay = document.createElement("div"); overlay.style.position = "fixed"; overlay.style.top = "0"; overlay.style.left = "0"; overlay.style.width = "100%"; overlay.style.height = "100%"; overlay.style.backgroundColor = "rgba(33, 34, 33, 0.0)"; overlay.style.zIndex = "100"; overlay.style.pointerEvents = "none"; document.body.appendChild(overlay);
const para = document.createElement("p");
para.style.backgroundColor = "#000000";
para.style.width = "70px";
para.style.position = "relative";
para.style.left = "46%";
para.style.top = "50%";
para.style.color = "limegreen";
para.innerText = "GULF OF MEXICO";
overlay.appendChild(para);


const observeUrlChange = () => {
  let oldHref = document.location.href;
  const body = document.querySelector('body');
  const observer = new MutationObserver(mutations => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      // process URL change - parse URL
      // determine loc of gulf label relative to user's scroll loc
      // look at zoom level increments -- where label needs to be
      // look at top right/left bottom left/right extremities -- where label needs to be
      // build dict of rough placements based on moving coords as input -> label position as output..
      // lat long corners math TBD
      // 
      // determine position to relocate to

      // relocate label
    }
  });
  observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;
