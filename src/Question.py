from marshmallow import Schema, fields

class QuestionSchema(Schema):
    id = fields.Integer()
    question = fields.String()
    options = fields.List(fields.String())

class Question(object):
    def __init__(self, id, question, options):
        self.id = id
        self.question = question
        self.options = options

