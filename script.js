const charts = document.querySelectorAll(".charts");
const iceberg_chart = document.getElementById("iceberg_chart");
iceberg_chart.addEventListener("contextmenu", (e) => e.preventDefault());
const adding_chart = document.getElementById("adding_chart");
var tempNav;

charts.forEach((chart) => {
  chart.addEventListener("mousedown", chartRightClick);
});

function chartRightClick(e) {
  if (e.button === 2) {
    //var chartPos = this.getBoundingClientRect();
    if (tempNav === undefined) {
      console.log(this);
      tempNav = document.createElement("div");
      tempNav.style.position = "absolute";
      tempNav.style.left = e.pageX + "px";
      tempNav.style.top = e.pageY + "px";

      var section_chart = this.parentElement;

      var innerScreenX = e.pageX;
      var innerScreenY = e.pageY;

      const addBtn = document.createElement("button");
      addBtn.textContent = "Add A Chart";
      addBtn.addEventListener("click", () => {
        enterEditor(section_chart, innerScreenX, innerScreenY)
      });
      tempNav.append(addBtn);
      section_chart.appendChild(tempNav);
    } else {
      tempNav.style.left = e.pageX + "px";
      tempNav.style.top = e.pageY + "px";
    }
  } else if (e.button == 0) {
    if (tempNav != undefined) {
      tempNav.remove();
      tempNav = undefined;
    }
  }
}

function enterEditor(currentLayer, xClick, yClick) {
  adding_chart.style.display = "flex";
  document.body.style.overflowY = "hidden";
  document.getElementById("text_chart").value = "";
  document.getElementById("link_chart").value = "";
  tempNav.remove();
  tempNav = undefined;

  document.getElementById("submit_input").onclick = () =>
    appendChart(currentLayer, xClick, yClick);
  document.getElementById("exitBtn").onclick = () => exitEditor();
}

function exitEditor() {
  adding_chart.style.display = "none";
  document.body.style.overflowY = "scroll";
}

const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

function rightClickToRemove(e) {
  if (e.button === 2) {
    this.remove();
  }
}

function appendChart(chart, x, y) {
  const text = document.getElementById("text_chart").value;
  if (text == "") return exitEditor();

  const link = isValidUrl(document.getElementById("link_chart").value)
    ? document.getElementById("link_chart").value
    : "";
  const radioButtons = [
    document.getElementById("sfw_radio"),
    document.getElementById("nsfw_radio"),
    document.getElementById("nsfl_radio"),
  ];
  const selectedWarning = radioButtons.find((button) => button.checked).value;
  const container = document.createElement("div");
  //var containerBounding = container.getBoundingClientRect();
  container.style.position = "absolute";
  container.style.left = x + "px";
  container.style.top = y + "px";
  container.addEventListener("mousedown", rightClickToRemove);
  var element;

  if (link != "") {
    element = document.createElement("a");
    element.setAttribute("href", link);
    element.setAttribute("target", "_blank");
  } else {
    element = document.createElement("p");
  }

  element.textContent = text;
  element.title = text;
  element.style.textTransform = "uppercase";
  element.style.color = "white";

  var sup = document.createElement("sup");
  sup.textContent = selectedWarning;
  var supColor;
  switch (selectedWarning) {
    case "SFW":
      supColor = "blue";
      sup.title = "content is consider family friendly. and do not disturbing/shocking at all.";
      break;
    case "NSFW":
      supColor = "#EE204D";
      sup.title = "content that is considered disturbing, watch at your own risk!";
      break;
    case "NSFL":
      supColor = "crimson";
      sup.title = "content that is considered very disturbing and shocking to all audience, DO NOT recommending searching this term in the internet at all cost!";
      break;
  }

  sup.style.color = supColor;

  element.appendChild(sup);

  container.appendChild(element);

  chart.appendChild(container);
  exitEditor();
}

exitBtn.addEventListener("click", exitEditor);
