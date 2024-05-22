const createEditor = () => {
    const html = `
    <div id="editor_kkkkk">
        <div id="content" contenteditable="true"></div>
    </div>
    `;

    document.querySelector('body').insertAdjacentHTML('beforeend', html)
}