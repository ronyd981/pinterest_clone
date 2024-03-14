import jwt
from decouple import config


def encode_user(user: dict):
    encoded_data = jwt.encode(payload=user,
                              key=config("SECRET_PY"),
                              algorithm="HS256")

    return encoded_data


def verify_token(token):
    try:
        decoded_token = jwt.decode(
            token, config("SECRET_PY"), algorithms=["HS256"])

        return decoded_token
    except Exception as e:
        return False
