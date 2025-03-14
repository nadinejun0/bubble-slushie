function saveDropZone() {
    const dropZone = document.getElementById('drop-zone');

    if (!dropZone || dropZone.children.length === 0) {
        alert("There's nothing to save!");
        return;
    }

    html2canvas(dropZone, {
        backgroundColor: null, // Keeps transparency
        useCORS: true // Ensures cross-origin images work if applicable
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = 'nailz-design.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(err => {
        console.error("Error capturing the drop zone:", err);
    });
}