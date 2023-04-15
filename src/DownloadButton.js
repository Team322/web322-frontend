function DownloadButton({url, download}) {
    const downloadFile = () => {
      const anchor = document.createElement('a');
      anchor.href = url + download;
      anchor.download = download;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };
  
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={downloadFile}
      >
        Download File
      </button>
    );
  }

export default DownloadButton;