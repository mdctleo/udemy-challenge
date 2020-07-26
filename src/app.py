from flask import Flask, request, jsonify
import logging
from logging import FileHandler, Formatter
from src.Exceptions import BaseExceptionSchema, InvalidResponsesException, QuizNotFoundException
from src.validator import Validator
from pymongo import MongoClient
from test import populate
from src import config
# Connect to database and start a Flask app
client = MongoClient()
db = client['quiz_database']
populate.restore_default_db(db)
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
    """
    if request.method == 'GET':
        try:
            id = request.args.get('id')
            mquiz = get_quiz(id)
            if mquiz is None:
                app.logger.error('Quiz not found')
                return BaseExceptionSchema().dump(QuizNotFoundException()), 400
            return jsonify(mquiz), 200
        except Exception as e:
            return BaseExceptionSchema().dump(e), 500
    elif request.method == 'POST':
        try:
            id = request.get_json()['_id']
            print(request.get_json())
            responses = request.get_json()['responses']
            quiz = get_quiz_internal(id)
            if quiz is None:
                app.logger.error('Quiz not found on submission')
                return BaseExceptionSchema().dump(QuizNotFoundException()), 400
            validator = Validator(quiz, responses)
            if validator.validate():
                insert_quiz_response(id, responses, validator.get_result)
                return jsonify(validator.get_result), 200
            else:
                return BaseExceptionSchema().dump(InvalidResponsesException()), 400
        except Exception as e:
            return BaseExceptionSchema().dump(e), 500

def get_quiz(id):
    return db['quizzes'].find_one({'_id': id}, {'questions.answers': False})

def get_quiz_internal(id):
    return db['quizzes'].find_one({'_id': id})

def insert_quiz_response(id, responses, result):
    quiz_response = {
        'quiz_id': id,
        'responses': responses,
        'result': result
    }

    db['responses'].insert_one(quiz_response)


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






