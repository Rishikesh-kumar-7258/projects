from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Notes(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    heading = db.Column(db.String(200), nullable=False)
    desc = db.Column(db.String(500), nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"{self.sno}-{self.heading}"

@app.route("/", methods=['GET', 'POST'])
def mainPage():
    if request.method == 'POST':
        heading = request.form['heading']
        desc = request.form['desc']
        note = Notes(heading=heading, desc=desc)
        db.session.add(note)
        db.session.commit()
    
    AllNotes = Notes.query.all()
    return render_template('index.html', AllNotes=AllNotes)

@app.route("/delete/<int:sno>")
def delete(sno):
    note = Notes.query.filter_by(sno=sno).first()
    db.session.delete(note)
    db.session.commit()
    return redirect('/')

@app.route('/edit/<int:sno>', methods=['POST', 'GET'])
def edit(sno):
    if request.method == 'POST':
        note = Notes.query.filter_by(sno=sno).first()
        note.desc = request.form['desc']
        note.heading = request.form['heading']
        db.session.add(note)
        db.session.commit()
        return redirect('/')

    note = Notes.query.filter_by(sno=sno).first()
    return render_template('note.html', note=note)

def delete_all_data():
    notes = Notes.query.all()
    for note in notes:
        db.session.delete(note)
        db.session.commit()


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True, port=5000)