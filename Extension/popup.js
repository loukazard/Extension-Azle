const userId = 31832587;
const clientId = 'yhzlcdma7nr0uobpps60qib1wbhsyz';
const token = 'nklxkrfw88ydim2q2we3ls0a482pqt';

const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
const twitchUrl = "https://www.twitch.tv/azletv";
const headers = {
    'Authorization': `Bearer ${token}`,
    'Client-ID': clientId
}

const info = document.getElementById('info');

const cb = function (json) {
    info.innerHTML = json.data.length ? "Azle est en live !" : "Azle ne stream pas pour le moment :(";
}

function fetchTwitchAPI(url, headers, cb) {
    fetch(url, {
        headers: headers
    }).then((response) => {
        return response.json();
    }).then((json) => cb(json));
}



fetchTwitchAPI(url, headers, cb);
