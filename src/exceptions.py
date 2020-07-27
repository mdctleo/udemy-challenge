from marshmallow import Schema, fields


""" Where I am keeping my customized exceptions """
class BaseExceptionSchema(Schema):
    msg = fields.Str()


class InvalidResponsesException(Exception):
    def __init__(self):
        msg = 'Invalid Quiz Responses'
        super().__init__(msg)
        self.msg = msg

    def __str__(self):
        return str(self.msg)

class QuizNotFoundException(Exception):
    def __init__(self):
        msg = 'Quiz Not Found'
        super().__init__(msg)
        self.msg = msg

    def __str__(self):
        return str(self.msg)