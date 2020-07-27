class Validator(object):
    """ Validates and marks submitted responses for a quiz
    :param quiz: A quiz document with answers
    :type quiz: dict
    :param responses: An array of string responses for the quiz
    :type responses: list
    :var result: The numeric result attained for the given responses on the given quiz
    :type result: int
    """
    def __init__(self, quiz, responses):
        self.__quiz = quiz
        self.__responses = responses
        self.__result = 0


    def validate(self):
        """ Validates each response by seeing if they exist in the answer dict in each question
        In addition, sum up the score if it exists in the answer dict

        :return: True if validated
        :rtype: bool
        """
        questions = self.__quiz['questions']
        responses = self.__responses

        if len(responses) != len(questions):
            return False

        for i in range(len(responses)):
            question = questions[i]
            response = responses[i]

            if response not in question['options']:
                return False

            if response in question['answers']:
                self.__result += question['answers'][response]

        return True

    @property
    def get_result(self):
        """ Returns the result of the quiz

        :return: result of the quiz
        :rtype: int
        """
        return self.__result


