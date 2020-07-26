"""
Tests for API endpoints
"""
import pytest
from pymongo import MongoClient

from src.Exceptions import BaseExceptionSchema, QuizNotFoundException, InvalidResponsesException
from src.app import app
from test import populate

@pytest.fixture
def setup():
    """
    Restore database to default before each test cases
    """
    client = MongoClient()
    db = client['quiz_database']
    populate.restore_default_db(db)
    yield 'setup'
    populate.restore_default_db(db)


def test_get_quiz(setup):
    """
    Getting a quiz should return a quiz with the answers hidden
    """
    with app.test_client() as c:
        response = c.get('/quiz?id=1')
        response_json = response.get_json()
        assert response_json['_id'] == '1'
        assert response_json['title'] == 'Quiz 1'
        assert response_json['questions'][0] == {'question': 'How are you doing?',
                                             'options': {'A': 'Good', 'B': 'Ok', 'C': 'Bad'},
                                             'points': 10}

def test_get_non_existent_quiz(setup):
    """
    Getting a non-existent quiz should return 400 and QuizNotFoundException
    """
    with app.test_client() as c:
        response = c.get('/quiz?id=2')
        response_json = response.get_json()
        assert response.status_code == 400
        assert response_json == BaseExceptionSchema().dump(QuizNotFoundException())

def test_submit_quiz(setup):
    """
    Submitting a valid quiz should return 200 and the result of the quiz
    """
    with app.test_client() as c:
        response = c.post('/quiz', json={
            '_id': '1',
            'responses': ['B', 'D', 'B', 'A']
        })
        response_json = response.get_json()
        assert response.status_code == 200
        assert response_json == 85

def test_submit_invalid_response(setup):
    """
    Submitting a quiz with invalid response should return 400 and InvalidResponsesException
    """
    with app.test_client() as c:
        response = c.post('/quiz', json={
            '_id': '1',
            'responses': ['B', '99', 'B', 'A']
        })
        response_json = response.get_json()
        assert response.status_code == 400
        assert response_json == BaseExceptionSchema().dump(InvalidResponsesException())

def test_submit_too_many_response(setup):
    """
    Submitting more responses than questions should return 400 and InvalidResponsesException
    """
    with app.test_client() as c:
        response = c.post('/quiz', json={
            '_id': '1',
            'responses': ['B', 'A', 'B', 'A', 'D']
        })
        response_json = response.get_json()
        assert response.status_code == 400
        assert response_json == BaseExceptionSchema().dump(InvalidResponsesException())

def test_submit_non_existent_quiz(setup):
    """
    Submitting responses for a non-existent quiz should return 400 and QuizNotFoundException
    """
    with app.test_client() as c:
        response = c.post('/quiz', json={
            '_id': '2',
            'responses': ['B', 'A', 'B', 'A']
        })
        response_json = response.get_json()
        assert response.status_code == 400
        assert response_json == BaseExceptionSchema().dump(QuizNotFoundException())
