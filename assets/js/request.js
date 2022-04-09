const BASE_URL = "https://api.github.com/users/";

const fullname = document.querySelector('.card__center h1');
const userName = document.querySelector('.card__center h2 a');
const repository = document.querySelector('.extra__info--repositories span');
const followingUser = document.querySelector('.extra__info--following span');
const follower = document.querySelector('.extra__info--follower span');
const avatar = document.querySelector('.card__left');
let search = document.querySelector('.search__input');
let searchIcon = document.querySelector('.search__button--submit');



const GetInfoUser = () => {
    if (!search.value) {
        HideCard();
        ShowToast("Input can not be empty");
        return;
    }
    else {
        let url = `${BASE_URL + search.value}`;
        fetch(url, { method: "GET" })
            .then((response) => {
                let clone = response.clone();
                if (clone.status == 403) {
                    HideCard();
                    ShowToast("Access Denied");
                    return;
                }
                if (clone.status == 404) {
                    HideCard();
                    ShowToast("User Not Found");
                    return;
                }
                return response.json();

            }).then(data => {
                SetUser(data)
                console.log(data)
            });
    }

}

function SetUser({ name, avatar_url, public_repos, followers, following, login }) {
    ShowCard();
    fullname.textContent = name;
    follower.textContent = followers;
    followingUser.textContent = following;
    repository.textContent = public_repos;
    console.log(avatar);
    avatar.style.background = `url(${avatar_url}) no-repeat center center`;
    avatar.style.backgroundSize = "cover";
    userName.innerHTML = `@${login}`;
    userName.href = `https:/github.com/${login}`;
}

function ShowToast(messaage) {
    let toast = document.querySelector(".toast");
    let toastMessage = document.querySelector(".toast__message");
    toastMessage.innerHTML = messaage;
    toast.classList.add('show')
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 5000);
}

function HideCard() {
    document.querySelector('.card').style.display = "none";
}
function ShowCard() {
    document.querySelector('.card').style.display = "flex";
}


// close onclick outside
document.addEventListener('click', (e) => {
    const toggle = document.querySelector('.search__toggle');
    const input = document.querySelector('.search__input');
    const clickedElement = e.target;

    if (clickedElement == toggle) {
        console.log(e);
        input.value = '';
        return;
    }

    const isSearchField = clickedElement.closest('.search__field')
    console.log(input.value);
    if (!isSearchField) {
        console.log("shshsh");
        toggle.checked = false;
        input.value = '';
    }
});
document.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        ShowToast("Please Select Search Icon");
        HideCard();
    }
})
