from flask import Flask, request
import logging
from logging import FileHandler, Formatter
from Exceptions import BaseExceptionSchema, InvalidResponsesException, QuizNotFoundException
from validator import Validator
from pymongo import MongoClient
import populate
# Connect to database and start a Flask app
client = MongoClient()
db = client['quiz_database']
populate.populate_db(db)
app = Flask(__name__)
app.config.from_object('config')
# TODO: remove cors
# CORS(app, origins="http://localhost:3000", supports_credentials=True)


@app.route('/quiz', methods=['GET', 'POST'])
def quiz(id):
    """ Gets requested Quiz

    :param id: Quiz id
    :return: A json representation of a Quiz class
    :rtype: str
    """
    if request.method == 'GET':
        try:
            print(id)
            mquiz = get_quiz(id)
            print(mquiz)
            if mquiz is None:
                app.logger.error('Quiz not found')
                return BaseExceptionSchema(QuizNotFoundException('Quiz not found')).dump()
        except Exception as e:
            return BaseExceptionSchema().dump(e), 500
    elif request.method == 'POST':
        try:
            id = request.get_json()['id']
            responses = request.get_json()['responses']
            quiz = get_quiz_internal(id)
            if quiz is None:
                app.logger.error('Quiz not found on submission')
                return BaseExceptionSchema(QuizNotFoundException('Quiz not found on submission')).dump(), 400
            validator = Validator(quiz, responses)
            if validator.validate():
                insert_quiz_response(id, responses, validator.get_result)
                return validator.get_result, 200
            else:
                return BaseExceptionSchema(InvalidResponsesException('Quiz responses are invalid')).dump(), 400
        except Exception as e:
            return BaseExceptionSchema().dump(e), 500

def get_quiz(id):
    return db['quizzes'].find_one({'_id': id}, {'answers': 0})

def get_quiz_internal(id):
    return db['quizzes'].find_one({'_id': id})

def insert_quiz_response(id, responses, result):
    quiz_response = {
        'quiz_id': id,
        'responses': responses,
        'result': result
    }

    db['quiz_response'].insert_one(quiz_response)


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






