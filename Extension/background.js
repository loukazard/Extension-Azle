const userId = 31832587;
const clientId = 'yhzlcdma7nr0uobpps60qib1wbhsyz';
const token = 'nklxkrfw88ydim2q2we3ls0a482pqt';

const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
const twitchUrl = "https://www.twitch.tv/azletv";
const headers = {
    'Authorization': `Bearer ${token}`,
    'Client-ID': clientId
}

let isLive = false; 

const cb = (json) => {
    if (json.data.length && !isLive) {
        setIcon('images/live_on.png');
        chrome.notifications.create('LiveOn', {
            title: 'Azle est en live !',
            iconUrl: 'images/notif.png',
            message: 'Azle a lancé un stream alors clique et rejoins !',
            type: 'basic',
        });
        isLive = true;
    } else if (!json.data.length && isLive) {
        setIcon('images/live_off.png');
        isLive = false;
    }
}



function fetchTwitchAPI(url, headers, cb) {
    fetch(url, {
        headers: headers
    }).then((response) => {
        return response.json();
    }).then((json) => cb(json));
}

function setIcon(path) {
    chrome.action.setIcon({ path: path });
}



chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({
        url: twitchUrl
    })
});

chrome.alarms.create({ periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(() => {
    fetchTwitchAPI(url, headers, cb);
});

