# make a text-to-speech synthesis
from flask.templating import render_template
import gtts
from playsound import playsound
from flask import Flask, request
from werkzeug.utils import redirect

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():

    if request.method == 'POST':
        text = request.form['text']
        tts = gtts.gTTS(text=text, lang='hi')
        tts.save('static/sound/result.mp3')

        return redirect("/playSound")

    else:
        return render_template("index.html")
    
@app.route('/playSound')
def playSound():

    return render_template('playSound.html')

if __name__ == '__main__':
    app.run(debug=True)