from marshmallow import Schema, fields


class BaseExceptionSchema(Schema):
    msg = fields.Str()


class InvalidAnswerException(Exception):
    def __init__(self, msg):
        super().__init__(msg)
        self.msg = msg

class QuizNotFoundException(Exception):
    def __init__(self, msg):
        super().__init__(msg)
        self.msg = msg