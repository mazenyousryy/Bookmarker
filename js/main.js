var websiteName = document.getElementById("bookmark-site-name");
var websiteUrl = document.getElementById("bookmark-site-url");

var submitBtn = document.getElementById("btn-submit");

var websitesList;

var flag = true;

if (localStorage.getItem("websiteBookmark") === null) {
    websitesList = [];
} else {
    websitesList = JSON.parse(localStorage.getItem("websiteBookmark"));
    display_websites(websitesList);
}

function add_website() {
    var websiteObj = {
        website_name: websiteName.value,
        website_url: websiteUrl.value,
    };

    if (!websiteObj["website_url"].includes("https://")) {
        websiteObj.website_url = "https://" + websiteObj.website_url;
    }

    if (websiteName.classList.contains("is-invalid") || websiteUrl.classList.contains("is-invalid") || websiteName.value == "" || websiteUrl.value == "") {
        document.getElementById("box-overlay").classList.replace("d-none", "d-block");
    } else {
        websitesList.push(websiteObj);
        localStorage.setItem("websiteBookmark", JSON.stringify(websitesList));
        display_websites(websitesList);
        clear_inputs();
    }
}

function clear_inputs() {
    websiteName.value = "";
    websiteUrl.value = "";
    websiteUrl.classList.remove("is-valid");
    websiteName.classList.remove("is-valid");
}

function display_websites(list) {
    var website = "";

    for (var i = 0; i < list.length; i++) {
        website += `
                        <tr class="align-items-center">
                            <td>${i + 1}</td>
                            <td>${list[i].website_name}</td>
                            <td>
                            <a class="text-decoration-none text-white" href="${list[i].website_url}" target="_blank">
                            <button class="btn btn-success">
                            <i class="fa-solid fa-eye text-white"></i> 
                            Visit
                            </button>
                            </a>
                            </td>
                            <td><button class="btn btn-danger" onclick="delete_website(${i})"><i class="fa-solid fa-trash-can text-white" ></i> Delete</button></td>
                        </tr>
    `;
    }

    var tableContent = document.getElementById("table-content");
    tableContent.innerHTML = website;
}

function delete_website(index) {
    websitesList.splice(index, 1);
    display_websites(websitesList);
    localStorage.setItem("websiteBookmark", JSON.stringify(websitesList));
}

function validate_website_name() {
    var regex = /^.{3,}$/;

    if (regex.test(websiteName.value)) {
        websiteName.classList.replace("is-invalid", "is-valid");
    } else {
        websiteName.classList.add("is-invalid");
    }
}

function validate_website_url() {
    var regex = /^[^\s]+(\.[^\s][a-zA-Z]{1,})+$/;

    if (regex.test(websiteUrl.value)) {
        websiteUrl.classList.replace("is-invalid", "is-valid");
    } else {
        websiteUrl.classList.add("is-invalid");
    }
}

function exit() {
    document.getElementById("box-overlay").classList.replace("d-block", "d-none");
}
