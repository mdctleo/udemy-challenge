from flask import Flask, request
import logging
from logging import FileHandler, Formatter
from Exceptions import BaseExceptionSchema, InvalidAnswerException, QuizNotFoundException
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


@app.route('/get-quiz')
def get_quiz(id):
    """ Gets requested Quiz

    :param id: Quiz id
    :return: A json representation of a Quiz class
    :rtype: str
    """
    if request.method == 'GET':
        try:
            print(id)
            quiz = db['quizzes'].find_one({'_id': id})
            print(quiz)
            if quiz is None:
                app.logger.error('Quiz not found')
                return BaseExceptionSchema(QuizNotFoundException("Quiz not found")).dump()
        except Exception as e:
            return BaseExceptionSchema().dump(e), 500
    return None

@app.route('/submit-question')
def submit_question(id):
    """ Submits user's answer to a question

    :param id: question's id
    :return: A 200 success
    :rtype: str
    :exception:
    """

    if request.method == 'POST':
        try:
            return 'Not Implemented'
        except InvalidAnswerException as e:
            return BaseExceptionSchema().dump(e), 400


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






