from flask import Flask, render_template, request
from pytube import YouTube
import os
from pathlib import Path

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download')
def download():
    url = request.args.get('urlPath')
    path = request.args.get('savePath')
    # print(url, path, fileName)
    DownloadVideo(url, path)
    # print(request.args.get('urlPath'))
    return "Downloading..."
    

def DownloadVideo(url, path):
    
    yt = YouTube(url)
    
    # print(yt)
    stream = yt.streams.get_highest_resolution()

    # if path == "" or path == None:
    path = str(os.path.join(Path.home(), "Downloads"))
    print(path)
    
    try:
        stream.download(path)
    except:
        print("Connection Error")
        return

if __name__ == '__main__':
    app.run(debug=True)