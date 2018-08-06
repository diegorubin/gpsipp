FROM python:3

RUN mkdir /application
WORKDIR /application

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]

