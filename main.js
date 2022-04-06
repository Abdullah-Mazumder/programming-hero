// global variables
const milestonesData = JSON.parse(data).data;
const milestonesList = document.querySelector('.milestones');
const doneList = document.querySelector('.doneList');
let arrowUpDown;

// load course milestones data
function loadMilestones() {
    const milestones = document.querySelector(".milestones");

    milestones.innerHTML = `${milestonesData
        .map(function (milestone) {
            return `<div class="milestone border-b" id='${milestone._id}'>
                        <div class="flex">
                            <div class="checkbox"><input type="checkbox" onclick='markMileStone(this, ${milestone._id})'/></div>
                            <div onclick="openMilestone(this, ${milestone._id})">
                                <p>
                                    ${milestone.name}
                                    <span><i class="fa fa-chevron-down"></i></span>
                                </p>
                            </div>
                        </div>
                        <div class="hidden_panel">
                            ${milestone.modules.map(function (module) {
                return `<div class="module border-b">
                            <p>${module.name}</p>
                        </div>`;
            }).join("")}
                        </div>
                    </div>`;
        }).join("")}`;
}

function openMilestone(milestoneElement, id) {
    const currentPanel = milestoneElement.parentNode.nextElementSibling;
    const shownPanel = document.querySelector(".show");
    const active = document.querySelector(".active");
    arrowUpDown = milestoneElement.children[0].children[0].children[0].classList;

    // first hide previous panel if open [other than the clicked element]
    if (!currentPanel.classList.contains("show") && shownPanel) {
        shownPanel.classList.remove("show");

        // toggle arrowup and arrow down icon
        let arrowUp = document.querySelector(".fa-chevron-up");
        arrowUp.classList.remove("fa-chevron-up");
        arrowUp.classList.add("fa-chevron-down");
    }

    // toggle current element
    currentPanel.classList.toggle("show");

    // first remove previous active class if any [other than the clicked one]
    if (!milestoneElement.classList.contains("active") && active) {
        active.classList.remove("active");
    }

    // toggle current clicked one
    milestoneElement.classList.toggle("active");

    // toggle arrowup and arrow down icon
    arrowUpDown.toggle('fa-chevron-down');
    arrowUpDown.toggle('fa-chevron-up');

    showMileStone(id);
}

function showMileStone(id) {
    const mileStoneImage = document.querySelector(".milestoneImage");
    const title = document.querySelector(".title");
    const details = document.querySelector(".details");

    mileStoneImage.style.opacity = '0';
    mileStoneImage.src = milestonesData[id].image;
    title.innerText = milestonesData[id].name;
    details.innerText = milestonesData[id].description;
}

// listen for hero image load
const mileStoneImage = document.querySelector(".milestoneImage");
mileStoneImage.onload = function () {
    this.style.opacity = '1';
}

function markMileStone(checkbox, id) {
    const item = document.getElementById(id);

    if (checkbox.checked) {
        // mark as done
        milestonesList.removeChild(item);
        doneList.appendChild(item);
        item.classList.remove('milestone');
        item.classList.add('doneitem');

        //load doneList after sorting
        reloadDoneList();
    } else {
        // back to main list
        doneList.removeChild(item);
        milestonesList.appendChild(item);
        item.classList.add('milestone');
        item.classList.remove('doneitem');

        //load milestonesList after sorting
        reloadMilestonesList();
    }
}

function reloadDoneList() {
    const doneItem = document.querySelectorAll(".doneitem");
    const doneItemArray = [...doneItem];
    //get all sorted done item
    const sortedDoneItemArray = doneItemArray.sort((item1, item2) => {
        return item1.id - item2.id;
    });
    //reload the donelist
    sortedDoneItemArray.forEach(function (item) {
        doneList.appendChild(item);
    });
}

function reloadMilestonesList() {
    const allMileStoneItem = document.querySelectorAll('.milestone');
    const milestonesListArry = [...allMileStoneItem];
    //get all sorted milestone
    const sortedMilestonesListArry = milestonesListArry.sort((item1, item2) => {
        return item1.id - item2.id;
    });
    //reload the milestones
    sortedMilestonesListArry.forEach(function (item) {
        milestonesList.appendChild(item);
    });
}

loadMilestones();