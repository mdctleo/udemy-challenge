from flask import Flask, request, jsonify
import logging
from logging import FileHandler, Formatter

from flask_cors import CORS

from src.exceptions import BaseExceptionSchema, InvalidResponsesException, QuizNotFoundException
from src.validator import Validator
from pymongo import MongoClient
from src.database import Database
from src import config

# Connect to database and start a Flask app
client = MongoClient()
db = Database(client['quiz_database'])
db.restore_default_db()

app = Flask(__name__)
app.config.from_object(config)

# TODO: remove cors
# CORS(app, origins="http://localhost:3000", supports_credentials=True)


@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    """ Gets requested Quiz

    :param id: Quiz id
    :return: A json representation of a Quiz class
    :rtype: str
    :exception QuizNotFoundException: Thrown when getting a quiz that does not exist in the database
    """
    if request.method == 'GET':
        try:
            id = request.args.get('_id')
            mquiz = db.get_quiz(id)
            if mquiz is None:
                e = QuizNotFoundException()
                app.logger.error(str(e))
                return BaseExceptionSchema().dump(e), 400
            return jsonify(mquiz), 200
        except Exception as e:
            app.logger.error(str(e))
            return BaseExceptionSchema().dump(e), 500
    elif request.method == 'POST':
        """ Posts requested quiz
        :param _id: Quiz id
        :type _id: str
        :param responses: An array of string representing user choices
        :type responses: List
        :return result: Score user achieved on the quiz
        :rtype result: str
        :exception QuizNotFoundException: Thrown when submitting responses for a quiz that does not exist
        :exception InvalidResponsesException: Thrown when responses have invalid structures or at least one response
        does not exist in the options
        """
        try:
            id = request.get_json()['_id']
            responses = request.get_json()['responses']
            quiz = db.get_quiz_internal(id)
            if quiz is None:
                e = QuizNotFoundException()
                app.logger.error(str(e))
                return BaseExceptionSchema().dump(e), 400
            validator = Validator(quiz, responses)
            if validator.validate():
                db.insert_quiz_response(id, responses, validator.get_result)
                return jsonify(validator.get_result), 200
            else:
                e = InvalidResponsesException()
                app.logger.error(str(e))
                return BaseExceptionSchema().dump(e), 400
        except Exception as e:
            app.logger.error(str(e))
            return BaseExceptionSchema().dump(e), 500


if not app.debug:
    file_handler = FileHandler('error.log')
    file_handler.setFormatter(
        Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
    )
    app.logger.setLevel(logging.INFO)
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.info('errors')

# ----------------------------------------------------------------------------#
# Launch.
# ----------------------------------------------------------------------------#

# Default port:
if __name__ == '__main__':
    app.run()

# Or specify port manually:
'''
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
'''






