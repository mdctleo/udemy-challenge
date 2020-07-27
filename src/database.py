from pymongo import ReturnDocument

"""
A layer for queries with mongoDB
"""


class Database:
    def __init__(self, db):
        self.db = db

    def get_quiz(self, id):
        """ Gets a quiz for external use, excluding answers
        :param id:
        :return: A quiz document
        """
        return self.db['quizzes'].find_one({'_id': id}, {'questions.answers': False})


    def get_quiz_internal(self, id):
        """ Gets a quiz for interal use, including answers for validation

        :param id:
        :return: A quiz document
        """
        return self.db['quizzes'].find_one({'_id': id})


    def insert_quiz_response(self, id, responses, result):
        """ Inserts responses for a quiz into database

        :param id: id of the quiz
        :param responses: An array of answers for the quiz
        :param result: the mark achieved by this set of responses
        :return:
        """
        quiz_response = {
            'quiz_id': id,
            'responses': responses,
            'result': result
        }

        self.db['responses'].insert_one(quiz_response)



    """ The following are some conveninece methods for restoring database to default values"""

    def restore_default_db(self):
        """
        A function to refresh the database on start of the app for testing
        :param db: MongoDB client
        """
        quizzes = self.db['quizzes']
        # Counters collection holds one document that is used to create an auto increment id for quizzes
        counters = self.db['counters']
        responses = self.db['responses']
        quizzes.drop()
        counters.drop()
        responses.drop()

        counters.insert_one({'_id': 'quiz_id', 'seq': 0})

        quiz = self.create_quiz1()

        quizzes.insert_one(quiz)


    def create_quiz1(self):
        return {
            '_id': self.auto_increment('quiz_id'),
            'title': 'Quiz 1',
            'questions': [
                {
                    'question': 'How are you doing?',
                    'options': {'A': 'Good', 'B': 'Ok', 'C': 'Bad'},
                    'answers': {'A': 10, 'B': 5, 'C': 2},
                    'points': 10
                },

                {
                    'question': 'What is 1 + 1? ',
                    'options': {'A': '-1', 'B': '2', 'C': '10', 'D': '4', 'E': '5'},
                    'answers': {'B': 5, 'C': 10},
                    'points': 10
                },

                {
                    'question': 'There is a runaway trolley barreling down the railway tracks. '
                            'Ahead, on the tracks, there are five people tied up and unable to move. '
                            'The trolley is headed straight for them. You are standing some distance off in the train yard, '
                            'next to a lever. If you pull this lever, the trolley will switch to a different set of tracks. '
                            'However, you notice that there is one person on the side track. Pick the most ethical option:',
                    'options': {'A': 'Do nothing and allow the trolley to kill the five people on the main track',
                            'B': 'Pull the lever, diverting the trolley onto the side track where it will kill one person'
                                },
                    'answers': {'A': 10, 'B': 10},
                    'points': 10

                },

                {
                    'question': 'Should you hire me?',
                    'options': {'A': 'Yes'},
                    'answers': {'A': 70},
                    'points': 70
                }
            ]
        }

    def auto_increment(self, seq_name):
        """Increment the specified counter document in counters collection, returns the incremented amount to be used as an id
        :param db: MongoDB client instance
        :param seq_name: counter document name
        :type seq_name: str
        :return:
        """
        seq_document = self.db['counters'].find_one_and_update(
            {'_id': seq_name},
            {'$inc': {'seq': 1}},
            projection={'seq': True, '_id': False},
            return_document=ReturnDocument.AFTER
        )

        return str(seq_document['seq'])
