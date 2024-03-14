from fastapi import HTTPException
from jwt_functions.jwt import verify_token


def verify_token_function(token):
    if not token:
        raise HTTPException(401, "You are not authenticated")

    validate_token = verify_token(token)

    if not validate_token:
        raise HTTPException(401, "Invalid token")

    return validate_token
