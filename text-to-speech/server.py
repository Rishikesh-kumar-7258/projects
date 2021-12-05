# make a text-to-speech synthesis
from flask.templating import render_template
import gtts
from playsound import playsound
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    t1 = gtts.gTTS("Hello Abhigyan, How are you? Have you eaten? How is everyone in house?")
    t1.save("static/welcome2.mp3")
    # playsound("welcome.mp3")
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)