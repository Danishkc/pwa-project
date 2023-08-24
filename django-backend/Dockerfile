FROM python:3.10.6

WORKDIR /usr/src/app

COPY django-backend/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY django-backend/ .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
