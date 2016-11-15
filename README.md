# Repo for Unofficial Arnold Quotes Alexa skill
This repo contains the necessary files to enable your Echo device to randomly output popular Arnold quotes.

Usage: "alexa, ask Arnold fan for a quote"

Reply: *Who is your daddy and what does he do*
Skill name: Unofficial Arnold Quotes


Invocation name: arnold fan


Be sure to include your ARN from AWS Lambda as your service endpoint

Audio files need to be publicly accessible via https and in proper format. Use ffmpeg or your favorite conversion tool:
ffmpeg -i nodeal.wav -ac 2 -codec:a libmp3lame -b:a 48k -ar 16000 nodeal.mp3

