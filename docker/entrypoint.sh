# Main shell script that is run at the time that the Docker image is run

# Goal of this file is replace the backend API url at run time

# ENV VARS
# A list of environment variables that are passed to the container

# Needed to make sure nginx is running after the commands are run
nginx -g 'daemon off;'; nginx -s reload;