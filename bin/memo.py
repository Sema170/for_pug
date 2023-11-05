from flask import Flask, render_template
import os
import random
import json

app = Flask(__name__)


@app.route("/")
def index():
    pugList = os.listdir("C:/python/memoProject/bin/static/pug")
    shortPugList = []
    for i in range(8):
        shortPugList.append(pugList.pop(random.randrange(0, len(pugList))))
    print(shortPugList)
    return render_template("memo.html", pugJson=json.dumps(shortPugList))
