# Use an official Python runtime as a parent image
FROM python:3.12.5-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY nltk_data /usr/local/nltk_data

COPY . .

# Run app.py when the container launches using gunicorn
CMD exec gunicorn run:app --bind 0.0.0.0:$PORT --workers 1