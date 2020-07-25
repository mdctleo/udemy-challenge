class Validator(object):
    def __init__(self, quiz, responses):
        self.__quiz = quiz
        self.__responses = responses
        self.__result = 0


    def validate(self):
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
        return self.__result


