# make a text-to-speech synthesis
from flask.templating import render_template
import gtts
from playsound import playsound
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():

    if request.method == 'POST':
        text = request.form['text']
        tts = gtts.gTTS(text=text, lang='en')
        tts.save('static/sound/result.mp3')
    # playsound("welcome.mp3")
        return render_template("index.html")
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)