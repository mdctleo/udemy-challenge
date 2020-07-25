from pymongo import ReturnDocument

def populate_db(db):
    """
    A function to refresh the database on start of the app for testing
    :param db: MongoDB client
    """
    quizzes = db['quizzes']
    # Counters collection holds one document that is used to create an auto increment id for quizzes
    counters = db['counters']
    quizzes.delete_many({})
    counters.delete_many({})

    counters.insert_one({'_id': 'quiz_id', 'seq': 0})

    quiz = {
        '_id': auto_increment(db, 'quiz_id'),
        'title': 'Quiz 1',
        'questions': [
            {
             'question': 'How are you doing?',
             'options': {'0': 'Good', '1': 'Ok', '2': 'Bad'},
             'answers': {'0': 10, '1': 5, '2': 2},
             'points': 10
            },

            {
                'question': 'What is 1 + 1? ',
                'options': {'0': '-1', '1': '2', '2': '10', '3': '4', '4': '5'},
                'answers': {'1': 5, '2': 10},
                'points': 10
            },

            {
                'question': 'There is a runaway trolley barreling down the railway tracks. '
                            'Ahead, on the tracks, there are five people tied up and unable to move. '
                            'The trolley is headed straight for them. You are standing some distance off in the train yard, '
                            'next to a lever. If you pull this lever, the trolley will switch to a different set of tracks. '
                            'However, you notice that there is one person on the side track. Pick the most ethical option:',
                'options': {'0': 'Do nothing and allow the trolley to kill the five people on the main track',
                            '1': 'Pull the lever, diverting the trolley onto the side track where it will kill one person'
                            },
                'answers': {'0': 10, '1': 10},
                'points': 10

            },

            {
             'question': 'Should you hire me?',
             'options': {'0': 'Yes'},
             'answers': {'0': 70},
             'points': 70
            }
        ]
    }

    quizzes.insert_one(quiz)


def auto_increment(db, seq_name):
    """Increment the specified counter document in counters collection, returns the incremented amount to be used as an id
    :param db: MongoDB client instance
    :param seq_name: counter document name
    :type seq_name: str
    :return:
    """
    seq_document = db['counters'].find_one_and_update(
        {'_id': seq_name},
        {'$inc': {'seq': 1}},
        projection={'seq': True, '_id': False},
        return_document=ReturnDocument.AFTER
    )

    return str(seq_document['seq'])
