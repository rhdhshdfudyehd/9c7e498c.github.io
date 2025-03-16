
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.getDown');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', handleDownload);
    });
});

async function handleDownload(event) {
    event.preventDefault();
    try {
        const webhostResponse = await fetch('https://down.kuailian.vn/goto/web/');
        const webhostData = await webhostResponse.json();
        const webhost = webhostData.webhost;
        
        const downloadUrl = 'https://' + webhost + '/goto/?id=58';
        
        const downloadResponse = await fetch(downloadUrl);
        const downloadData = await downloadResponse.json();
        const finalDownloadUrl = downloadData.download_url;
        
        downloadFile(finalDownloadUrl);
        
    } catch (error) {
        console.error('下载过程中出现错误:', error);
        alert('下载失败，请稍后重试');
    }
}

function downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
        