if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {
        scope: './'
    }).then(reg => {
        if (reg.installing) {
            console.log('Service worker installing');
        } else if (reg.waiting) {
            console.log('Service worker installed');
        } else if (reg.active) {
            console.log('Service worker active');
        }
    }).catch(e => {
        console.log('Registration failed with ' + e);
    });
}

/* 
 * Fetch data */
function fetchData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const resource = document.getElementById('resource-list');
            createListItem(resource, data.resource);

            const latest = document.getElementById('latest-article');
            createListItem(latest, data.latest);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

/*
 * Render data */
function createListItem(container, list) {
    list.forEach(item => {
        const section = document.createElement('li');

        const title = document.createElement('h3');
        title.textContent = item.title;
        section.appendChild(title);
        
        const link = document.createElement('a');
        link.href = item.link;

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        link.appendChild(image);
        section.appendChild(link);

        if(item.desc) {
            const description = document.createElement('p');
            description.textContent = item.desc;
            section.appendChild(description);
        }
        
        const button = document.createElement('button');
        button.textContent = '分享給朋友';
        button.onclick = function() {
            shareUrl(item.title, item.link);
        };
        section.appendChild(button);

        container.appendChild(section);
    });
}

fetchData();

// 把api部屬到一個地方
// 新文章通知開啟與關閉

/*
 * ShareUrl  */
async function shareUrl(text, url) {
    try {
        await navigator.share({
            text: text,
            url: url,
        });
    } catch (e) {
        console.error(e);
    }
}