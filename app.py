# -*- coding: utf-8 -*-
"""
    GPSIPP
    ~~~~~~

    GPS - Igreja Presbiteriana de Paulinia

    :copyright: (c) 2018 by Diego Rubin.
    :license: BSD, see LICENSE for more details.
"""
import os

import random
from database import db_session
from flask import Flask, render_template, send_from_directory
from flask_jwt import JWT

ASSET = random.random()
STATIC_FOLDER = 'public'
app = Flask(__name__, static_folder=STATIC_FOLDER)

app.config.update(dict(
    DEBUG=True,
    SECRET_KEY='development key',
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

from users.gateways.http import users_controller
from users.usecases.login import authenticate, identity

app.register_blueprint(users_controller.mod)
jwt = JWT(app, authenticate, identity)

@app.route('/')
def root():
    return render_template('index.html', asset=ASSET)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory(STATIC_FOLDER + '/js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory(STATIC_FOLDER + '/css', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory(STATIC_FOLDER + '/images', path)

@app.route('/partials/<path:path>')
def send_partials(path):
    return send_from_directory(STATIC_FOLDER + '/partials', path)

@app.teardown_appcontext
def shutdown_session(expection=None):
    db_session.remove()

if __name__ == '__main__':
    app.run()

