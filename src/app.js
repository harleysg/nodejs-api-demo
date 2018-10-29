((w, d) => {
    let elmbtnSend = d.getElementById('sendData')
    queryGetAllData();

    elmbtnSend.addEventListener('click', sendData);

})(window, document);

function sendData(e) {
    e.preventDefault();
    let elmWordValue = document.getElementById('newWord').value
    let elmScoreValue = document.getElementById('newScore').value

    queryAddData(elmWordValue, elmScoreValue)
}
function queryAddData(wordValue, scoreValue) {
    fetch(`add/${wordValue}/${scoreValue}`, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => res.json())
        .then((data) => responServer(data))
        .catch(err => console.error(err));
}
function responServer(data) {
    let { status } = data;
    /**
     * @param String
    */
    modalMessage(status);
    document.getElementById('newWord').value = ''
    document.getElementById('newScore').value = ''
}
function modalMessage(message) {
    /**
     * @param String
    */
    let modalResponse = document.createElement('div');
    let modalContent = document.createElement('div');
    modalResponse.classList.add('o-modal');
    modalContent.classList.add('o-modal__content');
    modalContent.textContent = message;
    modalResponse.appendChild(modalContent);
    document.getElementById('app').appendChild(modalResponse);

    setTimeout(() => {
        document.getElementById('app').removeChild(modalResponse);
        location.reload();
    }, 750);
}
function queryGetAllData() {
    fetch('all', { headers: { 'Content-Type': 'application/json' } })
        .then((res) => res.json())
        .then((data) => drawData(data))
        .catch(err => console.error(err));
}
function drawData(objData) {
    let keys = valuesToArray(objData);
    let ulElm = createListElm('ul', 'li', ['c-list', 'c-list__item'], keys);
    document.getElementById('elmDataList').appendChild(ulElm)
}
function createListElm(parent, child, arrClasses, arrOptions) {
    let [classParent, classChild] = arrClasses;
    let parentElm = document.createElement(parent);
    parentElm.classList.add(classParent)
    arrOptions.map(option => {
        let childElm = document.createElement(child);
        childElm.classList.add(classChild)
        if (Array.isArray(option)) {
            option.map(opt => {
                let spanElm = document.createElement('span');
                spanElm.textContent = opt;
                childElm.appendChild(spanElm)
            })
        } else {
            childElm.textContent = option;
        }
        parentElm.appendChild(childElm);
    })
    return parentElm;
}
function valuesToArray(obj) {
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            return obj;
        } else {
            return Object.keys(obj).map(function (key) {
                return [key, obj[key]];
            });
        }
    }
    else {
        return { mns: "your params isn't a Object or Array" }
    }
}